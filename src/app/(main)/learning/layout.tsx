export default function LearningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <div className="flex-1 h-screen">{children}</div>
    </div>
  );
}
