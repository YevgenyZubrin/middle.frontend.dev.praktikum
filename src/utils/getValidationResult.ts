import validate from './validate'

const getValidationResult = (formElement: EventTarget): Record<string, string>[] => {
  if (formElement instanceof HTMLFormElement) {
    const formData = new FormData(formElement)
    const formValues = Object.fromEntries(formData.entries())

    const isValidationPassed = Object.entries(formValues).every(
      ([fieldName, value]) => !validate(fieldName, value as string),
    )

    const validatedList: Record<string, string>[] = []
    Object.entries(formValues).forEach(([fieldName, value]) => {
      if (validate(fieldName, value as string)) {
        validatedList.push({
          [fieldName]: validate(fieldName, value as string),
        })
      }
    })

    if (isValidationPassed) {
      // eslint-disable-next-line no-console
      console.log(formValues)
    }
    return validatedList
  }
  return []
}

export default getValidationResult
