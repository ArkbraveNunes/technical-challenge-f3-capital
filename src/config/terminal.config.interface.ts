import { SEGMENT } from '../enums';

export interface IConfig {
  from: number;
  to: number;
  segment: SEGMENT;
  businessName: string;
  dir: string;
  export: boolean;
}
