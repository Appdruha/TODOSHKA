import { FieldValues, RegisterOptions } from 'react-hook-form'

export interface ControlledDateTimePickerProps {
  name: string
  label: string
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >
}