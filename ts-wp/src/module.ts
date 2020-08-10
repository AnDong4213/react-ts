
const toString = Object.prototype.toString

function isDate(val: any): val is Date {
  return toString.call(val) === '[Object Date]'
}

function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}

function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}


export function buildURL(url: string, params?: any): string {
  if (!params) {
    return url
  }

  const parts: string[] = []

  Object.keys(params).forEach(key => {
    const val = params[key]
    if (val === null || typeof val === 'undefined') {
      return
    }
    let values = []
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${key}=${val}`)
    })
  })
  console.log(parts)

  let serializedParams = parts.join('&')
  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}

console.log(buildURL('/base/get?age=bar', {
  foo: ['aa', 'bb']
}))
