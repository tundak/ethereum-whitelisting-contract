# Ethereum address whitelisting contract Dapp.

contract https://rinkeby.etherscan.io/address/0xad60fda915d8722be0dfae0681a8b272d08357f6

## Contract deploy

Solidity contract is available under `contracts` directory. simply deploy it to any network. Only contract owner will be able to call `addWhiteList` and `removeWhiteList` methods. anyone can call to see whitelist data with method `retrieveWhiteList`.


## Development server
Once deployed contract successfuly, use contract owner privatekey to access methods. replace `##PRIVATEKEY##` at `src/app/app.component.ts` with contract owner private key.


Run `npm install` then call `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
