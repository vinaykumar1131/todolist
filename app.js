const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const { urlencoded } = require("body-parser");
const app=express();
app.set('view engine', 'ejs')
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});
const itemsSchema = {
    name: String
  };
  
  const Item = mongoose.model("Item", itemsSchema);
app.get("/",function(req,res){
    Item.find({}, function(err, foundItems){
        res.render("index",{arr:foundItems});
    })
});
app.post("/",function(req,res){
    const ut=req.body.newlis;
    const item=new Item({
        name:ut
    })
    item.save();
    res.redirect("/");

})
app.post("/delete",function(req,res){
    const val=req.body.checkbox;
    Item.findByIdAndRemove(val,function(err){
        if(!err){
            res.redirect("/");
        }
    })
})
app.listen(12,()=>{
    console.log("your server is ready for serving")
})