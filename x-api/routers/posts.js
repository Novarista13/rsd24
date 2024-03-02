require("dotenv").config();

const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const { MongoClient, ObjectId } = require("mongodb");
const mongo = new MongoClient(process.env.MONGO_HOST);
const xdb = mongo.db("x");
const xposts = xdb.collection("posts");

router.get("/posts", async (req, res) => {
  const { owner } = req.query;
  if (owner) {
    try {
      const data = await xposts
        .find({ owner: new ObjectId(owner), type: "post" })
        .toArray();
      return res.json(data);
    } catch (e) {
      return res.status(400).json({ msg: "owner is not exist" });
    }
  } else {
    const data = await xposts.find({ type: "post" }).limit(20).toArray();
    return res.json(data);
  }
});

router.get("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const data = await xposts.findOne({ _id: new ObjectId(id) });
  return res.json(data);
});

router.get("/comments", async (req, res) => {
  const { origin } = req.query;
  if (!origin)
    return res.status(400).json({ msg: "origin of the comment is required" });
  const data = await xposts
    .find({ origin: new ObjectId(origin), type: "comment" })
    .limit(20)
    .toArray();
  return res.json(data);
});

module.exports = { postsRouter: router };
