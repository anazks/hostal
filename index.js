const express=require('express');
const app=express();
const port=3000;
const db=require('./config/db');
const cors = require('cors')
const Hostelmodel=require(`./model/Hostelmodel`);
const messmodel=require(`./model/messmodel`);
const addfoodmodel=require(`./model/addfoodmodel`);
const Usermodel=require(`./model/Userregmodel`);
const Ownermodel=require(`./model/Ownerregmodel`);
const Servicemodel=require(`./model/Serviceregmodel`);
const hostel = require('./Router/Hostal')
async function connectD(){
    try{
        await db()
        console.log("db connected succesfully")

    }catch(error){
        console.log(error)
    }
    
}
connectD();
app.use(cors())
app.use('/hostal',hostel)
app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    console.log('Hello world');
    res.send('helloworld');
})

app.get('/getallhostel',async(req,res)=>{
    try{
    console.log('helloworld');
    let hostel=await Hostelmodel.find()
    res.json(hostel)
    res.send('hostel details');
    }
    catch(error){
        console.log(error);
    }
})
app.post('/addalhostel',async(req,res)=>{
    try{
    console.log('helloworld')
    await Hostelmodel.create(req.body);
    res.send('hostel added')
    }
    catch(error){
        console.log(error);

    }
})

app.post('/registerfoodservices',async(req,res)=>{
    try{
    console.log('food services')
    console.log(req.body)
    await messmodel.create(req.body);
    res.send('food services registered')
    }
    catch(error){
        console.log(error);

    }
})
app.get('/getallmess',async(req,res)=>{
    try{
    console.log('mess details');
    let mess=await messmodel.find()
    res.json(mess)
    res.send('mess details');
    }
    catch(error){
        console.log(error);
    }
})


app.post('/Userreg',async(req,res)=>{
    try{
        console.log(req.body)
       await Usermodel.create(req.body) ;
       res.send("userdetails added");
    }
    catch(error){
        console.log(error);
    }
})



app.post('/Servicereg',async(req,res)=>{
    try{
        console.log(req.body)
       await Servicemodel.create(req.body) ;
       res.send("service details added");
    }
    catch(error){
        console.log(error);
    }
})



app.post('/UserLogin',async(req,res)=>{
         try {
            console.log(req.body)
           let user=await Usermodel.find({emailid:req.body.emailid,password:req.body.password}) ; 
    
                if(user.length>0)
                    {
                        console.log("login successful");
                        res.json({user})
                    }
                else{
                    console.log("user not found");
                    res.json({nouser:true})

                }
         } catch (error) {
            console.log(error);
         }
           
})
app.post('/addfood',async(req,res)=>{
    try{
    console.log('food services')
    console.log(req.body)
    await addfoodmodel.create(req.body);
    res.send('food services added')
    }
    catch(error)
    {
        console.log(error);
    }
})
app.get('/viewmess',(req,res)=>{
    console.log('view mess')
    console.log(req.body)
    res.send('mess view ')
})
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})

