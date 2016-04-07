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
