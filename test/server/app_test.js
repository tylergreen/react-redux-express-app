
var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest-as-promised'),
    config = require('config'),
    port = config.get('port'),
    testingUrl = 'http://localhost:' + port,
    api = supertest(testingUrl),
    server = require('../../src/server/app.js') // figure out how to get to root path easier to avoid coupling both project AND test directory structure

function createAccount(email, password){
    var user = JSON.stringify({ email: email,
                                password: password})
}
  
describe('Express Rest API', () => {
    var app
    
    beforeEach(() => {
        console.log(`Testing Port: ${config.get('port')}`)
        app = server.listen(config.get('port'))
    })
           

    afterEach((done) => {
        app.close(done)
    })

    // move to separate test helpers file or pre-load the fixture


    describe('GET Homepage', () => {
        it('should render the homepage', () => {
            return api.get('/')
                .expect(200)
        })
    })

    describe('Signup -- Account Creation', () => {
        var user = JSON.stringify({ email: "dude@gmail.com",
                                    password: "abcde"})
        
        it('creates an account', () => {
            return api.post('/signup')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send(user)
                .expect(200)
                .then((res) => {
                    user_response = res.body.user 
                   return  expect(user_response.email).to.equal('dude@gmail.com') &&
                    expect(user_response.username).to.equal(null) && 
                    expect(user_response.firstName).to.equal(null) &&
                    expect(user_response.lastName).to.equal(null)
            })
        })
    })
    
    describe('Login', () =>{
        // username being email is a little messed up here -- a miscue that cost me several hours 
         var user = JSON.stringify({ username: "dude@gmail.com",
                                     password: "abcde"})


        var token

        // need to add this a test fixture for test db
        // before((done) => {
        //     api.post('/signup')
        //         .set('Accept', 'application/json')
        //         .set('Content-Type', 'application/json')
        //         .send(user)
        //         .end(done)
        // })

        
        it('logs into an account', () => {
            // user should already exist bc there is currently no setup or teardown
            return api.post('/login')
                .type('application/json')
                .accept('application/json')
                .send(user)
                .expect(200)
                .then((res) => {
                    login_response = res.body // not sure this is right either
                    console.log("user is")
                    console.log(res.body.user)
                    return expect(login_response.user.email).to.equal("dude@gmail.com") &&
                expect(login_response.token).to.not.equal(null)
                })
        })
    })

    describe('timings ', () =>{
        var token

        beforeEach(() => {
            var user = JSON.stringify({ username: "dude@gmail.com",
                                        password: "abcde"})
        

            return api.post('/login')
                .accept('application/json')
                .type('application/json')
                .send(user)
                .expect(200)
                .then((res)  => {
                    token = res.body.token
                })
        })

    //need to have an exising user

        it('can record a timing', () => {

            var body = JSON.stringify({ 
                label: "grocery",
                startTime: Date.now(),
                duration: 5000
            })
            
            api.post('/recordTimer')
                .type('application/json')
                .accept('application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(body)
                .expect(200)
        }
          )

        it('gets a list of timings', () => {
            // user should already exist bc there is currently no setup or teardown

            var body = JSON.stringify({ 
                label: "grocery"
            })

            console.log("Token is ")
            console.log(token)
            return api.post('/timings')
                .type('application/json')
                .accept('application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(body)
                .expect(200)
        })
    })
})




        
        
