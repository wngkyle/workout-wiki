const { ApolloServer } = require('apollo-server')
const fs = require('fs')
const path = require('path')
const { PrismaClient } = require('@prisma/client')
const { getUserId } = require('./util')

const Mutation = require('./resolvers/Mutation')
const Query = require('./resolvers/Query')
const Movement = require('./resolvers/Movement')
const Equipment = require('./resolvers/Equipment')
const Exercise = require('./resolvers/Exercise')
const MovementPattern = require('./resolvers/MovementPattern')
const TargetMuscle = require('./resolvers/TargetMuscle')
const User = require('./resolvers/User')
const RequestedMovement = require('./resolvers/RequestedMovement')
const Bookmark = require('./resolvers/Bookmark')

const prisma = new PrismaClient()

const resolvers = {
    Query,
    Mutation,
    Movement,
    Equipment,
    Exercise,
    MovementPattern,
    TargetMuscle,
    User,
    RequestedMovement,
    Bookmark,
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
      path.join(__dirname, 'schema.graphql'),
      'utf8'
    ),
    resolvers,
    context: ({req}) => {
      console.log(req)
      return {
        ...req,
        prisma,
        userId: 
          req && req.headers.authorization ? getUserId(req) : null
      }
    },
});

server
    .listen()
    .then(({ url }) => {
        console.log(`  🚀 Server is now running on ${ url }  ` ) 
    })