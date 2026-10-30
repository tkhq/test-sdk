import { readFileSync } from "node:fs";
import { completedActivity } from "./events.ts";
import { consumeOptions } from "./options.ts";
import { deliver } from "./telemetry/index.ts";

const command = process.argv[2];
if (command === "event") {
  console.log(JSON.stringify(completedActivity()));
} else if (command === "options") {
  console.log(JSON.stringify(consumeOptions(JSON.parse(readFileSync(0, "utf8")))));
} else if (command === "telemetry") {
  console.log(JSON.stringify(deliver(JSON.parse(readFileSync(0, "utf8")))));
} else {
  throw new Error("usage: node review-lab/cli.ts event|options|telemetry");
}
