import type { Metadata } from "next";
import JournalPageClient from "./journal-client";

export const metadata: Metadata = {
  title: "System Logs | Muztahid Rahman — Software & Robotics Engineer",
  description:
    "Documenting algorithmic theory, architectural decisions, and hardware mechanics. Research logs on data structures, cloud infrastructure, ROS2 autonomy, and analog engineering.",
};

export default function JournalPage() {
  return <JournalPageClient />;
}
