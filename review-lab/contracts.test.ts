import { test } from "node:test";
import assert from "node:assert/strict";
import { consumeOptions } from "./options.ts";
import { deliver } from "./telemetry/index.ts";

test("options preserve absent, zero, and positive replicas", () => {
  assert.deepEqual(consumeOptions({}), { mode: "default" });
  assert.deepEqual(consumeOptions({ replicas: 0 }), { mode: "disabled", replicas: 0 });
  assert.deepEqual(consumeOptions({ replicas: 3 }), { mode: "explicit", replicas: 3 });
  for (const replicas of [null, -1, 0.5, "0"]) {
    assert.throws(() => consumeOptions({ replicas }));
  }
});

test("telemetry destinations", () => {
  assert.deepEqual(deliver([
    { id: "dedicated", service: "fixture-app", container: "app" },
    { id: "ordinary", service: "other", container: "app" },
    { id: "sidecar", service: "fixture-app", container: "sidecar" },
    { id: "fanout", service: "fixture-app", container: "app", fanout: true },
  ]), {
    generic: ["ordinary", "sidecar", "fanout"],
    dedicated: ["dedicated", "fanout"],
  });
});
