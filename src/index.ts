import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import mongoose, { Schema } from 'mongoose';
import dotenv from 'dotenv';
import resolvers from './graphql/resolvers';
dotenv.config();

const MONGODB = `mongodb+srv://danade:${process.env.MONGO_DB_PASSWORD}@cluster0.ejgeo.mongodb.net/temporary?retryWrites=true&w=majority`;

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs: readFileSync('./src/schema.graphql',
    'utf8'
),
  resolvers,
});

mongoose
  .connect(MONGODB)
  .then(() => {
    console.log('MongoDB connection successful');
    return startStandaloneServer(server, { listen: { port: 5000 } });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
