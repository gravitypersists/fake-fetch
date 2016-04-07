import expect from 'expect'
import fakeFetch from '../index'

describe('PUT', () => {
  it('works', (done) => {
    fakeFetch(undefined, {
      url: '/test',
      method: 'put',
      body: { works: 'yes' },
      success: (result) => {
        expect(result.works).toEqual('yes');
        done();
      }
    })
  })
})

describe('Configuring', () => {
  describe('timeout', () => {
    it('waits at least the amount of time specified', (done) => {
      const before = Date.now()
      fakeFetch({
        delay: 300
      }, {
        url: '/test',
        success: (result) => {
          expect(Date.now() - before).toBeGreaterThan(300)
          done();
        }
      })
    })
  })
})
