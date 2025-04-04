import express from 'express';
import * as mongodb from 'mongodb';
import db from '../db/connection';
import { ObjectId,Collection} from 'mongodb';

let router:express.Router = express.Router();
type User={
    _id:ObjectId
    name:string
    position:string
    level:string
};
router.get("/records/",async(req,res)=>{
    let collection:mongodb.Collection= await db.collection("records");
    let results=await collection.find({}).toArray();
    res.send(results).status(200);
});
router.get("/records/:id",async(req,res)=>{
    let collection:mongodb.Collection= await db.collection("records");
    let query={_id:new ObjectId(req.params.id)};
    let result=await collection.findOne(query);
    if(!result){
        res.send("Not found").status(404);
    }else{
        res.send(result).status(200);
    }
});
router.get("/records/byname/:name",async(req,res)=>{
    let collection:mongodb.Collection= await db.collection("records");
    let query={name:{ $regex: new RegExp(`^${req.params.name}$`, "i")}};
    let result=await collection.findOne(query);
    if(!result){
        console.log(req.params.name);
        res.send("Not found").status(404);
    }else{
        res.send(result).status(200);
    }
});
router.post("/records/",async(req,res)=>{
    let user:User={
        _id:new ObjectId(),
        name:req.body.name,
        position:req.body.position,
        level:req.body.level
    }
    let collection:mongodb.Collection= await db.collection("records");
    let result=await collection.insertOne(user);
    res.send(result).status(200);
});
router.delete("/records/:id",async(req,res)=>{
    let collection:mongodb.Collection= await db.collection("records");  
    let query={_id:new ObjectId(req.params.id)};
    let result=await collection.deleteOne(query);
    res.send(result).status(200);
});
router.put("/records/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId("67ee7ec15a5dccc0fc4169d5") };
    console.log(req.body);
    const updates = {
      $set: {
        name: req.body.names,
        position: req.body.position,
        level: req.body.level,
      },
    };

    let collection = await db.collection("records");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});
export default router;