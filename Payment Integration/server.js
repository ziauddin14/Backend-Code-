import express from 'express'
import Stripe from 'stripe'
const app = express()
const port = 4000
const stripe = new Stripe('YOUR_STRIPE_SECRET_KEY')

//Create Stripe account becuase secret key is Rafid
//Frontend UI Repo Push on Sir Ali Huzaifa Github This Code is complete Backend STripe Payment Integration

app.get('/plans', async (_,res)=>{
    const allPlans = await stripe.products.list({
        expand: ['data.default_price']
    })
    const mappedPlans = allPlans?.data?.map(({id, name, description, default_price})=>{
        return{
            priceId: id,
            name,
            description,
            default_price
        }
    })
    res.send({
        message:"Product Response",
        data: allPlans
    })
})

app.post('/create-checkout-session', async( req,res)=>{
    const {priceId} = req?.body
    const session = await stripe.checkout.sessions.create({
        mode:'subscription',
        line_items:[
            {priceId: priceId, quantity: 1}
        ],
        success_url: 'http://localhost:5173/success',
        cancel_url: 'http://localhost:5173/cancel'
    })
    res.send({url: session.url})
})

app.listen(port,()=>{
    console.log(`Server is running on ${port}` );
    
})