import express from "express";
import database from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Return list of articles
router.get("/getArticles", async (req, res) => {
  let collection = database.collection("articles");
  let result = await collection.find({}).toArray();

  res.status(200).send(result);
});

// Return single article
router.get("/getArticle/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(404).send("Invalid ID format");
  }

  let collection = database.collection("articles");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  result ? res.status(200).send(result) : res.status(404).send("Not found");
});

// Create a new article
router.post("/newArticle", async (req, res) => {
  let newArticle = req.body;
  let collection = database.collection("articles");
  let result = await collection.insertOne(newArticle);

  res.status(204).send(result);
});

// Delete a single article
router.delete("/deleteArticle/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(404).send("Invalid ID format");
  }

  let collection = database.collection("articles");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.deleteOne(query);

  res.status(200).send(result);
});

// Update a single article
router.patch("/updateArticle/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(404).send("Invalid ID format");
  }

  const update = {
    $push: { Description: req.body },
  };

  let collection = database.collection("articles");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.updateOne(query, update);

  res.status(200).send(result);
});

export default router;
