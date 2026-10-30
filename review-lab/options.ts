export function consumeOptions(value: unknown) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error("expected options object");
  }
  if (!Object.hasOwn(value, "replicas")) return { mode: "default" };
  const replicas = (value as { replicas: unknown }).replicas;
  if (typeof replicas !== "number" || !Number.isSafeInteger(replicas) || replicas < 0) {
    throw new Error("replicas must be a nonnegative safe integer");
  }
  return { mode: replicas === 0 ? "disabled" : "explicit", replicas };
}
