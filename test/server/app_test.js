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

describe('Post ', () =>{
    var user = JSON.stringify({ email: "dude@gmail.com",
                                password: "abcde"})
    it('creates an account', (done) => {
        api.post('/signup')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(user)
            .expect(200)
            .expect((res) => {
                user_response = res.body.user 
                return (user_response.hasOwnProperty('email') &&
                        user_response.hasOwnProperty('username') &&
                        user_response.hasOwnProperty('firstName') &&
                        user_response.hasOwnProperty('lastName'))
            })
            .end(done)
    })




