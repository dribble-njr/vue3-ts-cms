type FormType = 'input' | 'password' | 'select' | 'datepicker'

export interface FormItem {
  field: string
  type: FormType
  label: string
  rules?: any[]
  placeholder?: any
  options?: any[]
  otherOptions?: any
}

export interface Form {
  formItems: FormItem[]
  labelWidth?: string
  colLayout?: any
  itemLayout?: any
}
