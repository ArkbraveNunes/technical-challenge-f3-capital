import {
  businessNamePosition,
  cityPosition,
  districtPosition,
  segmentCodePosition,
  segmentTypePosition,
  ufPosition,
  zipCodePosition,
} from '../config';

export class CNABMapper {
  extractSegmentCode(row: string): string {
    return row
      .substring(segmentCodePosition.begin, segmentCodePosition.end)
      .trim();
  }
  extractSegmentType(row: string): string {
    return row
      .substring(segmentTypePosition.begin, segmentTypePosition.end)
      .trim();
  }
  extractBusinessName(row: string): string {
    return row
      .substring(businessNamePosition.begin, businessNamePosition.end)
      .trim();
  }
  extractDistrict(row: string): string {
    return row.substring(districtPosition.begin, districtPosition.end).trim();
  }
  extractZipCode(row: string): string {
    return row.substring(zipCodePosition.begin, zipCodePosition.end).trim();
  }
  extractCity(row: string): string {
    return row.substring(cityPosition.begin, cityPosition.end).trim();
  }
  extractUf(row: string): string {
    return row.substring(ufPosition.begin, ufPosition.end).trim();
  }
}
