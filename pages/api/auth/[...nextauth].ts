import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { PrismaClient } from '../../../db'
import Adapter from '../../../adapter'
const prisma = new PrismaClient()


const OAUTH_SCOPE: string = [
  'https://www.googleapis.com/auth/userinfo.email',  // email address
  'https://www.googleapis.com/auth/userinfo.profile',  // G+ profile
  // 'https://mail.google.com/',  // email
  // 'https://www.google.com/m8/feeds',  // contacts
  // 'https://www.googleapis.com/auth/calendar'  // calendar
].join(' ')

const options = {
  debug: true,
  // Configure one or more authentication providers
  providers: [
    Providers.Email({
      server: process.env.EMAIL_SERVER, 
      from: process.env.EMAIL_FROM
    }),
    Providers.Google({
      // @ts-ignore
      scope: OAUTH_SCOPE,
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,

      authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
      
    })
  ],

  // A database is optional, but required to persist accounts in a database
  adapter: Adapter({ prisma }),

}

export default (req, res) => NextAuth(req, res, options)