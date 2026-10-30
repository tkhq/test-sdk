import { test } from "node:test";
import assert from "node:assert/strict";
import { completedActivity } from "./events.ts";

test("serializes completed activity", () => {
  assert.deepEqual(JSON.parse(JSON.stringify(completedActivity())), {
    type: "activity.completed", activityId: "fixture-1",
  });
});
