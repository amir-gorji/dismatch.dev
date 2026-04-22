export type DismatchVersions = {
  latest: string;
  all: string[];
};

type JsDelivrPackageResponse = {
  tags?: Record<string, string>;
  versions?: { version: string }[];
};

export async function fetchVersions(
  signal?: AbortSignal,
): Promise<DismatchVersions> {
  const res = await fetch("https://data.jsdelivr.com/v1/packages/npm/dismatch", {
    signal,
  });
  if (!res.ok) {
    throw new Error(`Failed to load versions (${res.status})`);
  }
  const data = (await res.json()) as JsDelivrPackageResponse;
  const all = (data.versions ?? [])
    .map((v) => v.version)
    .filter((v) => !v.includes("-"));
  const latest = data.tags?.latest ?? all[0] ?? "latest";
  return { latest, all };
}
