
import axios from "axios";

const API_URL = "http://localhost:5000/graphql"; 

export const graphqlRequest = async (query, mutation = {}) => {
  try {
    const res = await axios.post(API_URL, { query, mutation });
    return res.data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};


export const getUsers = () =>
  graphqlRequest(`
    query {
      users {
        id
        name
        email
        age
      }
    }
  `);


export const addUser = (name, email, age) =>
  graphqlRequest(
    `
    mutation (name: String, email: String, age: Int) {
      addUsers(name: name, email: email, age: age) {
        id
        name
        email
        age
      }
    }
  `,
    { name, email, age }
  );

export const updateUser = (id, name, email, age) =>
  graphqlRequest(
    `
    mutation (id: Int!, name: String!, email: String!, age: Int!) {
      updateUser(id: id, name: name, email: email, age: age) {
        id
        name
        email
        age
      }
    }
  `,
    { id, name, email, age }
  );

export const deleteUser = (id) =>
  graphqlRequest(
    `
    mutation (id: Int!) {
      deleteUser(id: id) {
        id
        name
        email
        age
      }
    }
  `,
    { id }
  );
