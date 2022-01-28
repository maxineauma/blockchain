const Blockchain = require('./blockchain.js');
const express = require('express');

const app = express();
const port = 5000;

var blockchain = new Blockchain();
blockchain.create_block(1, '0');

app.get('/mine_block', (req, res) => {
    previous_block = blockchain.get_prev_block();
    previous_proof = previous_block['proof'];
    proof = blockchain.proof_of_work(previous_proof);
    previous_hash = blockchain.hash(previous_block);
    block = blockchain.create_block(proof, previous_hash);

    let resp = {
        'message': 'Block has been mined.',
        'index': block['index'],
        'timestamp': block['timestamp'],
        'proof': block['proof'],
        'previous_hash': block['previous_hash']
    };

    console.log(resp);
    res.sendStatus(200);
});

app.get('/get_chain', (req, res) => {
    resp = {
        'chain': blockchain.chain,
        'length': blockchain.chain.length
    };

    console.log(resp);
    res.sendStatus(200);
});

app.get('/valid', (req, res) => {
    valid = blockchain.chain_valid(blockchain.chain);
    if(valid) resp = {'message': 'This blockchain is valid.'};
    else resp = {'message': 'This blockchain is invalid.'};

    console.log(resp);
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
