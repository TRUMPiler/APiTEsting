"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("../db/connection"));
const mongodb_1 = require("mongodb");
let router = express_1.default.Router();
router.get("/records/", async (req, res) => {
    let collection = await connection_1.default.collection("records");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});
router.get("/records/:id", async (req, res) => {
    let collection = await connection_1.default.collection("records");
    let query = { _id: new mongodb_1.ObjectId(req.params.id) };
    let result = await collection.findOne(query);
    if (!result) {
        res.send("Not found").status(404);
    }
    else {
        res.send(result).status(200);
    }
});
router.get("/records/byname/:name", async (req, res) => {
    let collection = await connection_1.default.collection("records");
    let query = { name: { $regex: new RegExp(`^${req.params.name}$`, "i") } };
    let result = await collection.findOne(query);
    if (!result) {
        console.log(req.params.name);
        res.send("Not found").status(404);
    }
    else {
        res.send(result).status(200);
    }
});
router.post("/records/", async (req, res) => {
    let user = {
        _id: new mongodb_1.ObjectId(),
        name: req.body.name,
        position: req.body.position,
        level: req.body.level
    };
    let collection = await connection_1.default.collection("records");
    let result = await collection.insertOne(user);
    res.send(result).status(200);
});
router.delete("/records/:id", async (req, res) => {
    let collection = await connection_1.default.collection("records");
    let query = { _id: new mongodb_1.ObjectId(req.params.id) };
    let result = await collection.deleteOne(query);
    res.send(result).status(200);
});
router.put("/records/:id", async (req, res) => {
    try {
        const query = { _id: new mongodb_1.ObjectId("67ee7ec15a5dccc0fc4169d5") };
        console.log(req.body);
        const updates = {
            $set: {
                name: req.body.names,
                position: req.body.position,
                level: req.body.level,
            },
        };
        let collection = await connection_1.default.collection("records");
        let result = await collection.updateOne(query, updates);
        res.send(result).status(200);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Error updating record");
    }
});
exports.default = router;
