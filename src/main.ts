import path, { dirname } from 'path';

import { configParams } from './config/terminal.config';
import { IConfig } from './config/terminal.config.interface';
import { FilterOutputDto, GeneralFilter } from './filter';
import { ManipulateFileService } from './manipulate-file';
import { SEGMENT } from './enums/segment.enum';
import { LoggerService } from './logger';

class Main {
  private _from: number;
  private _to: number;
  private _segment: SEGMENT;
  private _businessName: string;
  private _dir: string;
  private _exportResults: boolean;

  private _generalFilter: GeneralFilter;

  constructor(options: IConfig) {
    this._from = options.from;
    this._to = options.to;
    this._segment = options.segment;
    this._businessName = options.businessName || null;
    this._dir = options.dir;
    this._exportResults = options.export || false;

    this._generalFilter = new GeneralFilter();
  }

  async exec() {
    const rows = await ManipulateFileService.readFile({
      fileLocation: this._dir,
    }).then((res) => {
      let rowsWithoutHeaderAndFooter = res.split('\n').slice(2, -2);

      if (this._from && this._to) {
        rowsWithoutHeaderAndFooter = rowsWithoutHeaderAndFooter.slice(
          this._from,
          this._to,
        );
      }

      return rowsWithoutHeaderAndFooter;
    });

    const data: FilterOutputDto[] = this._generalFilter.filter({
      rows,
      businessName: this._businessName,
      segment: this._segment,
    });

    if (data.length > 0) {
      data.forEach((item) => {
        LoggerService.messageLog(item);
      });

      if (this._exportResults) {
        ManipulateFileService.writeFile({
          data,
          dir: `${path
            .resolve(`${dirname(require.main.filename)}`)
            .replace('/dist', '/')}reports/`,
        });
      }
    } else {
      LoggerService.notFoundDataMessage(this._dir);
    }
  }
}

console.time('time execution');
new Main(configParams).exec();
console.timeEnd('time execution');
