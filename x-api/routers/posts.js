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

const { auth } = require("../middlewares/auth");

router.get("/posts", async (req, res) => {
  const post = await xposts
    .aggregate([
      {
        $match: { type: "post" },
      },
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "owner",
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "origin",
          as: "comments",
        },
      },
      { $unwind: "$owner" },
      { $sort: { _id: -1 } },
      { $limit: 10 },
    ])
    .toArray();
  return res.json(post);
});

router.get("/posts/profile/:id", async (req, res) => {
  const { id } = req.params;
  const post = await xposts
    .aggregate([
      {
        $match: { type: "post" },
      },
      {
        $match: { owner: new ObjectId(id) },
      },
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "owner",
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "origin",
          as: "comments",
        },
      },
      { $unwind: "$owner" },
      { $sort: { _id: -1 } },
      { $limit: 10 },
    ])
    .toArray();
  return res.json(post);
});

router.post("/posts", async (req, res) => {
  const { type, body, owner } = req.body;
  if (!body)
    return res.status(400).json({ msg: "you need content to make a post" });

  const post = {
    type,
    body,
    owner: new ObjectId(owner),
    created: new Date(),
    likes: [],
  };

  const result = await xposts.insertOne(post);
  post._id = result.insertedId;
  return res.json(post);
});

router.put("/posts/like/:id", auth, async (req, res) => {
  const { id } = req.params;
  const user = res.locals.user;
  const post = await xposts.findOne({ _id: new ObjectId(id) });

  const existedLike = post.likes.find((like) => like.equals(user._id));

  if (existedLike) {
    const result = await xposts.updateOne(
      { _id: new ObjectId(id) },
      { $set: { likes: post.likes.filter((like) => like !== existedLike) } }
    );
    return res.json(result);
  } else {
    const result = await xposts.updateOne(
      { _id: new ObjectId(id) },
      { $set: { likes: [...post.likes, new ObjectId(user._id)] } }
    );
    return res.json(result);
  }
});

router.delete("/posts/:id", auth, async (req, res) => {
  const ownerId = res.locals.user._id;
  const { id } = req.params;
  const post = await xposts.findOne({
    _id: new ObjectId(id),
    owner: new ObjectId(ownerId),
    type: "post",
  });
  if (!post) {
    return res.status(400).json({
      msg: "post doesn't exist or user doesn't have access to delete this",
    });
  }
  const result = await xposts.deleteOne({ _id: new ObjectId(post._id) });
  return res.json(result);
});

module.exports = { postsRouter: router };
