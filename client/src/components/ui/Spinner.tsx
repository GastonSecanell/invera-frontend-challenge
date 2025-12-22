export default function Spinner({ size = 24 }) {
  return (
    <div
      className="animate-spin rounded-full border-2 border-[#7B99FF] border-t-transparent"
      style={{ width: size, height: size }}
    />
  );
}
