const express = require('express')
const cors = require('cors')
const SpotifyWebApi = require('spotify-web-api-node')
const bodyParser = require ('body-parser');
const lyricsFinder = require ('lyrics-finder')
require ('dotenv').config();




const app = express();
app.use(cors());
app.use (express.json());
app.post('/refresh', (req, res) =>{
    const refreshToken = req.body.refreshToken;
    const spotifyApi = new SpotifyWebApi({
        
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.CLIENT_ID,
        clientSecret:process.env.CLIENT_SECRET,
               
                refreshToken,

    })
    spotifyApi.refreshAccessToken()
    .then(data => {
        res.json({
            accessToken: data.body.accessToken,
            expiresIn: data.body.expiresIn,
        })
    })
    .catch(err => {
        res.sendStatus(400)
    })
})
app.post('/login', (req, res) => {
    const code = req.body.code;
    const spotifyApi = new SpotifyWebApi({
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.CLIENT_ID,
        clientSecret:process.env.CLIENT_SECRET,
          
    })
    spotifyApi.authorizationCodeGrant(code)
        .then(data => {
            res.json({
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
                expiresIn: data.body.expires_in,
            })
        })
        .catch(err => {
            res.sendStatus(400)
    })
})

app.get('/lyrics', async (req, res) => {
        const lyrics= await lyricsFinder(req.query.artist, req.query.track) || "No Lyrics Found"
         res.json({ lyrics })
       })

app.listen(3001)






// const express = require ("express")
// const SpotifyWebApi = require ("spotify-web-api-node")  
// const cors = require ("cors")
// const bodyParser = require ("body-parser");
// const lyricsFinder = require ("lyrics-finder")
// require ("dotenv").config();
// //import express from "express";
// //import SpotifyWebApi from "spotify-web-api-node";

// const app = express()

// app.use (cors())
// app.use (bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }))

// app.post( '/refresh', (req, res) => {
//     const refreshToken = req.body.refreshToken
    
//     const spotifyApi = new SpotifyWebApi({
//         redirectUri: process.env.REDIRECT_URI,
//         clientId:process.env.CLIENT_ID,
//         clientSecret: process.env.CLIENT_SECRET,
//         refreshToken,
//         })

//         spotifyApi.refreshAccessToken()

//         .then(data => {
//             console.log(data.body)
//                 res.json ({
//                     accessToken: data.body.accessToken,
//                     expiresIn: data.body.expiresIn,
//                 })          
             
//             })
//             .catch(err => {
//                 console.log(err)
//                 response.sendStatus(400)
//             })
// })


// app.post('/login', (req, res) => {
   

//     const code = req.body.code
//     const spotifyApi = new SpotifyWebApi({
//         redirectUri: "http://localhost:3000",
//         clientId://"1cdba6ab0cb3446aadf38d76f8a152fb",
//         '633e7c3e6f384c4484fd123b31000c39',

//         clientSecret: //"14bbc997c3dc42a49362df0786915d7c",
//         'e2b7d50392c74b528f90e367075aa466',
        

//       })
      
//       spotifyApi.authorizationCodeGrant(code)
//       .then (data => {
//         console.log(data)
//         res.json ({
//             accessToken: data.body.access_token,
//             refreshToken: data.body.refresh_token,
//             expiresIn: data.body.expires_in
//             })
//          })
//         .catch (err => {
//             console.log(err)
            
//             res.sendStatus(400)
//         })

//     })

//  app.get('/lyrics', async (req, res) => {
//     const lyrics= await lyricsFinder(req.query.artist, req.query.track) || "No Lyrics Found"
//     res.json({ lyrics })
//   })
//     app.listen(3001)


//     ////CLIENT_ID="1cdba6ab0cb3446aadf38d76f8a152fb"
// //CLIENT_SECRET="14bbc997c3dc42a49362df0786915d7c"