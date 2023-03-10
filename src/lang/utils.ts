import { useIntl } from 'react-intl'

export const flattenMessages = (nestedMessages: any, prefix = '') => {
  if (nestedMessages === null) {
    return {}
  }
  return Object.keys(nestedMessages).reduce((messages, key) => {
    const value = nestedMessages[key]
    const prefixedKey = prefix ? `${prefix}.${key}` : key

    if (typeof value === 'string') {
      Object.assign(messages, { [prefixedKey]: value })
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey))
    }

    return messages
  }, {})
}

export const T = (id: string) => {
  const intl = useIntl()
  return intl.formatMessage({ id })
}
