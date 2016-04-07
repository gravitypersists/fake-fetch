import expect from 'expect'
import fakeFetch from '../index'

describe('GET', () => {
  before((done) => {
    fakeFetch({ delay: 10 }, {
      url: '/get_test',
      method: 'put',
      body: { get: 'works' },
      success: () => done()
    })
  })

  it('fetches the whole resource', (done) => {
    fakeFetch(undefined, {
      url: '/get_test',
      success: (result) => {
        expect(result.get).toEqual('works');
        done();
      }
    })
  })
})

describe('PUT', () => {
  it('works', (done) => {
    fakeFetch(undefined, {
      url: '/put_test',
      method: 'put',
      body: { put: 'works' },
      success: (result) => {
        expect(result.put).toEqual('works');
        done();
      }
    })
  })
})

describe('Configuring', () => {
  describe('delay', () => {
    it('waits at least the amount of time specified', (done) => {
      const before = Date.now()
      fakeFetch({
        delay: 300
      }, {
        url: '/delay_test',
        success: (result) => {
          expect(Date.now() - before).toBeGreaterThan(300)
          done();
        }
      })
    })
  })
})
