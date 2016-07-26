var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    config = require('config'),
    port = config.get('port'),
    testingUrl = 'http://localhost:' + port,
    api = supertest(testingUrl)

describe('Get /', () => {
    it('should render the homepage', (done) => {
        api.get('/')
            .expect(200, done)
    })

}
        )


