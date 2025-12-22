interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function Checkbox({ checked, onChange }: Props) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`
        h-4 w-4
        flex items-center justify-center
        rounded-[4px]
        border
        transition
        ${
          checked
            ? "bg-[#7B99FF] border-[#7B99FF]"
            : "border-[#5F5F5F] bg-transparent hover:border-[#7B99FF]"
        }
      `}
    >
      {checked && (
        <svg
          width="10"
          height="8"
          viewBox="0 0 10 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 4L4 7L9 1"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
