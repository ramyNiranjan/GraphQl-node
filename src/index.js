const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema.graphql");

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
];

// 1
let idCount = links.length;
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (_, args) => links.find((item) => item.id === args.id),
  },
  Mutation: {
    // 2
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },
    updateLink: (_, args) => {
      const toUpdate = links.find((item) => item.id === args.id);
      toUpdate.description = args.description;
      toUpdate.url = args.url;
      return toUpdate;
    },
  },
};

// 3
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
