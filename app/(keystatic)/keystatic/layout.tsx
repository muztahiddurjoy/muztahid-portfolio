export default function KeystaticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50" style={{ background: "#fff" }}>
      {children}
    </div>
  );
}