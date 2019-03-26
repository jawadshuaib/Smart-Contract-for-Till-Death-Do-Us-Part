// to import the .sol file we can't just use require() because it is not a js file
const path = require("path");
const fs = require("fs");

const contractName = "NotesEditable";

// compiler. got latest package after running npm install --save solc
const solc = require("solc");

const contractPath = path.resolve(
  __dirname,
  "contracts",
  `${contractName}.sol`
);
const source = fs.readFileSync(contractPath, "utf8");
const output = solc.compile(source, 1).contracts[`:${contractName}`];
// console.log(solc.compile(source, 1));
console.log(JSON.parse(output.interface));
module.exports = output;
