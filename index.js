const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()
const stripe = require("stripe")(process.env.STRIPE_KEY)

const app = express()
app.use(cors({origin:true}))

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("success")
})

app.post("/payment/create", async(req,res)=>{
    const total = parseInt(req.query.total)
    if(total > 0){
        const paymentIntent = await stripe.paymentIntents.create({
            amount:total,
            currency:"usd"
        })
console.log(paymentIntent);
        res.status(201).json({clientSecret:paymentIntent.client_secret})
    }else{
        res.status(403).json({message:"min madgreg yichalal"})
    }


})
app.listen(4444,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("http://localhost:4444");
    }
})