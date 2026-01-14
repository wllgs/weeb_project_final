import Button from "./Button";

export default {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
};

export const Primary = {
  args: {
    children: "Primary button",
  },
};

export const Disabled = {
  args: {
    children: "Disabled button",
    disabled: true,
  },
};

export const Outline = {
  args: {
    children: "Outline button",
    className: "bg-transparent border border-white text-white hover:bg-white hover:text-[#0F172A]",
  },
};
