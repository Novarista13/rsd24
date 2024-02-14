const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb://localhost");

// const db = client.db("todo");
// const tasks = db.collection("tasks");

const x = client.db("x");

async function getData() {
  const data = await x.collection("posts").find().limit(5).toArray();
  console.log(data);
  process.exit(0);
}

getData();
// async function getData() {
//   const data = await tasks.find().toArray();
//   console.log(data);
//   process.exit(0);
// }

// async function insertData(data) {
//   const result = await tasks.insertOne(data);
//   console.log(result);
//   process.exit(0);
// }

// async function updateData(_id, data) {
//   console.log({ _id });
//   const result = await tasks.updateOne({ _id }, { $set: data });
//   console.log(result);
//   process.exit(0);
// }

// async function deleteData(_id) {
//   const result = await tasks.deleteOne({ _id });
//   console.log(result);
//   process.exit(0);
// }

// getData();
// insertData({ subject: "Test", done: false });
// deleteData('65bdf80dbc3a622bbe1def18');
// updateData("65bdf80dbc3a622bbe1def18", { subject: "Test Change", done: true });
