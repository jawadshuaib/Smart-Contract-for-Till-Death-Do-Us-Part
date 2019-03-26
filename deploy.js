const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

// we need to specify our account and node address for infura unlike with our
// local ethereum network built using ganache. Our account will need to have
// ether to deploy this contract. For the rinkbey network we can use to the test
// ether we accumulated from the ether faucet.

const provider = new HDWalletProvider(
  // this mneumonic identifies our account and resolves to the public and private api
  "--- Add Mneumonic Identifying Your Ethereum Account ---",
  // infura end point
  "--- Add Endpoint for the Infura API ---"
);

// now we can use this instance to get access to our account and corresponding ether
const web3 = new Web3(provider);
let result;
const deploy = async () => {
  // get a list of all the accounts unlocked via the provider
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from account", accounts[0]);

  console.log(interface);
  // interface  is the ABI
  result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: "0x" + bytecode,
      arguments: []
    })
    .send({ from: accounts[0], gas: "1000000" });

  // result = await new web3.eth.Contract(JSON.parse(interface))
  //   .deploy({ data: bytecode, arguments: [] })
  //   .send({ gas: "1000000", from: accounts[0] }, function(e) {
  //     console.log("Error:", JSON.stringify(e));
  //   });

  //   result.setProvider(provider);
  // console out the address where the contract was deployed to on Rinkeby
  // this address is important because we can use it to interact with the contract
  // using a web app
  // we can check our contract on the rinkeyby network using this site:
  // https://rinkeby.etherscan.io/ (i.e. https://rinkeby.etherscan.io/address/0xcdc117a4ffcaa7a6a6d12a1c31782c0054cb5ec7)

  // we can actually interact with the deployed contract using remix.ethereum.org using the contract's
  // address: 0xCDC117A4FFCaa7A6a6D12A1C31782c0054CB5EC7
  console.log("Contract deployed to", result.options.address);
};

deploy();
