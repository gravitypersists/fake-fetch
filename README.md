
### Faux Fetch

A utility that uses local storage to mock servers. Currently, it assumes the same API as [fancy-fetch](https://github.com/anyperk/fancy-fetch) as I intend to use it as a drop-in replacement with that library, though I'd like for it support raw fetch as well in the future.

## Usage

```
import fauxFetch from 'faux-fetch'

// Puts an entry into local storage
fauxFetch({
  url: '/me',
  method: 'put',
  body: { name: 'Smeagol' }
  success: (result) => {
    console.log(result) // { name: 'Smeagol' }
  }
})

// Get an entry from local storage
fauxFetch({
  url: '/me',
  success: (result) => {
    console.log(result) // { name: 'Smeagol' }
  }
})

```

In the real world, it takes some time for these requests to occur. fauxFetch uses `setTimeout` with a default delay of 200ms. You can provide your own custom delay, along with many other options, within the object passed to fauxFetch.

# Options:

  - `url`: *String*
  - `body`: *Object|String|Null* (anything `JSON.parse`able)
  - `success`: *Function*
  - `error`: *Function*
  - `delay`: *Number*
  - `custom`: *Object*

If you do not provide a `url` parameter in these options, fauxFetch will give you a partially applied function, this will let you configure fetch how you please. For example:

```
const ImmediateFetch = fauxFetch({ delay: 0 })
```

Will give you a faux fetcher that does not wait the default 200ms. You might want to customize how your server API works, however:

```
const customFetch = fauxFetch({
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
