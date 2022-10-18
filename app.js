import express from  'express'

const app = express()
const PORT = 7777

app.use(express.json())

app.get('/',(req,res)=>{
    res.json({
        get:'success'
    })
})

app.post('/api/login',(req,res)=>{
    console.log(req.body)
    res.json({message:'ok'})
})

app.listen(PORT,(err)=>{
    if(err) return console.log(err)
    console.log(`SERVER HAS BEEN STARTED AT PORT ${PORT}`)
})