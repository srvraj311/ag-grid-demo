const fs = require("fs");

let data = JSON.parse(fs.readFileSync("data.json"));
console.log(data);

for (let item of data["users"]) {
  let rand = Math.floor(Math.random() * 5);
  item["rating"] = rand.toFixed(2);
}

console.log(data);
fs.writeFileSync("data.json", JSON.stringify(data));
