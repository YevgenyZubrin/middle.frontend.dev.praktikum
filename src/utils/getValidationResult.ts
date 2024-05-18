import validate from './validate'

const getValidationResult = <F extends AnyProps>(form: F): F => {
  const errors: AnyProps = {}

  Object.entries(form).forEach(([fieldName, value]) => {
    errors[fieldName] = validate(fieldName, value ? (value as string) : '')
  })

  return errors as F
}

export default getValidationResult
