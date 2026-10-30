import { useGeneric, useDedicated, type Record } from "./routes.ts";

export function deliver(records: Record[]) {
  const generic: string[] = [];
  const dedicated: string[] = [];
  for (const record of records) {
    if (useGeneric(record)) generic.push(record.id);
    if (useDedicated(record)) dedicated.push(record.id);
  }
  return { generic, dedicated };
}
