import validate from './validate'

const formSubmit = (e: Event): any[] => {
  e.preventDefault()
  if (e.target instanceof HTMLFormElement) {
    const formData = new FormData(e.target)
    const formValues = Object.fromEntries(formData.entries())

    const isValidationPassed = Object.entries(formValues)
      .every(([fieldName, value]) => validate(fieldName, value as string))

    const validatedList: any[] = []
    Object.entries(formValues)
      .forEach(([fieldName, value]) => {
        if (!validate(fieldName, value as string)) {
          validatedList.push(fieldName)
        }
      })

    if (isValidationPassed) {
      console.log(formValues)
    }
    return validatedList
  }
  return []
}

export default formSubmit
