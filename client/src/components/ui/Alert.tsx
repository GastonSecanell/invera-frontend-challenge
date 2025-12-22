interface Props {
  type?: "success" | "error";
  children: React.ReactNode;
}

export default function Alert({ type = "success", children }: Props) {
  const styles = {
    success: "bg-green-500/10 text-green-400 border-green-500/30",
    error: "bg-red-500/10 text-red-400 border-red-500/30",
  };

  return (
    <div
      className={`
        mb-4 rounded-md border px-4 py-2 text-sm
        ${styles[type]}
      `}
    >
      {children}
    </div>
  );
}
