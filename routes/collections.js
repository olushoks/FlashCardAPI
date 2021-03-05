const { Collection } = require('../models/collection');
const { Card, validate } = require('../models/card');
const express = require("express");
const router = express.Router();

// POST REQUEST --> ADD CARD TO A COLLECTION
router.post('/:collectionId/cards/:cardId', async (req, res) => {
    try {
        const collection = Collection.findById(req.params.collectionId);

         //CHECK IF COLLECTION EXISTS
        if (!collection) return res.status(400).send(`"${id}" does not correspond to any existing collection. Please provide a  valid ID`);

        const card = await Card.findById(req.params.cardId);

        // CHECK IF CARD EXISTS
        if (!card) return res.status(400).send(`"${id}" does not correspond to any existing card. Please provide a  valid ID`);

        // ADD CARD TO COLLECTION
        collection.cards.push(card);

        await (await collection).save();
        return res.send(collection.card);
    } catch (error) {
        res.status(500).send(`Internal Server Error: ${error}`)
    }
});

module.exports = router;
