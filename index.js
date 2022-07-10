// Source code to interact with smart contract

if (window.ethereum) {
    window.web3 = new Web3(ethereum);
    try {
        // ask user for permission
        ethereum.enable();
        // user approved permission
    } catch (error) {
        // user rejected permission
        console.log("user rejected permission");
    }
}
// Old web3 provider
else if (window.web3) {
    window.web3 = new Web3(web3.currentProvider);
    // no need to ask for permission
}
// No web3 provider
else {
    console.log("No web3 provider detected");
}

console.log(window.web3.currentProvider);

// contractAddress and abi are setted after contract deploy
var contractAddress = "0x91243A19645eb8a288F81212e53cF8f20960264A";
var abi = [
    {
        constant: true,
        inputs: [],
        name: "totalSupply",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [{ name: "tokenOwner", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
];

//contract instance
contract = new web3.eth.Contract(abi, contractAddress);

// getTotalSupply();
// getBalanceOf();

// Accounts
var account;

web3.eth.getAccounts(function (err, accounts) {
    if (err != null) {
        alert("Error retrieving accounts.");
        return;
    }
    if (accounts.length == 0) {
        alert("No account found! Make sure the Ethereum client is configured properly.");
        return;
    }
    account = accounts[0];
    console.log("Account: " + account);
    web3.eth.defaultAccount = account;
});

//Smart contract functions
function getBalanceOf() {
    address = $("#newAddress").val();
    contract.methods
        .balanceOf(address)
        .call()
        // .send({ from: account })
        .then(function (tx) {
            console.log("Transaction: ", tx);
        });
}

function getTotalSupply() {
    contract.methods
        .totalSupply()
        .call()
        .then(function (supply) {
            console.log("Total Supply: ", supply);
            document.getElementById("lastInfo").innerHTML = supply;
        });
}
