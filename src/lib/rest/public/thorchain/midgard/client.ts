function getBaseUrl(): string {
  const base = process.env.MIDGARD_API_BASE_URL;
  if (!base) {
    throw new Error(
      "Missing MIDGARD_API_BASE_URL. Set it in .env.local for the dashboard."
    );
  }
  return base.replace(/\/$/, "");
}

export async function get<T>(
  path: string,
  params?: Record<string, string>
): Promise<T> {
  const base = getBaseUrl();
  const pathStr = path.startsWith("/") ? path.slice(1) : path;
  const url = new URL(pathStr, `${base}/`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }
  const res = await fetch(url.toString(), {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(`Midgard request failed: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  return json as T;
}
