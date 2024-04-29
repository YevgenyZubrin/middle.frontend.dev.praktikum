const validate = (fieldName: string, value: string): string => {
  let isValid: boolean = false
  switch (fieldName) {
    case 'email': {
      isValid = Boolean(value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z]+(\.[a-zA-Z]{2,})+$/))
      break
    }
    case 'login': {
      isValid = Boolean(value.match(/^(?!^\d+$)[a-zA-Z0-9_-]{3,20}$/))
      break
    }
    case 'phone': {
      isValid = Boolean(value.match(/^\+?\d{10,15}$/))
      break
    }
    case 'display_name':
    case 'first_name':
    case 'second_name': {
      isValid = Boolean(value.match(/^[A-ZА-Я][A-Za-zА-Яа-я-]*$/))
      break
    }

    case 'oldPassword':
    case 'newPassword':
    case 'password':
    case 'confirmPassword': {
      isValid = Boolean(value.match(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/))
      break
    }
    case 'message': {
      isValid = Boolean(value.match(/^.+$/))
      break
    }
    default:
  }

  // TODO: сделать информативные ошибки, пока пропускаю по причине нехватки времени
  return isValid ? '' : 'Некорректные данные'
}

export default validate
