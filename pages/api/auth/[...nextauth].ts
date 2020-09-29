import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { PrismaClient } from '@prisma/client'
import Adapters from 'next-auth/adapters'
const prisma = new PrismaClient()

const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.Email({
      server: process.env.EMAIL_SERVER, 
      from: process.env.EMAIL_FROM
    }),
    // ...add more providers here
  ],

  // A database is optional, but required to persist accounts in a database
  adapter: Adapters.Prisma.Adapter({ prisma }),

}

export default (req, res) => NextAuth(req, res, options)