const {
  convertToUpperCase,
  convertToLowerCase,
  convertToCapitalizedCase,
  convertToFormatDate,
  generateRandomCharacter
} = require('../../../../helpers/string/string_formatted')

describe('~/helpers/string/string_formatted.js', () => {
  describe("Function 'convertToUpperCase'", () => {
    it('should convert string to uppercase', () => {
      const str = 'heLlO WOrlD'
      const expected = 'HELLO WORLD'

      expect(convertToUpperCase(str)).toEqual(expected)
    })

    it('should return empty string when string is empty', () => {
      const str = ''
      const expected = ''

      expect(convertToUpperCase(str)).toEqual(expected)
    })
  })

  describe("Function 'convertToLowerCase'", () => {
    it('should convert string to lowercase', () => {
      const str = 'heLlO WOrlD'
      const expected = 'hello world'

      expect(convertToLowerCase(str)).toEqual(expected)
    })

    it('should return empty string when string is empty', () => {
      const str = ''
      const expected = ''

      expect(convertToLowerCase(str)).toEqual(expected)
    })
  })

  describe("Function 'convertToCapitalizedCase'", () => {
    it('should convert string to capitalized case', () => {
      const str = 'heLlO WOrlD'
      const expected = 'Hello World'

      expect(convertToCapitalizedCase(str)).toEqual(expected)
    })

    it('should return empty string when string is empty', () => {
      const str = ''
      const expected = ''

      expect(convertToCapitalizedCase(str)).toEqual(expected)
    })
  })

  describe("Function 'convertToFormatDate'", () => {
    it('should return an empty string if no date is provided', () => {
      expect(convertToFormatDate()).toBe('')
    })

    it('should return a formatted date string if a valid date is provided', () => {
      const date = new Date('2022-03-20T12:34:56')
      expect(convertToFormatDate(date)).toBe('2022-03-20 12:34')
    })
  })

  describe("Function 'generateRandomCharacter'", () => {
    it('should generate a random character', () => {
      const length = 100
      const randomCharacter = generateRandomCharacter(length)

      expect(randomCharacter).toMatch(/^[a-zA-Z0-9]{100}$/)
    })

    it('should generate a random character with the correct length', () => {
      const length = 50
      const randomCharacter = generateRandomCharacter(length)

      expect(randomCharacter.length).toEqual(length)
    })
  })

})