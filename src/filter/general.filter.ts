import { CNABMapper } from '../mapper';
import { IFilter } from './filter.interface';

export type FilterInputDto = {
  rows: string[];
  businessName?: string;
  segment: string;
};

export type FilterOutputDto = {
  position: {
    row: number;
    column: number;
  };
  segmentCode: string;
  segmentType: string;
  businessName: string;
  district: string;
  zipCode: string;
  city: string;
  uf: string;
};

export class GeneralFilter
  implements IFilter<FilterInputDto, FilterOutputDto[]>
{
  _cnabMapper: CNABMapper;

  constructor() {
    this._cnabMapper = new CNABMapper();
  }

  format({ rows, businessName, segment }: FilterInputDto) {
    const result: FilterOutputDto[] = [];

    rows.forEach((row: string, index: number) => {
      const rowUpperCase = row.toUpperCase();

      const [rowBusinessName, rowSegment] = [
        this._cnabMapper.extractBusinessName(rowUpperCase),
        this._cnabMapper.extractSegmentType(rowUpperCase),
      ];

      const businessNameConditional = businessName
        ? rowBusinessName.search(businessName.toLocaleUpperCase()) > -1
        : true;

      if (rowSegment === segment && businessNameConditional) {
        result.push({
          position: {
            row: index + 2,
            column: rowUpperCase.search(rowSegment),
          },
          segmentCode: this._cnabMapper.extractSegmentCode(rowUpperCase),
          segmentType: rowSegment,
          businessName: rowBusinessName,
          district: this._cnabMapper.extractDistrict(rowUpperCase),
          city: this._cnabMapper.extractCity(rowUpperCase),
          uf: this._cnabMapper.extractUf(rowUpperCase),
          zipCode: this._cnabMapper.extractZipCode(rowUpperCase),
        });
      }
    });

    return result;
  }

  filter({ rows, businessName, segment }: FilterInputDto): FilterOutputDto[] {
    return this.format({ rows, businessName, segment });
  }
}
