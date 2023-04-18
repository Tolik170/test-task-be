export const encryptMessage = (message: string, shift: number) => {
  shift = ((shift % 26) + 26) % 26

  const chars = message.split('')

  const ciphered = chars.map((item) => {
    if (item.match(/[a-z]/i)) {
      let code = item.charCodeAt(0)

      const isUpperCase = code >= 65 && code <= 90

      const firstCharCode = isUpperCase ? 65 : 97

      code = ((code - firstCharCode + shift) % 26) + firstCharCode

      item = String.fromCharCode(code)

      if (isUpperCase) {
        item = item.toUpperCase()
      }
    }

    return item
  })

  return ciphered.join('')
}

export const decryptMessage = (cipheredMessage: string, shift: number) => {
  shift = ((shift % 26) + 26) % 26

  const chars = cipheredMessage.split('')

  const deciphered = chars.map((item) => {
    if (item.match(/[a-z]/i)) {
      let code = item.charCodeAt(0)

      const isUpperCase = code >= 65 && code <= 90

      const firstCharCode = isUpperCase ? 65 : 97

      code = ((code - firstCharCode - shift + 26) % 26) + firstCharCode

      item = String.fromCharCode(code)

      if (isUpperCase) {
        item = item.toUpperCase()
      }
    }

    return item
  })

  return deciphered.join('')
}
