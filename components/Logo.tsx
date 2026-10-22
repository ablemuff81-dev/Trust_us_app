import logoUrl from "@/assets/logo.svg";

const SIZES = {
  sm: "size-8 rounded-lg",
  md: "size-9 rounded-xl",
  lg: "size-12 rounded-2xl",
} as const;

/** The leaf mark on its light plate, so it reads the same in both themes. */
export function Logo({
  size = "md",
  className = "",
}: {
  size?: keyof typeof SIZES;
  className?: string;
}) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center overflow-hidden bg-[#F2F0EC] ${SIZES[size]} ${className}`}
    >
      <img src={logoUrl} alt="Trust Us" className="size-full object-cover" />
    </span>
  );
}
