// export const Button: React.FunctionComponent<{ text: string }> = ({ text }) => {
//   return <button>{text}</button>
// }

interface Props {
  primary?: boolean;
  size?: "small" | "large";
  label?: string;
}
 
export const Button = ({
  primary = false,
  label = "Boop",
  size = "small",
}: Props) => {
  return (
    <button
      style={{
        backgroundColor: primary ? "red" : "blue",
        fontSize: size === "large" ? "24px" : "14px",
      }}
    >
      WORKS{label}
    </button>
  );
};