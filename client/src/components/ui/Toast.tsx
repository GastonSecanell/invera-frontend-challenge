interface Props {
  message: string;
  type: "success" | "error" | "info";
}

export default function Toast({ message, type }: Props) {
  const styles = {
    success: "bg-green-500/10 border-green-500/30 text-green-400",
    error: "bg-red-500/10 border-red-500/30 text-red-400",
    info: "bg-blue-500/10 border-blue-500/30 text-blue-400",
  };

  return (
    <div
      className={`
        fixed top-5 right-5 z-50
        rounded-md
        border
        px-4 py-2
        text-sm
        shadow-lg
        animate-fadeIn
        ${styles[type]}
      `}
    >
      {message}
    </div>
  );
}
