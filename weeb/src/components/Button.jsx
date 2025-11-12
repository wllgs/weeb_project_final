export default function Button({ children, className = "", type = "button", as: Component = "button", ...props }) {
  const disabledStyles = props.disabled ? " opacity-60 cursor-not-allowed" : "";
  const combinedClassName =
    "bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-purple-500 transition text-lg " +
    className +
    disabledStyles;

  const componentProps = { ...props, className: combinedClassName };
  if (Component === "button" || Component === undefined) {
    componentProps.type = type;
  }

  return <Component {...componentProps}>{children}</Component>;
}
