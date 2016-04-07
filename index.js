import { LocalStorage } from 'node-localstorage'
const localStorage = new LocalStorage('./scratch')

const defaultDelay = 200

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
  error: () => {}
}

const readLS = (key) => {
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item) : null
}

const setLS = (key, val) => {
  localStorage.setItem(key, JSON.stringify(val))
}

const fakeFetch = (config = {}, mockOptions) => {
  const options = { ...defaultOptions, ...mockOptions }
  const { url, method, body, success, error } = options
  const original = readLS(url)
  const func = config[url] ? { defaultMethods, ...config[url] }[method] : defaultMethods[method]
  const calculatedResult = func(original, body)
  setLS(url, calculatedResult)
  setTimeout(() => { success(readLS(url)) }, config.delay || defaultDelay)
}

export default fakeFetch
