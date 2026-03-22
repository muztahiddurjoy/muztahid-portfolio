import type { Metadata } from "next";
import SignalHero from "@/components/contact/signal-hero";
import TelemetryDashboard from "@/components/contact/telemetry-dashboard";
import SecureMessageMatrix from "@/components/contact/secure-message-matrix";
import NetworkBento from "@/components/contact/network-bento";
import PhysicalMeetingCard from "@/components/contact/physical-meeting-card";
import ContactJSONViewer from "@/components/contact/contact-json-viewer";
import TerminalFooter from "@/components/contact/terminal-footer";

export const metadata: Metadata = {
  title: "Contact | Muztahid Rahman — Signal & Routing",
  description:
    "Initiate a secure connection — structured communication channels for architectural consultations, robotics collaborations, and engineering opportunities.",
};

export default function ContactPage() {
  return (
    <>
      <SignalHero />
      <TelemetryDashboard />
      <SecureMessageMatrix />
      <NetworkBento />
      <PhysicalMeetingCard />
      <ContactJSONViewer />
      <TerminalFooter />
    </>
  );
}
