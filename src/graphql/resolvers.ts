// resolver is the functionality by any code in the typeDefs
import Recipe from '../models/file';

const resolvers = {
  Query: {
    async recipe(_: any, { ID }: any) {
      return await Recipe.findById(ID);
    },
    async getRecipes(_, { amount }) {
      return await Recipe.find().sort({ createdAt: -1 }).limit(amount);
    },
  },
  Mutation: {
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

export default resolvers;