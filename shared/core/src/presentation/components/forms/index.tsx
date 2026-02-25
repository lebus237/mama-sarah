import FormButton from './FormButton'
import { type AsyncMultiSelectProps } from './input/MultiSelectInput'
import AppSelectInput, { type AppSelectInputType } from './input/SelectInput'
import TextEditorInput, { type TextEditorProps } from './input/TextEditorInput'
import AppInput, { type TextInputType } from './input/TextInput'
import UploadInput, { type UploadInputType } from './input/UploadInput'
import AppSwitchInput, { type AppSwitchInputType } from './input/SwitchInput'
import AppEnumInput, { type AppEnumInputType } from './input/EnumInput'
import { DateInput, type DateInputType } from './input/DateInput/DateInput'
import AsyncComboboxInput, { type AsyncComboboxInputProps } from './input/AsyncComboboxInput'
import AppAsyncSelectInput, { type AsyncSelectProps } from './input/AsyncSelectInput'
import AppAsyncMultiSelect from './input/MultiSelectInput'
import { withFormBlock } from './withFormBlock'
import CardCheckboxInput, { type CardCheckboxInputType } from './input/Checkbox/CardCheckboxInput'
import CheckboxInput, { type CheckboxInputType } from './input/Checkbox/CheckboxInput'
import AutocompleteInput, { type AsyncAutocompleteInputProps } from './input/AutocompleteInput'
import DateOfBirthInput, { type DateOfBirthInputProps } from './input/DateOfBirthInput'

export { default as FormButton } from './FormButton'
export { FormWrapper } from './FormWrapper'
export { withFormBlock } from './withFormBlock'

// Export all components individually
export { default as AsyncComboboxInput } from './input/AsyncComboboxInput'
export { default as AppAsyncSelectInput } from './input/AsyncSelectInput'
export { default as AsyncAutocompleteInput } from './input/AutocompleteInput'
export { default as CardCheckboxInput } from './input/Checkbox/CardCheckboxInput'
export { default as CheckboxInput } from './input/Checkbox/CheckboxInput'
export { DateInput } from './input/DateInput/DateInput'
export { default as DateOfBirthInput } from './input/DateOfBirthInput'
export { default as AppEnumInput } from './input/EnumInput'
export { default as AppAsyncMultiSelect } from './input/MultiSelectInput'
export { default as AppSelectInput } from './input/SelectInput'
export { default as AppSwitchInput } from './input/SwitchInput'
export { default as TextEditorInput } from './input/TextEditorInput'
export { default as AppInput } from './input/TextInput'
export { default as UploadInput } from './input/UploadInput'

// Export all types
export type { AsyncComboboxInputProps } from './input/AsyncComboboxInput'
export type { AsyncSelectProps } from './input/AsyncSelectInput'
export type { AsyncAutocompleteInputProps } from './input/AutocompleteInput'
export type { CardCheckboxInputType } from './input/Checkbox/CardCheckboxInput'
export type { CheckboxInputType } from './input/Checkbox/CheckboxInput'
export type { DateInputType } from './input/DateInput/DateInput'
export type { AppEnumInputType } from './input/EnumInput'
export type { AsyncMultiSelectProps } from './input/MultiSelectInput'
export type { AppSelectInputType } from './input/SelectInput'
export type { AppSwitchInputType } from './input/SwitchInput'
export type { TextEditorProps } from './input/TextEditorInput'
export type { TextInputType } from './input/TextInput'
export type { UploadInputType } from './input/UploadInput'

export class Field {
   static Input = withFormBlock<TextInputType>(AppInput)
   static DateOfBirth = withFormBlock<DateOfBirthInputProps>(DateOfBirthInput)
   static Editor = withFormBlock<TextEditorProps>(TextEditorInput)
   static Select = withFormBlock<AppSelectInputType>(AppSelectInput)
   static AppAsyncMultiSelect = withFormBlock<AsyncMultiSelectProps>(AppAsyncMultiSelect)
   static AsyncComboboxInput = withFormBlock<AsyncComboboxInputProps>(AsyncComboboxInput)
   static AsyncSelectInput = withFormBlock<AsyncSelectProps>(AppAsyncSelectInput)
   static Autocomplete = withFormBlock<AsyncAutocompleteInputProps>(AutocompleteInput)
   static Enum = withFormBlock<AppEnumInputType>(AppEnumInput)
   static Switch = withFormBlock<AppSwitchInputType>(AppSwitchInput)
   static Upload = withFormBlock<UploadInputType>(UploadInput)
   static CheckboxInput = withFormBlock<CardCheckboxInputType>(CheckboxInput)
   static CardCheckboxInput = withFormBlock<CheckboxInputType>(CardCheckboxInput)
   static Date = withFormBlock<DateInputType>(DateInput)
   static Button = FormButton
}
