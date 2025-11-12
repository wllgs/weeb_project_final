import { useState } from "react";

export default function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [focus, setFocus] = useState(
    Object.fromEntries(Object.keys(initialValues).map(k => [k, false]))
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };
  const handleFocus = (field) => setFocus((prev) => ({ ...prev, [field]: true }));
  const handleBlur = (field) => setFocus((prev) => ({ ...prev, [field]: false }));
  const handleInputFocus = (field) => () => handleFocus(field);
  const handleInputBlur = (field) => () => handleBlur(field);

  return {
    values,
    setValues,
    focus,
    setFocus,
    handleChange,
    handleInputFocus,
    handleInputBlur,
  };
}
