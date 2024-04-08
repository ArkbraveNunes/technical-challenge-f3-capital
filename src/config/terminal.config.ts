import path, { dirname } from 'path';
import yargs from 'yargs';

import { SEGMENT } from '../enums/segment.enum.js';
import { IConfig } from './terminal.config.interface.js';

const defaultDir = path
  .resolve(`${dirname(require.main.filename)}/cnab-files/default.rem`)
  .replace('dist/', '');

export const configParams = yargs(process.argv.slice(2))
  .usage('Usage: $0 [options]')
  .option('f', {
    alias: 'from',
    describe:
      'Posicao inicial de pesquisa da linha do Cnab  - OBS: Precisa passar o to tambem',
    type: 'number',
    demandOption: false,
    default: null,
  })
  .option('t', {
    alias: 'to',
    describe:
      'Posicao final de pesquisa da linha do Cnab - OBS: Precisa passar o from tambem',
    type: 'number',
    demandOption: false,
    default: null,
  })
  .option('s', {
    alias: 'segment',
    describe: 'Tipo de segmento',
    type: 'string',
    choices: Object.values(SEGMENT),
    demandOption: true,
  })
  .option('b', {
    alias: 'businessName',
    describe: 'Nome ou parte do nome da empresa',
    type: 'string',
    demandOption: false,
    default: null,
  })
  .option('d', {
    alias: 'dir',
    describe: 'Caminho do arquivo',
    type: 'string',
    demandOption: false,
    default: defaultDir,
  })
  .option('e', {
    alias: 'export',
    describe:
      'Sera gerado um arquivo .json na pasta ./reports contendo os resultados da busca',
    boolean: true,
    demandOption: false,
    default: false,
  })
  .example(
    '$0 -s Q',
    'lista os registros que sao do segmento Q do arquivo cnab',
  )
  .example(
    'node dist/$0 -f 2 -t 50 -s Q',
    'lista os registros que sao do segmento Q entre as linhas 2 e 50 do arquivo cnab',
  )
  .example(
    'node dist/$0 -s Q -b EUA -e',
    'lista os registros que contem EUA no nome e sao do segmento Q do arquivo cnab',
  )
  .example(
    'node dist/$0 -s Q -e',
    'lista os registros que sao do segmento Q do arquivo cnab e exporta o resultado em um arquivo JSON na pasta ./reports',
  )
  .example(
    'node dist/$0 -s Q -d ./cnab-files/default.rem',
    'lista os registros que sao do segmento Q do arquivo cnab especifico dentro da pasta cnab-files',
  ).argv as any as IConfig;
