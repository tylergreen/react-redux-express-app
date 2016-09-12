var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    config = require('config'),
    port = config.get('port'),
    testingUrl = 'http://localhost:' + port,
    api = supertest(testingUrl), 
    server = require('../../src/server/app.js') // figure out how to get to root path easier to avoid coupling both project AND test directory structure

  

describe('Get /', () => {
    var app
    
    before(() => {
        console.log("PORT")
        console.log(config.get('port'))
        app = server.listen(config.get('port'))
    })
           

    before(() => {
        app.close
    })
    
    it('should render the homepage', (done) => {
        api.get('/')
            .expect(200, done)
    })
}
        )

// move to separate test helpers file or pre-load the fixture
function createAccount(email, password){
    var user = JSON.stringify({ email: email,
                                password: password})
}

describe('Signup -- Account Creation', () => {
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
    })})

describe('Post ', () =>{
    //need to have an exising user
    var user = JSON.stringify({ email: "dude@gmail.com",
                                password: "abcde"})

    var token;

    before(() => {
        api.post('/signup')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(user)
            .end((err, resp) => {
                token = resp.text.token
            })
    })

    // can clear DB after

    it('logs into an account', (done) => {
        // user should already exist bc there is currently no setup or teardown
        api.post('/login')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(user)
            .expect(200)
            .expect((res) => {
                login_response = res.body.user // not sure this is right either
                return ((login_response.hasOwnProperty('user') &&
                         login_response.hasOwnProperty('token')))
            })
        done()
    })
})

// describe('timings ', () =>{
//     //need to have an exising user
//     var user = JSON.stringify({ email: "dude@gmail.com",
//                                 password: "abcde"})

//     it('gets a list of timings', (done) => {
//         // user should already exist bc there is currently no setup or teardown
//         api.post('/login')
//             .set('Accept', 'application/json')
//             .set('Content-Type', 'application/json')
//             .set('Authorization', `Bearer ${token}`)
//             .send(user)
//             .end((err, resp) => {
//                 var token = resp.text.token
//                 api.post('')
//                 api.post('/timings')
//                     .set('Accept', 'application/json')
//                     .set('Content-Type', 'application/json')
//                     .set('Authorization', `Bearer ${token}`)
//                     .send(user)
//                     .expect(200)
//                     .expect((res) => {
//                         console.log("timings response is ")
//                         console.log(res)
//                         login_response = res.body.user // not sure this is right either
//                         return ((login_response.hasOwnProperty('user') &&
//                                  login_response.hasOwnProperty('token')))
//                     })
//                     .end(done)
//             }
//                 )
// })

