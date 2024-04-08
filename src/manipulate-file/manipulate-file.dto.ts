export type ReadFileInputDto = {
  fileLocation: string;
  encoding?: BufferEncoding;
};

export type WriteFileInputDto = {
  data: Record<string, any>;
  extensionFile?: string;
  dir: string;
};
