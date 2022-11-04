const express = require("express");
const fs = require("fs");
require("dotenv").config();

const port=process.env.PORT || 7000

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  // console.log(req.query);
  const data = fs.readFileSync("db.json", { encoding: "utf-8" });
  //console.log(data);
  res.send(data);
});

app.get("/product",(req,res)=>{
  res.send({msg:"welcome to product page"})
})

app.post("/", (req, res) => {
  //console.log(req.body);
  const body = req.body;
  const data = fs.readFileSync("db.json", { encoding: "utf-8" });
  // console.log("data", data);
  const d = JSON.parse(data);
  // console.log("d", d);
  let newtodo = d.todos;
  //console.log(newtodo);
  let maxid = newtodo.length;
  //console.log("maxid", maxid);
  let newid = Date.now();
  const payload = { id: newid, ...body };
  const newtodos = [...newtodo, payload];
  d.todos = newtodos;
  //console.log("d", d);
  //console.log(newtodos);
  const tododata = fs.writeFileSync("db.json", JSON.stringify(d));
  res.send(tododata);
  //res.send("todos")
});

app.delete("/:id", (req, res) => {
  //console.log(req.params.id);
  let id = +req.params.id;
  //console.log("type of", id);
  const data = fs.readFileSync("db.json", { encoding: "utf-8" });
  //console.log(data);
  let d = JSON.parse(data);
  // console.log(d);
  let todos = d.todos;

  let found = todos.findIndex((el, i) => el.id === id);
  //console.log("found", found);
  if (found >= 0) {
    newdata = todos.splice(found, 1);
    d.todos = todos;
    //console.log(d);
    const a = JSON.stringify(d);
    newd = fs.writeFileSync("db.json", a);
    res.send("request completed");
  } else {
    res.status(404).send("no todos found");
  }
});

app.put("/:id", (req, res) => {
  let id = +req.params.id;
  console.log("type of", id);
  let body = req.body;
  //console.log("body", body);
  const data = fs.readFileSync("db.json", { encoding: "utf-8" });
  //console.log(data);
  let d = JSON.parse(data);
  //console.log(d);
  let todos = d.todos;
  let found = todos.findIndex((el, i) => el.id === id);

  if (found >= 0) {
    todos[found] = { id: id, ...body };
    //console.log(todos);
    d.todos = todos;
    //console.log(d);
    const a = JSON.stringify(d);
    newd = fs.writeFileSync("db.json", a);
    res.send("request completed");
  } else {
    res.status(404).send("no todos found");
  }
});

app.listen(port,()=>{
  console.log(`running on ${port}`)
});
