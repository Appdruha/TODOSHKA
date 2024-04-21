import { FieldValues, RegisterOptions } from 'react-hook-form'
import { SxProps, Theme } from '@mui/material'
import { HTMLInputTypeAttribute } from 'react'

export interface ControlledTextFieldProps {
  name: string
  label: string
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >
  sx?: SxProps<Theme> | undefined
  type?: HTMLInputTypeAttribute | undefined
  multiline?: boolean
}