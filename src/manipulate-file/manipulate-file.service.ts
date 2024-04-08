import { readFile } from 'fs/promises';
import fs from 'fs';
import { ReadFileInputDto, WriteFileInputDto } from './manipulate-file.dto';

export class ManipulateFileService {
  static async readFile({
    fileLocation,
    encoding,
  }: ReadFileInputDto): Promise<string> {
    return readFile(fileLocation, { encoding: encoding || 'utf-8' });
  }

  static writeFile({ dir, data, extensionFile }: WriteFileInputDto) {
    fs.writeFile(
      `${dir}report-${Date.now()}${extensionFile || '.json'}`,
      JSON.stringify(data),
      (err) => {
        if (err) {
          console.error('Error on write File:', err);
        } else {
          console.log('File created successfully in the dir ./reports');
        }
      },
    );
  }
}
