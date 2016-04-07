import expect from 'expect'
import fauxFetch from '../index'
import localStorage from '../localStorage'

const immediateFetch = fauxFetch({ delay: 0 })

describe('GET', () => {
  before((done) => {
    immediateFetch({
      url: '/get_test',
      method: 'put',
      body: { get: 'works' },
      success: () => done()
    })
  })

  it('fetches the whole resource', (done) => {
    immediateFetch({
      url: '/get_test',
      success: (result) => {
        expect(result.get).toEqual('works');
        done();
      }
    })
  })
})

describe('PUT', () => {
  before((done) => {
    immediateFetch({
      url: '/get_test',
      method: 'put',
      body: { put: 'does not work', really: true },
      success: () => done()
    })
  })

  it('replaces the whole resource', (done) => {
    immediateFetch({
      url: '/put_test',
      method: 'put',
      body: { put: 'works' },
      success: (result) => {
        expect(result.put).toEqual('works');
        expect(result.really).toNotExist();
        done();
      }
    })
  })
})

describe('Configuring', () => {
  describe('delay', () => {

    context('when it is a number', () => {
      it('waits at least the amount of time specified', (done) => {
        const before = Date.now()
        fauxFetch({
          delay: 300,
          url: '/delay_test',
          success: (result) => {
            expect(Date.now() - before).toBeGreaterThan(300)
            done();
          }
        })
      })
    })

    context('when it is a function', () => {
      it('it waits the amount returned by invoking it', (done) => {
        const before = Date.now()
        fauxFetch({
          delay: () => 300,
          url: '/delay_test',
          success: (result) => {
            expect(Date.now() - before).toBeGreaterThan(300)
            done();
          }
        })
      })
    })

  })
})
