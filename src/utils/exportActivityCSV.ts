import type { ActivityItem } from
"../pages/dashboard/components/ActivityTimeline";

export function exportActivityCSV(
  activities: ActivityItem[]
) {
  const rows = [
    [
      "Title",
      "Description",
      "Type",
      "User",
    ],

    ...activities.map((a) => [
      a.title,
      a.description,
      a.type,
      a.user ?? "",
    ]),
  ];

  const csv =
    rows
      .map((r) => r.join(","))
      .join("\n");

  const blob = new Blob(
    [csv],
    {
      type: "text/csv",
    }
  );

  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.download =
    "activity-timeline.csv";

  link.click();

  URL.revokeObjectURL(url);
}