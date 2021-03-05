const { Collection, validateCollection } = require('../models/collection');
const { Card, validateCard } = require('../models/card');
const express = require("express");
const router = express.Router();

// POST REQUEST --> Create A Collection
router.post('/', async (req, res) => {
    try {
        const {error} = validateCollection(req.body);

        if (error) return res.status(400).send(error);

        const collection = new Collection({
            title: req.body.title,
        });

        await collection.save();
        return res.send(collection);
        
    } catch (error) {
        return res.status(500).send(`Internal Error: ${error}`);
    }
})

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
