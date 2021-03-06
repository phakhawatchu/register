var Tx = require("ethereumjs-tx");
var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545/"));

// set token source, destination and amount
var myAddress = "0xaa597b7e8aaffe9f2a187bedb472ef3455957560";
var toAddress = "0xa013927bffe9e879134061b9330a01884a65497c";
var amount = web3.utils.toHex(1e16);

// get transaction count, later will used as nonce
web3.eth.getTransactionCount(myAddress).then(function (v) {
    console.log(v);
    count = v;
});

// set your private key here, we'll sign the transaction below
var privateKey = new Buffer("6d...", "hex");

// Get abi array here https://etherscan.io/address/0x86fa049857e0209aa7d9e616f7eb3b3b78ecfdb0#code
var abiArray = [
    {
        constant: true,
        inputs: [],
        name: "name",
        outputs: [{ name: "", type: "bytes32" }],
        payable: false,
        type: "function",
    },
    { constant: false, inputs: [], name: "stop", outputs: [], payable: false, type: "function" },
    {
        constant: false,
        inputs: [
            { name: "guy", type: "address" },
            { name: "wad", type: "uint256" },
        ],
        name: "approve",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        type: "function",
    },
    {
        constant: false,
        inputs: [{ name: "owner_", type: "address" }],
        name: "setOwner",
        outputs: [],
        payable: false,
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "totalSupply",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        type: "function",
    },
    {
        constant: false,
        inputs: [
            { name: "src", type: "address" },
            { name: "dst", type: "address" },
            { name: "wad", type: "uint256" },
        ],
        name: "transferFrom",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "decimals",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        type: "function",
    },
    {
        constant: false,
        inputs: [
            { name: "dst", type: "address" },
            { name: "wad", type: "uint128" },
        ],
        name: "push",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        type: "function",
    },
    {
        constant: false,
        inputs: [{ name: "name_", type: "bytes32" }],
        name: "setName",
        outputs: [],
        payable: false,
        type: "function",
    },
    {
        constant: false,
        inputs: [{ name: "wad", type: "uint128" }],
        name: "mint",
        outputs: [],
        payable: false,
        type: "function",
    },
    {
        constant: true,
        inputs: [{ name: "src", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "stopped",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        type: "function",
    },
    {
        constant: false,
        inputs: [{ name: "authority_", type: "address" }],
        name: "setAuthority",
        outputs: [],
        payable: false,
        type: "function",
    },
    {
        constant: false,
        inputs: [
            { name: "src", type: "address" },
            { name: "wad", type: "uint128" },
        ],
        name: "pull",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "owner",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        type: "function",
    },
    {
        constant: false,
        inputs: [{ name: "wad", type: "uint128" }],
        name: "burn",
        outputs: [],
        payable: false,
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "symbol",
        outputs: [{ name: "", type: "bytes32" }],
        payable: false,
        type: "function",
    },
    {
        constant: false,
        inputs: [
            { name: "dst", type: "address" },
            { name: "wad", type: "uint256" },
        ],
        name: "transfer",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        type: "function",
    },
    { constant: false, inputs: [], name: "start", outputs: [], payable: false, type: "function" },
    {
        constant: true,
        inputs: [],
        name: "authority",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        type: "function",
    },
    {
        constant: true,
        inputs: [
            { name: "src", type: "address" },
            { name: "guy", type: "address" },
        ],
        name: "allowance",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        type: "function",
    },
    { inputs: [{ name: "symbol_", type: "bytes32" }], payable: false, type: "constructor" },
    {
        anonymous: true,
        inputs: [
            { indexed: true, name: "sig", type: "bytes4" },
            { indexed: true, name: "guy", type: "address" },
            { indexed: true, name: "foo", type: "bytes32" },
            { indexed: true, name: "bar", type: "bytes32" },
            { indexed: false, name: "wad", type: "uint256" },
            { indexed: false, name: "fax", type: "bytes" },
        ],
        name: "LogNote",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [{ indexed: true, name: "authority", type: "address" }],
        name: "LogSetAuthority",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [{ indexed: true, name: "owner", type: "address" }],
        name: "LogSetOwner",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: "from", type: "address" },
            { indexed: true, name: "to", type: "address" },
            { indexed: false, name: "value", type: "uint256" },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: "owner", type: "address" },
            { indexed: true, name: "spender", type: "address" },
            { indexed: false, name: "value", type: "uint256" },
        ],
        name: "Approval",
        type: "event",
    },
];
// Here you may get the abicode from a string or a file, here is a string case
// var abiArray = JSON.parse('[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"stop","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"owner_","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint128"}],"name":"push","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"name_","type":"bytes32"}],"name":"setName","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint128"}],"name":"mint","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"src","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"stopped","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"authority_","type":"address"}],"name":"setAuthority","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"wad","type":"uint128"}],"name":"pull","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint128"}],"name":"burn","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"start","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"authority","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"src","type":"address"},{"name":"guy","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"symbol_","type":"bytes32"}],"payable":false,"type":"constructor"},{"anonymous":true,"inputs":[{"indexed":true,"name":"sig","type":"bytes4"},{"indexed":true,"name":"guy","type":"address"},{"indexed":true,"name":"foo","type":"bytes32"},{"indexed":true,"name":"bar","type":"bytes32"},{"indexed":false,"name":"wad","type":"uint256"},{"indexed":false,"name":"fax","type":"bytes"}],"name":"LogNote","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"authority","type":"address"}],"name":"LogSetAuthority","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"}],"name":"LogSetOwner","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}]', 'utf-8')

var contractAddress = "0x86Fa049857E0209aa7D9e616F7eb3b3B78ECfdb0";
var contract = new web3.eth.Contract(abiArray, contractAddress, { from: myAddress });

var rawTransaction = {
    from: myAddress,
    gasPrice: web3.utils.toHex(2 * 1e9),
    gasLimit: web3.utils.toHex(210000),
    to: contractAddress,
    value: "0x0",
    data: contract.methods.transfer(toAddress, amount).encodeABI(),
    nonce: web3.utils.toHex(count),
};
var transaction = new Tx(rawTransaction);
transaction.sign(privateKey);

web3.eth.sendSignedTransaction("0x" + transaction.serialize().toString("hex"));

// check the balance
contract.methods
    .balanceOf(myAddress)
    .call()
    .then(function (balance) {
        console.log(balance);
    });
