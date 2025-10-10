// // const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = require("graphql");
// import {
//   GraphQLObjectType,
//   GraphQLInt,
//   GraphQLString,
//   GraphQLList,
//   GraphQLSchema,
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
//   }),
// });

import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
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
    // single user by id
    user: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        // find user by id
        const found = users.find((u) => u.id === args.id);
        if (!found) {
          throw new Error(`User with id ${args.id} not found`);
        }
        return found;
      },
    },
  }),
});

const UserMutation = new GraphQLObjectType({
  name: "UserMutation",
  fields: {
    addUsers: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(_, args) {
        const obj = {
          name: args?.name,
          age: args?.age,
          email: args?.email,
          id: users?.length + 1,
        };
        users.push(obj);
        return obj;
      },
    },
    updateUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(_, args) {
        const findUser = users.find(({ id }) => id === args?.id);
        const indexNo = users.findIndex((user) => user.id === args?.id); 
        if (!findUser) {
          throw new Error(`User with id ${args.id} not found`); 
        }
        const updatedUser = {
          name: args.name,
          age: args.age,
          email: args.email,
          id: args.id,
        };
        users.splice(indexNo, 1, updatedUser);
        return updatedUser;
      },
    },
    deleteUser: {
      type: new GraphQLList(UserType),
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(_, args) {
        const indexNo = users?.findIndex(({ id }) => id === args?.id);
        if (indexNo < 0) {
          throw new Error(`User with id ${args.id} not found`); // Throwing an error is standard practice
        }
        users.splice(indexNo, 1);
        return users;
      },
    },
  },
}); 




const schema = new GraphQLSchema({
  query: UserQuery,
  mutation: UserMutation,
});

export default schema;