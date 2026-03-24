import { useCallback, useMemo, useState } from 'react';

export function useForm({ initialValues = {}, validate } = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const runValidation = useCallback(
    (nextValues = values) => {
      if (!validate) {
        setErrors({});
        return {};
      }

      const validationErrors = validate(nextValues) || {};
      setErrors(validationErrors);
      return validationErrors;
    },
    [validate, values]
  );

  const setValue = useCallback((name, value) => {
    setValues((current) => ({
      ...current,
      [name]: typeof value === 'function' ? value(current[name]) : value
    }));
  }, []);

  const handleChange = useCallback((event) => {
    const { name, type, value, checked } = event.target;
    setValue(name, type === 'checkbox' ? checked : value);
  }, [setValue]);

  const handleBlur = useCallback((event) => {
    const { name } = event.target;
    setTouched((current) => ({ ...current, [name]: true }));
  }, []);

  const validateForm = useCallback(() => runValidation(values), [runValidation, values]);

  const reset = useCallback((nextValues = initialValues) => {
    setValues(nextValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return useMemo(
    () => ({
      values,
      errors,
      touched,
      setValue,
      setValues,
      setErrors,
      handleChange,
      handleBlur,
      validateForm,
      reset
    }),
    [
      errors,
      handleBlur,
      handleChange,
      reset,
      setValue,
      touched,
      validateForm,
      values
    ]
  );
}
