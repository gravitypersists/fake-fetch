
### Fake Fetch

A utility that uses local storage to mock servers. Currently, it assumes the same API as [fancy-fetch](https://github.com/anyperk/fancy-fetch) as I intend to use it as a drop-in replacement with that library, though I'd like for it support raw fetch as well in the future.

## Usage

```
import fakeFetch from 'fake-fetch'

// Puts an entry into local storage
fakeFetch({
  url: '/me',
  method: 'put',
  body: { name: 'Smeagol' }
  success: (result) => {
    console.log(result) // { name: 'Smeagol' }
  }
})

// Get an entry from local storage
fakeFetch({
  url: '/me',
  success: (result) => {
    console.log(result) // { name: 'Smeagol' }
  }
})

```

In the real world, it takes some time for these requests to occur. fakeFetch uses `setTimeout` with a default delay of 200ms. You can provide your own custom delay, along with many other options, within the object passed to fakeFetch.

# Options:

  - `url`: *String*
  - `body`: *Object|String|Null* (anything `JSON.parse`able)
  - `success`: *Function*
  - `error`: *Function*
  - `delay`: *Number*
  - `custom`: *Object*

If you do not provide a `url` parameter in these options, fakeFetch will give you a partially applied function, this will let you configure fetch how you please. For example:

```
const ImmediateFetch = fakeFetch({ delay: 0 })
```

Will give you a fake fetcher that does not wait the default 200ms. You might want to customize how your server API works, however:

```
const customFetch = fakeFetch({
  custom: {
    '/me/get_ring': {
      'post': () => {
        immediateFetch({
          url: '/me',
          method: 'post',
          body: { age: 'old', name: 'Gollum' }
        })
      }
    }
  }
})

customFetch({
  url: '/me',
  success: (result) => {
    console.log(result) // { name: 'Smeagol' }
  }
})

customFetch({ url: '/me/get_ring' })

customFetch({
  url: '/me',
  success: (result) => {
    console.log(result) // { name: 'Gollum', age: 'old' }
  }
})
```

I'm still working on making this cleaner.
