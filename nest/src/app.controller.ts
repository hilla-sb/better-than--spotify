import { Controller, Get, Post, Req, Res} from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express'
import * as SpotifyWebApi from 'spotify-web-api-node'
import * as lyricsFinder from 'lyrics-finder';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("login")
  postLogin(@Req() request: Request, @Res() response: Response): void {
   
    const code = request.body.code;
    const spotifyApi = new SpotifyWebApi({
      redirectUri: process.env.REDIRECT_URI,
      clientId: process.env.CLIENT_ID,
      clientSecret:process.env.CLIENT_SECRET,
        
  })
  console.log ( {
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET })
    
  spotifyApi.authorizationCodeGrant(code)
      .then(data => {
          response.json({
              accessToken: data.body.access_token,
              refreshToken: data.body.refresh_token,
              expiresIn: data.body.expires_in,
          })
      })
      .catch((err):any => {
        console.log(err);
          response.sendStatus(400)
      })
  }

    @Post("refresh")
      PostRefresh  (@Req() request: Request, @Res()response: Response): void  {
        const refreshToken = request.body.refreshToken;
        const spotifyApi = new SpotifyWebApi({
            
            redirectUri:process.env.REDIRECT_URI,
            clientId:process.env.CLIENT_ID,
            clientSecret:process.env.CLIENT_SECRET,
              
            refreshToken,
    
        })
        spotifyApi.refreshAccessToken()
        .then(data => {
            response.json({
                accessToken: data.body.accessToken,
                expiresIn: data.body.expiresIn,
            })
        })
        .catch(err => {
            response.sendStatus(400)
        })

      
          }
          @Get("lyrics")
          async GetLyrics  (  @Req()request: Request, @Res()response: Response): Promise<void>  {
            const lyrics= await lyricsFinder(request.query.artist, request.query.track) || "No Lyrics Found"
       response.json({ lyrics })
       }


   
  }

        
        
