
export const useField = (type, name, value, setValue) => {

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    name,
    value,
    onChange,
    reset
  }
}