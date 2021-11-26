const express = require("express");
const mongoose = require("mongoose");




const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/movies");
}

const userSchema = new mongoose.Schema({
    id : {type: Number, required: true},
    movie_name : {type: String, required: true},
    movie_genre : {type: String, required: true},
    production_year : {type: String, required: false},
    budget : {type: Number, required: false},
    
},
{
    versionKey:false,
    timestamps:true,

}

);

// 
const Movie = mongoose.model("movie", userSchema); 

const app = express();

app.use(express.json());


//POST

app.post("/movie", async (req, res) => {
    try {
        const movie = await Movie.create(req.body);
        res.status(201).send(movie);
    } catch(e) {
        res.status(500).json({status : e});
    }

});


app.get("/movies", async (req, res) => {
    // const users = await User.find().lean().exec();
    const movies = await Movie.find({}).lean().exec();
    res.send({movies});
});

app.get("/movies/:id", async(req,res) =>{
    const movie = await Movie.findById(req.params.id,req.body).lean().exec();;

    res.send({movie});

})

app.patch("/movies/:id", async(req,res) =>{
    try{
        const movie = await Movie.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.send({movie});
    }
    catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});

    }
   

});
app.delete("/movies/:id", async(req,res) =>{
    try{
        const movie = await Movie.findByIdAndDelete(req.params.id).lean().exec()
        res.status(200).send(movie);
    }
    catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});

    }
   

});

//--------------------TAGS CRUD------------------------------//

//POST

app.listen(2350,async function(){
    await connect();
    console.log("listening to port no 2350")
})