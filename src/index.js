const { ApolloServer } = require('apollo-server')
const fs = require('fs')
const path = require('path')
const { PrismaClient } = require('@prisma/client')
const { getUserId } = require('./util')

const Mutation = require('./resolvers/Mutation')
const Query = require('./resolvers/Query')
const Movement = require('./resolvers/Movement')

const prisma = new PrismaClient()

const resolvers = {
    Query,
    Mutation,
    Movement,
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
      path.join(__dirname, 'schema.graphql'),
      'utf8'
    ),
    resolvers,
    context: ({req}) => {
      return {
        ...req,
        prisma,
      }
    },
    introspection: true,
});

server
    .listen()
    .then(({ url }) => {
        console.log(`  🚀 Server is now running on ${ url }  ` ) 
    })