
const defaultMethods = {
  'get': (original) => original || null,
  'put': (original, body) => body,
  'post': (original, body) => body,
  'patch': (original, body) => body,
  'delete': (original) => null
}

const defaultOptions = {
  method: 'get',
  body: {},
  success: () => {},
  error: () => {},
  delay: 200,
  custom: {}
}

const readLS = (key) => {
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item) : null
}

const setLS = (key, val) => {
  localStorage.setItem(key, JSON.stringify(val))
}

const resolveDelay = (delay) => {
  switch (typeof delay) {
    case 'number': return delay
    case 'function': return delay()
    default: return defaultOptions.delay
  }
}

const fauxFetch = (customOptions) => {
  // partial application (kinda like currying), does not invoke fetch
  // until url is provided
  if (!customOptions.url) {
    return (newOptions) => fauxFetch({ ...customOptions, ...newOptions })
  }

  const options = { ...defaultOptions, ...customOptions }
  const { url, method, body, success, error, delay, custom } = options
  const original = readLS(url)
  const func = custom[url] ? { defaultMethods, ...custom[url] }[method] : defaultMethods[method]
  const calculatedResult = func(original, body)
  setLS(url, calculatedResult)
  setTimeout(() => { success(readLS(url)) }, resolveDelay(delay))
}

export default fauxFetch
