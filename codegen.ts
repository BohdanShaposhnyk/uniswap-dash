import dotenv from 'dotenv';
import type { CodegenConfig } from '@graphql-codegen/cli';

dotenv.config({ path: '.env.local' });

const base = process.env.THEGRAPH_API_BASE_URL ?? 'https://gateway.thegraph.com/api';
const id = process.env.SUBGRAPH_ID_UNISWAP_V4 ?? 'DiYPVdygkfjDWhbxGSqAQxwBKmfKnkWQojqeM2rkLb3G';
const key = process.env.THEGRAPH_API_KEY ?? '';
const schemaUrl = `${base}/subgraphs/id/${id}`;

const config: CodegenConfig = {
  schema: [
    {
      [schemaUrl]: {
        headers: {
          Authorization: `Bearer ${key}`,
        },
      },
    },
  ],
  documents: ['src/lib/graphql/**/*.graphql'],
  generates: {
    'src/lib/graphql/generated.ts': {
      plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
    },
  },
};

export default config;
