import express from 'express';
import database from '../db/connection.js';

const router = express().router;

// Return list of articles
router.get('/articles', async (req, res) => {
    let collection = database.collection('articles');

    let results = await collection.find({})
        .toArray();

    res.send(results).status(200);
})

// Return single article

// Create a new article

// Delete a single article

// Update a single article

export default router;