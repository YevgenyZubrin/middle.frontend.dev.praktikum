const trim = (str: string, symbolsStr: string = '') => {
  let strClone = str.trim()
  const symbolsStrList = symbolsStr.split('')

  if (symbolsStrList.length) {
    for (let i = 0; i < symbolsStrList.length; i += 1) {
      strClone = strClone
        .split('')
        .map((item) => item.replace(symbolsStrList[i], ''))
        .join('')
    }
  }
  return strClone
}

export default trim
