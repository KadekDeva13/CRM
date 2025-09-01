// eslint-disable-next-line no-unused-vars
export default function Button({ as: As = "button", className = "", ...props }) {
  return (
    <As
      className={[
        "inline-flex items-center justify-center rounded-xl",
        "bg-blue-600 px-4 py-2.5 text-[15px] font-semibold text-white",
        "ring-1 ring-blue-600/20 hover:bg-blue-700 transition",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        className,
      ].join(" ")}
      {...props}
    />
  );
}
