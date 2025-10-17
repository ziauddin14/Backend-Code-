import express from 'express'
import { createClient } from 'redis';

const client = createClient({
    username: 'default',
    password: '5IPpNY1WhMaA3nrdb2FELOZVrRU6p9aQ',
    socket: {
        host: 'redis-16094.crce220.us-east-1-4.ec2.redns.redis-cloud.com',
        port: 16094
    }
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

const app = express()  
const PORT = 5000

const products = [
    {name: "Ali", age: 22, role: "sir"},
    {name: "Ali", age: 22, role: "sir"},
    {name: "Ali", age: 22, role: "sir"},
    {name: "Ali", age: 22, role: "sir"},
    {name: "Ali", age: 22, role: "sir"},
    {name: "Ali", age: 22, role: "sir"},
    {name: "Ali", age: 22, role: "sir"},
    {name: "Ali", age: 22, role: "sir"},
    {name: "Ali", age: 22, role: "sir"},
    {name: "Ali", age: 22, role: "sir"},
    {name: "Ali", age: 22, role: "sir"},
    {name: "Ali", age: 22, role: "sir"},
    {name: "Ali", age: 22, role: "sir"},
    {name: "Ali", age: 22, role: "sir"},
    {name: "Ali", age: 22, role: "sir"},
]
app.get("/products", async (req, res) => {
  try {
      const cacheProduct = await client.get("products")
      if (cacheProduct) {  
          return res.send({
              message : "Products from redis",
              data: JSON.parse(cacheProduct)
          })
      }

      await client.setEx('products', 60, JSON.stringify(products))
      res.send({
          message: "Products from local array",
          data: products
      })
  } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Server Error" })
  }
})

app.listen(PORT , () => {
    console.log("Server is Running");
    
})