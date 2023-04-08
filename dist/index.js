import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import mongoose, { Schema } from 'mongoose';
const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });
const MONGODB = `mongodb+srv://danade:${process.env.MONGO_DB_PASSWORD}@cluster0.ejgeo.mongodb.net/?retryWrites=true&w=majority`;
const recipeSchema = new Schema({
    name: String,
    description: String,
    createdAt: String,
    thumbsUp: Number,
    thumbsDown: Number,
});
const Recipe = mongoose.model('Recipe', recipeSchema);
export default Recipe;
const resolvers = {
    Query: {
        async recipe(_, { ID }) {
            return await Recipe.findById(ID);
        },
        async getRecipes(_, { amount }) {
            return await Recipe.find().sort({ createdAt: -1 }).limit(amount);
        },
    },
    Mutations: {
        async createRecipe(_, { recipeInput: { name, description } }) {
            const createdRecipe = new Recipe({
                name: name,
                description: description,
                createdAt: new Date().toISOString(),
                thumbsUp: 0,
                thumbsDown: 0,
            });
            const res = await createdRecipe.save();
            console.log(res);
            return {
                id: res.id,
                // ...res._doc,
            };
        },
    },
};
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
mongoose
    .connect(MONGODB)
    .then(() => {
    console.log('MongoDB connection successful');
    // return server.listen({ port: 5000 });
})
    .then((res) => {
    console.log(`Server running at ${res}`);
});
// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
