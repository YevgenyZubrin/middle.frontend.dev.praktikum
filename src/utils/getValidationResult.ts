import validate from './validate'

const getValidationResult = (formElement: EventTarget): any[] => {
  if (formElement instanceof HTMLFormElement) {
    const formData = new FormData(formElement)
    const formValues = Object.fromEntries(formData.entries())

    const isValidationPassed = Object.entries(formValues)
      .every(([fieldName, value]) => !validate(fieldName, value as string))

    const validatedList: any[] = []
    Object.entries(formValues)
      .forEach(([fieldName, value]) => {
        if (validate(fieldName, value as string)) {
          validatedList.push({ [fieldName]: validate(fieldName, value as string) })
        }
      })

    if (isValidationPassed) {
      console.log(formValues)
    }
    return validatedList
  }
  return []
}

export default getValidationResult
