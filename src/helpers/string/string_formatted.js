const { v4: uuid4 } = require('uuid')
const crypto = require('crypto')

const convertToUpperCase = (str) => {
  return str.toUpperCase()
}

const convertToLowerCase = (str) => {
  return str.toLowerCase()
}

const convertToCapitalizedCase = (str) => {
  return str.split(' ').map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  }).join(' ')
}

const generateUuidV4 = () => {
  return uuid4()
}

const generateRandomCharacter = (length) => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let randomCharacter = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, charset.length)
    randomCharacter += charset[randomIndex]
  }

  return randomCharacter
}

const generateUsernameFromName = (name) => {
  return name.trim().replace(/\s+/g, '_').toLowerCase() + '_' + generateRandomCharacter(5)
}

module.exports = {
  convertToUpperCase,
  convertToLowerCase,
  convertToCapitalizedCase,
  generateUuidV4,
  generateRandomCharacter,
  generateUsernameFromName
}