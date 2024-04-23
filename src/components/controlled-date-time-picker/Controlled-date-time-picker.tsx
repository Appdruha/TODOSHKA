import { Controller, useFormContext } from 'react-hook-form'
import { ControlledDateTimePickerProps } from './Controlled-date-time-picker-props.ts'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

export const ControlledDateTimePicker = (
  {
    name,
    rules = { required: 'Поле не заполнено' },
    label,
  }: ControlledDateTimePickerProps) => {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field: { value = new Date(), onChange }, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label={label}
            value={dayjs(value)}
            onChange={(newValue) => onChange(dayjs(newValue).format('MM/DD/YYYY hh:mm a'))}
          />
          <p style={{color: 'red'}}>{error?.message}</p>
        </LocalizationProvider>
      )}
    />
  )
}