import logger from "redux-logger";

const p2e_contract_address = "0x"; // our deployed P2EGame.sol contract
const p2e_abi = [
    {
      inputs: [
        {
          internalType: "address",
          name: "_player",
          type: "address",
        },
        {
          internalType: "address",
          name: "_treasury",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_p",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_t",
          type: "uint256",
        },
      ],
      name: "createGame",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            indexed: true,
            internalType: "address",
            name: "player",
            type: "address",
          },
        ],
        name: "NewGame",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "previousOwner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],name: "OwnershipTransferred",
        type: "event",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_gameId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "_player",
            type: "address",
          },
        ],
        name: "playerLost",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gameId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_player",
        type: "address",
      },
    ],
    name: "playerWon",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gameId",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "balances",
    outputs: [
      {
        internalType: "address",
        name: "treasury",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "locked",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "spent",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "contractBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "gameId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gameId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_player",
        type: "address",
      },
    ],
    name: "gameState",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "unit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
]; // P2EGame.sol contract ABI

const adminBotK = "INSERT_PRIVATE_KEY";// !!! DO NOT USE IF THIS FILE WILL BE UNECRYPTED OR IN PUBLIC DIR ON LIVE SERVER !!!
//cost web3 = Moralsweb3ByChai("0x");  // mumbai test // diff method
const web3Speedy = new Morals.Web3(
    new Moralis.Web3.providers..HttpProvider(
        "https://speedy-nodes-nyc.moralis.io/2f9030e63c6503c12a1e7340/polygon/mumbai"
        )
      );

const adminBot = new web3Speedy.eth.Contract(p2e_abi, p2e_contract_address);

Moralis.colud.define("createGame", async (request) => {
    logger.info("--- Starting A Game ---");
    const functionCall = adminBot.methods
    .createGame(
        request.params_player,
        request.params._treasury,
        request.params._p,
        request.params._t
    )
    .encodeABI();
    const transactionBody = {
        to: p2e_contract_address,
        data: functionCall,
    gas: 300000,
    gasPrice: web3Speedy.utils.toWei("3", "gwei"),
  };
  signedTransaction = await web3Speedy.eth.accounts.signTransaction(
    transactionBody,
    adminBotK
  );
  logger.info(signedTransaction.transactionHash);
  fulfillTx = await web3Speedy.eth.sendSignedTransaction(
    signedTransaction.rawTransaction
  );
  logger.info("fulfillTx: " + JSON.stringify(fulfillTx));
  return signedTransaction;
});

Moralis.Cloud.define("playerLost", async (request) => {
    logger.info("--- Player Lost ---");
    const functionCall = adminBBot.methods
    .playerLost(request.params._gameId, request.params._player)
    .encodeABI();
  const transactionBody = {
    to: p2e_contract_address,
    data: functionCall,
    gas: 300000,
    gasPrice: web3Speedy.utils.toWei("3", "gwei"),
  };
  signedTransaction = await web3Speedy.eth.accounts.signTransaction(
    transactionBody,
    adminBotK
  );
  logger.info(signedTransaction.transactionHash);
  fulfillTx = await web3Speedy.eth.sendSignedTransaction(
    signedTransaction.rawTransaction
  );
  logger.info("fulfillTx: " + JSON.stringify(fulfillTx));
  return signedTransaction;
});

Moralis.Cloud.define("playerWon", async (request) => {
    logger.info("--- Player Won ---");
    const functionCall = adminBot.methods
    .playerWon(request.params._gameId, request.params._player)
    encodeABI();
    const tranactionBody = {
        to; p2e_contarct_address,
        data: functionCall,
        gas: 300000,
        gasPrice: web3Speedy.utils.toWei("3", "gwei"),
    };
    signedTransaction = await web3Speedy.eth.accounts.signTransaction(
        transactionBody,
        adminBotK
      );
      logger.info(signedTransaction.transactionHash);
  fulfillTx = await web3Speedy.eth.sendSignedTransaction(
    signedTransaction.rawTransaction
  );
  logger.info("fulfillTx: " + JSON.stringify(fulfillTx));
  return signedTransaction;
});

Moralis.Cloud.define("maxSupply", async (request) => {
    const maxSupply = await adminBot.methods
    .maxSupply()
    .call.catch((e) => logger.error(`callName: ${e}${JSON.stringify(e, nul, 2)}`));
    return maxSupply;
});

Moralis.Cloud.define("contractBBalance", async (request) => {
    const contractBalance = await adminBot.methods
    .contractBalance()
    .call()
    .catch((e) => logger.error(`callName: ${e}${JSON.stringify(e, null, 2)}`));
    return contractBalance;
});
