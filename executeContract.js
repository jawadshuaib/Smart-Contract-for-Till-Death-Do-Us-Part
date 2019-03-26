// Execute contract methods using this standalone js file
// Just type "node executeContract.js"

const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");

const provider = new HDWalletProvider(
  // this mneumonic identifies our account and resolves to the public and private api
  "--- Add Mneumonic Identifying Your Ethereum Account ---",
  // infura end point
  "--- Add Endpoint for the Infura API ---"
);

const web3 = new Web3(provider);
let result;
const deploy = async () => {
  // get a list of all the accounts unlocked via the provider
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from account", accounts[0]);

  const permanentAddress = "0xdb346c0564ec748c1dd38c90369b9f72e56e4d67";

  const abi = [
    {
      constant: true,
      inputs: [{ name: "_version", type: "uint16" }],
      name: "doesVersionExist",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [{ name: "_version", type: "uint16" }],
      name: "getContract",
      outputs: [{ name: "", type: "address" }, { name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        { name: "_version", type: "uint16" },
        { name: "_contractAddress", type: "address" },
        { name: "_abi", type: "string" }
      ],
      name: "addContractAddress",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "owner",
      outputs: [{ name: "", type: "address" }],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "latestVersion",
      outputs: [{ name: "", type: "uint16" }],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor"
    }
  ];

  const version = 1;
  const newVersionAddress = "0xc23484710345fa6e0888a1c8fb107be50ba6b899";
  const newContractAbi =
    '[{"constant":false,"inputs":[{"name":"token","type":"string"},{"name":"_dateCreated","type":"uint48"},{"name":"_noteOwnerHashed","type":"string"},{"name":"_encryptedNote","type":"string"}],"name":"createNote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"token","type":"string"}],"name":"doesTokenExist","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"token","type":"string"}],"name":"getNote","outputs":[{"name":"","type":"uint48"},{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"string"},{"name":"_noteOwnerHashed","type":"string"},{"name":"_newNote","type":"string"}],"name":"editNote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]';

  // interface  is the ABI
  result = await new web3.eth.Contract(abi, permanentAddress).methods
    .addContractAddress(version, newVersionAddress, newContractAbi)
    .send({ from: accounts[0], gas: "1000000" });
};

deploy();
