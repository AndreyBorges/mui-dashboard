import { TextField, TextFieldProps } from '@mui/material'
import { useField } from '@unform/core'
import { FC, useEffect, useState } from 'react'

type TVTextfieldProps = TextFieldProps & {
  name: string
}

const VTextfield: FC<TVTextfieldProps> = ({ name, ...rest }) => {
  const { fieldName, registerField, defaultValue, error, clearError } = useField(name)

  const [value, setValue] = useState(defaultValue || '')

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue)
    })
  }, [fieldName, registerField, value])

  return (
    <TextField
      {...rest}
      value={value}
      error={!!error}
      helperText={error}
      defaultValue={defaultValue}
      onChange={e => {
        setValue(e.target.value)
        rest.onChange?.(e)
      }}
      onKeyDown={e => {
        error && clearError()
        rest.onKeyDown?.(e)
      }}
    />
  )
}

export default VTextfield
