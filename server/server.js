const express = require ('express');
const cors = require ("cors")
const bodyParser = require ("body-parser")
const SpotifyWebApi = require ('spotify-web-api-node');
const app = express();

app.use(cors())
app.use(bodyParser.json())
app.post('/refresh', (req.res) => {
const refreshToken = req.body.refreshToken
})
app.post('/login', (req, res) => {
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId:'633e7c3e6f384c4484fd123b31000c39' ,
        clientSecret:'e2b7d50392c74b528f90e367075aa466' ,
        refreshToken
         })
         spotifyApi
         .refreshAccessToken()
         .then(data => {
         console.log(data.body)
                })
         .catch(error) => {
         res.status(400)
    })
})
app.post('/login', (req, res) => {
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId:'633e7c3e6f384c4484fd123b31000c39' ,
        clientSecret:'e2b7d50392c74b528f90e367075aa466' ,
    })
    spotifyApi 
    .authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken : data.body.refresh_token,
            expiresIn: data.body.expires_in

        })
    })
    .catch(err => {
     
        res.sendStatus(400)
    })
})

app.listen(3001)
