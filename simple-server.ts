import { ApolloServer, gql } from "apollo-server";

let db: string[] = [];

const typeDefs = gql`
  type Query {
    users: [String!]
  }
  type Mutation {
    createUser(name: String!): [String!]
  }
`;

const resolvers = {
  Query: {
    users() {
      return db;
    },
  },
  Mutation: {
    createUser(_: any, { name }: { name: string }): Promise<string[]> {
      db.push(name);
      return Promise.resolve(db);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: 5000 }).then(({ url }) => {
  console.log("App rodando", url);
});
