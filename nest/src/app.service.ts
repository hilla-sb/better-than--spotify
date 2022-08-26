 import { Injectable } from '@nestjs/common';
 //import * as SpotifyWebApi from 'spotify-web-api-node';

 @Injectable()
 export class AppService {
   getHello(): string {
     return 'Hello World!';
  }

//   authorizeWithSpotify(code: string) {
//     const spotifyApi = new SpotifyWebApi({
//       redirectUri: process.env.REDIRECT_URI,
//       clientId: process.env.CLIENT_ID,
//       clientSecret:process.env.CLIENT_SECRET,    
//     })

//     return spotifyApi.authorizationCodeGrant(code)
//   }
 }
//this.appService.authorizeWithSpotify(code)
