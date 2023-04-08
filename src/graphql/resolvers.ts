// resolver is the functionality by any code in the typeDefs
const Recipe = require("../models/file");

module.exports = {
  Query: {
    async recipe(_: any, { ID }: any) {
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
      console.log(res._doc);
      return {
        id: res.id,
        ...res._doc,
      };
    },
  },
};
