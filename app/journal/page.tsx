import type { Metadata } from "next";
import { getJournalEntries } from "@/lib/keystatic";
import JournalPageClient from "./journal-client";

export const metadata: Metadata = {
  title: "System Logs | Muztahid Rahman — Software & Robotics Engineer",
  description:
    "Documenting algorithmic theory, architectural decisions, and hardware mechanics. Research logs on data structures, cloud infrastructure, ROS2 autonomy, and analog engineering.",
};

export default async function JournalPage() {
  const entries = await getJournalEntries();
  return <JournalPageClient entries={entries} />;
}
