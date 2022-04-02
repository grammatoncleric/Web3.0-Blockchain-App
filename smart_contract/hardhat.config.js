//https://eth-ropsten.alchemyapi.io/v2/RELpN19GqEanFHFD8loBFQGmS4JKGY0c1

require('@nomiclabs/hardhat-waffle');

// Go to https://www.alchemyapi.io, sign up, create
// a new App in its dashboard, and replace "KEY" with its key
const ALCHEMY_API_KEY = "KEY";

// Replace this private key with your Ropsten account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Be aware of NEVER putting real Ether into testing accounts
const ROPSTEN_PRIVATE_KEY = "0f12c87c19b0e0ee1389954b3380fc65c07d84a85723497c6f8791f040ead320";

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/RELpN19GqEanFHFD8loBFQGmS4JKGY0c',
      accounts: ['0f12c87c19b0e0ee1389954b3380fc65c07d84a85723497c6f8791f040ead320']
    }
  }
}