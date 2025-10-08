// const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = require("graphql");
import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
} from "graphql";
let users = [
  { id: 1, name: "John Doe", email: "john@example.com", age: 30 },
  { id: 2, name: "Jane Smith", email: "jane@example.com", age: 25 },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", age: 35 },
];

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

const UserQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return users;
      },
    },
  }),
});

const schema = new GraphQLSchema({ query: UserQuery });
export default schema;
// import {
//   GraphQLObjectType,
//   GraphQLInt,
//   GraphQLString,
//   GraphQLList,
//   GraphQLSchema,
//   GraphQLNonNull,
// } from "graphql";

// let users = [
//   { id: 1, name: "John Doe", email: "john@example.com", age: 30 },
//   { id: 2, name: "Jane Smith", email: "jane@example.com", age: 25 },
//   { id: 3, name: "Bob Johnson", email: "bob@example.com", age: 35 },
// ];

// const UserType = new GraphQLObjectType({
//   name: "User",
//   fields: () => ({
//     id: { type: GraphQLInt },
//     name: { type: GraphQLString },
//     email: { type: GraphQLString },
//     age: { type: GraphQLInt },
//   }),
// });

// const UserQuery = new GraphQLObjectType({
//   name: "RootQuery",
//   fields: () => ({
//     users: {
//       type: new GraphQLList(UserType),
//       resolve() {
//         return users;
//       },
//     },
//     // single user by id
//     user: {
//       type: UserType,
//       args: {
//         id: { type: new GraphQLNonNull(GraphQLInt) }, // required int
//       },
//       resolve(parent, args) {
//         // find user by id
//         const found = users.find((u) => u.id === args.id);
//         // optionally throw error if not found:
//         if (!found) {
//           throw new Error(`User with id ${args.id} not found`);
//         }
//         return found;
//       },
//     },
//   }),
// });

// const schema = new GraphQLSchema({
//   query: UserQuery,
// });

// export default schema;
