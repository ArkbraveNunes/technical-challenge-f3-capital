import chalk from 'chalk';

export type MessageInputDto = {
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

export class LoggerService {
  static messageLog(messageInput: MessageInputDto): void {
    console.log(`
    ----- Cnab row ${messageInput.position.row + 1} -----
    
    segmentCode: ${chalk.inverse.bgBlack(messageInput.segmentCode)}

    segmentType: ${chalk.inverse.bgBlack(messageInput.segmentType)}

    businessName: ${chalk.inverse.bgBlack(messageInput.businessName)}
    
    -----------
    `);
  }

  static notFoundDataMessage(fileLocation: string): void {
    console.log(`No data was found in the file ${fileLocation}`);
  }
}
