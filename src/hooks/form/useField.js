import { useMemo } from 'react';

export function useField(form, name) {
  return useMemo(
    () => ({
      name,
      value: form.values[name] ?? '',
      error: form.errors[name],
      touched: Boolean(form.touched[name]),
      onChange: form.handleChange,
      onBlur: form.handleBlur,
      setValue: (value) => form.setValue(name, value)
    }),
    [form, name]
  );
}
