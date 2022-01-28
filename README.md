# Blockchain

Don't know what blockchain is? Want in on the action?<br/>
Now you can have one too! 

From the [Bitcoin Wiki](https://en.bitcoin.it/wiki/Main_Page): 

> A block chain is a transaction database shared by all nodes participating in a system based on the Bitcoin protocol. A full copy of a currency's block chain contains every transaction ever executed in the currency. With this information, one can find out how much value belonged to each address at any point in history.

## Usage Guide
1. `npm install` will install the requirements.
2. Run `miner.js`, to host the node.
3. Open your favourite RESTful API client (I prefer [Insomnia](https://insomnia.rest/)).
4. Start making some GET requests to `localhost:5000`! 

### Endpoints
* `/mine_block` - adds a block to the chain.
* `/get_chain` - returns the entire chain on the node.
* `/valid` - checks the validity of the chain.

The chain WILL cease to exist when the node has ceased.<br/>
This is purely for demonstration purposes.