export default function LearningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#132024] flex">
      <div className="flex-1 h-screen px-50 py-10">{children}</div>
    </div>
  );
}
