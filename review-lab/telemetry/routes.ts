export type Record = {
  id: string;
  service: string;
  container: string;
  fanout?: boolean;
};

export function isDedicated(record: Record): boolean {
  return record.service === "fixture-app" && record.container === "app";
}

export function useGeneric(record: Record): boolean {
  return !isDedicated(record) || record.fanout === true;
}

export function useDedicated(record: Record): boolean {
  return isDedicated(record) || record.fanout === true;
}
