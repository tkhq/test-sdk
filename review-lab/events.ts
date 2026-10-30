export function completedActivity(activityId = "fixture-1") {
  return { type: "activity.succeeded", activityId };
}
