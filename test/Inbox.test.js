// built-in library to assert one value is equal to another
// this is a node standard library
const assert = require ('assert');
// local ethereum network library
const ganache = require ('ganache-cli');
// capital letter because it is a constructor.
const Web3 = require ('web3');
// create instance to tell Web3 which ethereum network we are attempting to
// the provider acts as a router to help with read/write operations between the network
// and our javascript code
const web3 = new Web3 (ganache.provider ());
const { interface, bytecode } = require ('../compile');

// UPDATE THESE TWO LINES RIGHT HERE!!!!! <-----------------
// const provider = ganache.provider();
// const web3 = new Web3(provider);

/*
// ------- creating a test for value assertions using mocha -------- //
class Car {
    park () {
        return 'stopped';
    }

    drive () {
        return 'vroom';
    }
}

// test using mocha
// describe is used for organizing
let car;
// beforeEach is like a decorator for the it functions inside describe ()
beforeEach (() => {
    // this runs each time before it () functions are run
    // great for running common operations
    console.log ('****running****');
    car = new Car ();
});

describe ('Car Class', () => {
    // create the test
    it ('can park', () => {
        // test setup and assertion logic         
        assert.equal (car.park (), 'stopped');
    });

    it ('can drive', () => {        
        assert.equal (car.drive (), 'vroom');
    });
}
);
*/

let accounts;
let inbox;

beforeEach ( async () => {
    // get a list of accounts created by Ganache
    // web3.eth.getAccounts ()
    // .then (fetchedAccounts => {
    //     console.log (fetchedAccounts);
    // });

    accounts = await web3.eth.getAccounts ()
    
    // use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract (JSON.parse (interface))
    .deploy ({ data: bytecode, arguments: ['Hi there!'] })
    .send ({ from: accounts[0], gas: '1000000' });

    // inbox.setProvider(provider);
});

describe ('Inbox', () => {
    it ('deploys a contract', () => {
        // console.log (accounts);
        // console.log (inbox);

        // check if the contract has been deployed by making sure the contract address was returned
        // "ok" method checks if the value exists and test passes
        assert.ok (inbox.options.address);        
    });

    it ('has a default message', async () => {
        // call method
        const message = await inbox.methods.message().call();
        assert.equal (message, 'Hi there!');
    });

    it ('can change the message', async () => {
        // we define "from" because this is the person who is paying for this transaction modification
        await inbox.methods.setMessage ('bye').send({ from: accounts[0] });

        const message = await inbox.methods.message().call();
        assert.equal (message, 'bye');
    })
});