import { print } from 'graphql';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';

type GqlFetchOptions = {
  next?: { revalidate?: number };
};

function getSubgraphUrl(): string {
  const base = process.env.THEGRAPH_API_BASE_URL;
  const id = process.env.SUBGRAPH_ID_UNISWAP_V4;
  const key = process.env.THEGRAPH_API_KEY;
  if (!base || !id || !key) {
    throw new Error(
      'Missing The Graph env: THEGRAPH_API_BASE_URL, SUBGRAPH_ID_UNISWAP_V4, THEGRAPH_API_KEY',
    );
  }
  return `${base}/subgraphs/id/${id}`;
}

export async function gqlFetch<TData, TVars extends Record<string, unknown>>(
  document: TypedDocumentNode<TData, TVars>,
  variables: TVars,
  options?: GqlFetchOptions,
): Promise<TData> {
  const url = getSubgraphUrl();
  const apiKey = process.env.THEGRAPH_API_KEY!;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      query: print(document),
      variables,
    }),
    next: options?.next ?? { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Subgraph request failed: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as {
    data?: TData;
    errors?: Array<{ message: string }>;
  };

  if (json.errors?.length) {
    const messages = json.errors.map((e) => e.message).join('; ');
    throw new Error(`GraphQL errors: ${messages}`);
  }

  if (json.data === undefined) {
    throw new Error('Subgraph returned no data');
  }

  return json.data;
}
