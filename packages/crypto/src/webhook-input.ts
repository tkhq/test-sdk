import type { TurnkeyWebhookBody } from "./webhooks";

export function buildSignedInput({
  version,
  algorithm,
  keyId,
  timestampMs,
  eventId,
  body,
}: {
  version: string;
  algorithm: string;
  keyId: string;
  timestampMs: string;
  eventId: string;
  body: TurnkeyWebhookBody;
}): Uint8Array {
  const prefix = new TextEncoder().encode(
    `${version}.${algorithm}.${keyId}.${timestampMs}.${eventId}.`,
  );
  const bodyBytes = bodyToBytes(body);
  const signedInput = new Uint8Array(prefix.length + bodyBytes.length);
  signedInput.set(prefix, 0);
  signedInput.set(bodyBytes, prefix.length);
  return signedInput;
}

function bodyToBytes(body: TurnkeyWebhookBody): Uint8Array {
  if (typeof body === "string") {
    return new TextEncoder().encode(body);
  }
  if (body instanceof Uint8Array) {
    return body;
  }
  return new Uint8Array(body);
}

