# Local interoperability examples

Use Node 24.9 or newer with built-in TypeScript stripping. No installation or
network service is needed. From the repository root:

```sh
node --test review-lab/*.test.ts
node review-lab/cli.ts event
printf '%s' '{}' | node review-lab/cli.ts options
printf '%s' '{"replicas":0}' | node review-lab/cli.ts options
printf '%s' '{"replicas":3}' | node review-lab/cli.ts options
printf '%s' '[{"id":"one","service":"fixture-app","container":"app"}]' | node review-lab/cli.ts telemetry
```

The event wire contract is `{"type":"activity.completed","activityId":"fixture-1"}`.
Pipe the actual `event` command output to companion consumers; readers must reject
unknown event types. Options input is JSON on stdin: absence selects the default,
zero disables replicas, and positive integers specify an explicit count. The
consumer retains the distinction rather than applying a truthiness default.

Telemetry uses in-memory sinks. `fixture-app` records from the `app` container
belong only in the dedicated sink. Other services and sidecars belong only in the
generic sink. An explicit `fanout: true` authorizes both destinations.

Copied workflows have the `.disabled` suffix in this trial baseline because they
include integration, publication, and release operations. Only `review-lab.yml`
is active; it runs these dependency-free local fixtures with read-only permissions.
Production toolchain requirements are unchanged.
