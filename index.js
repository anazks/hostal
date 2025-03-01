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
const Hostalinfo = require(`./model/HostalInfo`)
const BookingModal = require(`./model/BookingModal`)
// const hostelInfoModel = require('./Router/Hostal')

const fav = require('./model/Fav')
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
// app.use('/hostal',hostel)
app.use(express.json())
app.use(express.urlencoded({extended:true}));



app.post('/addBooking',async(req,res)=>{
    try{
        console.log(req.body)
       let booked = await BookingModal.create(req.body) ;
       console.log(booked,"booked")
       res.json("Booking details added");
    }
    catch(error){
        console.log(error);
    }
})

app.get("/get-my-bookings/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const bookings = await BookingModal.find({ userId:userId });
  
      if (!bookings.length) {
        return res.status(404).json({ message: "No bookings found." });
      }
  
      res.json({ bookings });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
app.get('/',(req,res)=>{
    console.log('Hello world');
    res.send('helloworld');
})

app.get('/getallhostel',async(req,res)=>{
    try{
    console.log('helloworld getting all hostals');
    let hostel=await Hostelmodel.find()
    console.log(hostel,"getting all hostals")
    res.json(hostel)
   
    }
    catch(error){
        console.log(error);
    }
})
app.post('/addalhostel',async(req,res)=>{
    try{
    console.log('helloworld')
    console.log(req.body)
    let hostal = await Hostelmodel.create(req.body);
    res.json(hostal)
    }
    catch(error){
        console.log(error);
    }
})
app.post('/addalInfo',async(req,res)=>{
    try{
    console.log('helloworld')
    console.log(req.body)
    let hostalInfos = await Hostalinfo.create(req.body);
    res.json(hostalInfos)
    }
    catch(error){
        console.log(error);
    }
})

app.get('/getHostalinfo/:id',async(req,res)=>{  
    try{
    console.log('helloworld');
    let hostalinfoData=await Hostalinfo.find({hostalId:req.params.id})
    console.log(hostalinfoData)
    res.json({hostalinfoData})
    }
    catch(error){
        console.log(error);
    res.json({data:false})

    }
})
app.post('/Hostalogin', async (req, res) => {
    try {
        console.log("----------------")
        console.log(req.body);

        const { username, password } = req.body;

        // Find user in DB
        let user = await Hostelmodel.findOne({ email: username });
        console.log(user,"--user")
        if (!user) {
            console.log("User not found");
            return res.json({ nouser: true });
        }

        // Check if password matches
        if (user.password !== password) {
            console.log("Incorrect password");
            return res.json({ incorrectPassword: true });
        }

        console.log("Login successful");
        res.json({ user });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});


app.get("/get-SIngle-hostal/:id", async(req,res)=>{
    try {
        let {id} = req.params;
        let hostal = await Hostelmodel.find({_id:id})
        console.log(hostal)
        hostal = hostal[0]
        res.json(hostal)
    } catch (error) {
        console.log(error)
    }
})
app.post("/update-hostal-image", async (req, res) => {
    try {
        console.log("Received Body:", req.body);

        const { hostal_id, image } = req.body;

        // Validate request body
        if (!hostal_id || !image) {
            return res.status(400).json({ status: false, error: "hostal_id and image are required" });
        }

        // Update image in the database
        const updateImage = await Hostelmodel.updateOne(
            { _id: hostal_id },
            { $set: { img: image } }
        );

        // Check if the update was successful
        if (updateImage.modifiedCount === 0) {
            return res.status(404).json({ status: false, error: "Hostel not found or image not updated" });
        }

        console.log("Image Updated Successfully:", updateImage);
        res.json({ status: true, message: "Image updated successfully" });
    } catch (error) {
        console.error("Error updating image:", error);
        res.status(500).json({ status: false, error: "Internal server error" });
    }
});

app.get("/get-SIngle-mess/:id", async(req,res)=>{
    try {
        let {id} = req.params;
        let hostal = await messmodel.find({_id:id})
        console.log(hostal)
        hostal = hostal[0]
        res.json(hostal)
    } catch (error) {
        console.log(error)
    }
})
app.get("/get-SIngle-food/:id", async(req,res)=>{
    try {
        let {id} = req.params;
        let hostal = await addfoodmodel.find({messId:id})
        console.log(hostal)
        hostal = hostal[0]
        res.json(hostal)
    } catch (error) {
        console.log(error)
    }
})
app.post('/addToFavorite', async(req,res)=>{
    try {
        console.log(req.body,"fav---------------")
        let userID = req.body.userData._id;
        req.body.userID = userID;
        let favorite = await fav.create(req.body)
           console.log(favorite)
        res.json({status:true})
    } catch (error) {
        console.log(error)
    }
})
app.get('/getFavorite/:id', async(req,res)=>{
    try {
        let {id} = req.params;
        let favorite = await fav.find({userID:id})
        console.log(favorite)
        res.json(favorite)
    } catch (error) {
        console.log(error)
    }

})
app.post('/clearFavorite', async(req,res)=>{
    try {
        console.log(req.body,"clear favorite")
        let id = req.body.userId;
        let favoriteDeleted = await fav.deleteMany({userID:id})
        console.log(favoriteDeleted)  
     }
    catch (error) {
        console.log(error)
    }})
app.post('/registerfoodservices',async(req,res)=>{
    try{
    console.log('food services')
    console.log(req.body)
    await messmodel.create(req.body);
    res.json({added:true})

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

    }
    catch(error){
        console.log(error);
    }
})

app.get('/getMyfoods/:id',async(req,res)=>{
    try{
    console.log('messid details');
    console.log(req.params.id)
    let foods=await addfoodmodel.find({messid:req.params.id})
    console.log(foods)
    res.json(foods)

    }
    catch(error){
        console.log(error);
    }
})
app.get("/getBookings/:ownerId", async (req, res) => {
    try {
      const { ownerId } = req.params;
  
      // Find all bookings where hostel owner matches the given ID
      const bookings = await BookingModal.find({ hostelId: ownerId });
  
      if (bookings.length === 0) {
        return res.status(404).json({ message: "No bookings found" });
      }
  
      res.json({ bookings });
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

app.post('/Userreg',async(req,res)=>{
    try{
        console.log(req.body)
       await Usermodel.create(req.body) ;
       res.json("userdetails added");
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



app.post('/UserLogin', async (req, res) => {
    try {
        console.log(req.body);

        const { emailid, password } = req.body;

        // Find user in DB
        let user = await Usermodel.findOne({ email: emailid });

        if (!user) {
            console.log("User not found");
            return res.json({ nouser: true });
        }

        // Check if password matches
        if (user.password !== password) {
            console.log("Incorrect password");
            return res.json({ incorrectPassword: true });
        }

        console.log("Login successful");
        res.json({ user });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});


//------------------------------------------------------------------------------------

app.post('/MessLogin', async (req, res) => {
    try {
        console.log(req.body);

        const { emailid, password } = req.body;

        // Find user in DB
        let user = await messmodel.findOne({ emailid: emailid });

        if (!user) {
            console.log("User not found");
            return res.json({ nouser: true });
        }

        // Check if password matches
        if (user.password !== password) {
            console.log("Incorrect password");
            return res.json({ incorrectPassword: true });
        }

        console.log("Login successful");
        res.json({ user });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});


app.post('/addfood',async(req,res)=>{
    try{
    console.log('food services')
    console.log(req.body)
    await addfoodmodel.create(req.body);
    res.json({added:true})
    }
    catch(error)
    {
        console.log(error);
    res.json({added:false})

    }
})
app.get('/viewmess',(req,res)=>{
    console.log('view mess')
    console.log(req.body)
    res.send('mess view ')
})
app.get('/get-foodMen-single/:id',async(req,res)=>{
    try {
        let id = req.params.id;
        let menu = await addfoodmodel.find({messid:id})
        console.log(menu,"menu...")
        res.json({menu})
    } catch (error) {
            console.log(error)
    }
})
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})

