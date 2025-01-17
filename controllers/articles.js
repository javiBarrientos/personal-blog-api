import express from 'express';
import database from '../db/connection.js';
import { ObjectId } from 'mongodb';

const router = express.Router();

// Return list of articles
router.get('/articles', async (req, res) => {
    let collection = database.collection('articles');
    let result = await collection.find({}).toArray();

    res.status(200).send(result);
})

// Return single article
router.get('/article/:id', async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(404).send('Invalid ID format');
    }

    let collection = database.collection('articles');
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    result ? res.status(200).send(result) : res.status(404).send('Not found');
})

// Create a new article

// Delete a single article

// Update a single article

export default router;