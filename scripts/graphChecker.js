// import graphData from "./graphData.json";
const graphData = require("./graphData.json");

// let outputArr = [];

// for (let node of graphData.nodes) {
//   let tempDict = {};
//   tempDict[node.uid] = [];

//   for (let link of graphData.links) {
//     tempDict[node.uid].push(link.source == node.uid || link.target == node.uid);
//   }
//   outputArr.push(tempDict);
// }

// console.log(outputArr);

for (let link of graphData.links) {
  let found = false;
  for (let node of graphData.nodes) {
    if (link.source == node.uid || link.target == node.uid) {
      found = true;
      continue;
    }
  }
  console.log({ link: link, found: found });
}
