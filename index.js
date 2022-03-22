// load up the express framework and body-parser helper
const express = require("express");
const bodyParser = require("body-parser");

// create an instance of express to serve our end points
const app = express();

// we'll load up node's built in file system helper library here
// (we'll be using this later to serve our JSON files
const fs = require("fs");

// configure our express instance with some body-parser settings
// including handling JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
console.log("ok bro");

const Web3 = require("web3");
const rpcURL = "https://bsc-dataseed.binance.org:443";
const web3 = new Web3(rpcURL);

let tokenAddress = "0x5a351f5B989125f0F076123D9e4b57Ab043C5e3A";
//	let walletAddress = "0xBD14A76c962a5C74D83a63616D9F23acbCD3925e";

// The minimum ABI to get ERC20 Token balance
let minABI = [
	// balanceOf
	{
		constant: true,
		inputs: [{ name: "_owner", type: "address" }],
		name: "balanceOf",
		outputs: [{ name: "balance", type: "uint256" }],
		type: "function",
	},
	// decimals
	{
		constant: true,
		inputs: [],
		name: "decimals",
		outputs: [{ name: "", type: "uint8" }],
		type: "function",
	},
];

var tokenInst = new web3.eth.Contract(minABI, tokenAddress);
var balexip = 0;

// this is where we'll handle our various routes from
// const routes = require("./routes/routes.js")(app, fs);

app.get("/:id", function (req, res) {
	var word = req.params.id;

	tokenInst.methods
		.balanceOf(word)
		.call()
		.then(function (bal) {
			//console.log(web3.utils.fromWei(bal));

			balexip = web3.utils.fromWei(bal);
		});

	var exval = { token: balexip };
	var exipjson = JSON.stringify(exval);
	res.send(exipjson);

	//res.send("EXIP BAL New - " + balexip);
});

// finally, launch our server on port 3001.
const apprun = app.listen(3000, () => {
	console.log("listening on port %s...", apprun.address().port);
});
