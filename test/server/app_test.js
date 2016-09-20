
var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest-as-promised'),
    config = require('config'),
    port = config.get('port'),
    testingUrl = 'http://localhost:' + port,
    api = supertest(testingUrl),
    DB = require('../../src/server/model/models.js')
    server = require('../../src/server/app.js')

function createAccount(email, password){
    var user = JSON.stringify({ email: email,
                                password: password})
}
  
describe('Express Rest API', () => {
    var app
    
    before(() => {
        console.log(`Testing Port:
                    ${config.get('port')}`)

        return DB.sync({force: true}).then(() => {
            app = server.listen(config.get('port'))
        })
            
    })

    after(() => {
        app.close()
    })

    describe('GET Homepage', () => {
        it('should render the homepage', () => {
            return api.get('/')
                .expect(200)
        })
    })

    describe('Signup -- Account Creation', () => {
        var user = { email: 'dude500@gmail.com',
                     username: 'dude500@gmail.com',
                     password: 'abcde'}
        
        it('creates an account', () => {
            return api.post('/signup')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send(JSON.stringify(user))
                .expect(200)
                .then((res) => {
                    user_response = res.body.user
                    return expect(user_response.username).to.equal(user.email) &&
                    expect(user_response.email).to.equal(null) && 
                    expect(user_response.firstName).to.equal(null) &&
                    expect(user_response.lastName).to.equal(null)
            })
        })
    })
    
    describe('Login', () =>{
        // username being email is a little messed up here -- a miscue that cost me several hours  
        var user = { username: "dude@gmail.com",
                     email: "dude@gmail.com",
                     password: "abcde"}
       
        it('logs into an account', () => {
            return api.post('/signup')
                .accept('application/json')
                .type('application/json')
                .send(JSON.stringify(user))
                .expect(200)
                .then((res) => {
                    return api.post('/login')
                        .type('application/json')
                        .accept('application/json')
                        .send(JSON.stringify(user))
                        .expect(200)
                        .then((res) => {
                            login_response = res.body // not sure this is right either
                            return expect(login_response.user.email).to.equal(null) &&
                                expect(login_response.token).to.not.equal(null)
                        })
                })
        })
    })

    describe('timings ', () => {
        var token

        var user = { username: "dude9999@gmail.com",
                     email: "dude9999@gmail.com",
                     password: "abcde"}

        before(() => {
            return api.post('/signup')
                .accept('application/json')
                .type('application/json')
                .send(JSON.stringify(user))
                .expect(200)
                .then((res) => {
                    return api.post('/login')
                        .type('application/json')
                        .accept('application/json')
                        .send(JSON.stringify(user))
                        .expect(200)
                        .then((response) => {
                            return token = response.body.token
                        })
                })
        })

        var recordBody = JSON.stringify({ 
            label: 'grocery',
            startTime: Date.now(),
            duration: 5000
        })
            
        it('can record a timing', () => {
            return api.post('/recordTimer')
                .type('application/json')
                .accept('application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(recordBody)
                .expect(200)
        })

        it('gets a list of timings', () => {

            var timingsBody = JSON.stringify({ 
                label: "grocery"
            })

            return api.post('/timings')
                .type('application/json')
                .accept('application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(timingsBody)
                .expect(200)
                .then((res) => {
                    result = res.body
                    return expect(result.length).to.equal(1) && expect(result[0].duration).to.equal(5000) && expect(result[0].label).to.equal('grocery')
                })
        })

        it('gets a list of timings', () => {

            var timingsBody = JSON.stringify({ 
                label: "something-nonexistant"
            })

            return api.post('/timings')
                .type('application/json')
                .accept('application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(timingsBody)
                .expect(200)
                .then((res) => {
                    result = res.body
                    return expect(result).to.eql([])
                })
        })
    })
})





        
        
