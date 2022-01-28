const crypto = require('crypto');
const utf8 = require('utf8');
const json = require('json-keys-sort');   

class Blockchain {

    constructor(chain) {
        this.chain = [];
    }

    create_block(proof, previous_hash) {
        let block = {
            'index': this.chain.length + 1,
            'timestamp': Date.now(),
            'proof': proof,
            'previous_hash': previous_hash
        };

        this.chain.push(block);
        return(block);
    }

    get_prev_block() {
        return this.chain[this.chain.length-1];
    }

    proof_of_work(previous_proof) {
        let new_proof = 1
        let check_proof = false

        while(check_proof == false) {
            let hash_operation = crypto.createHash('sha256')
                .update(utf8.encode(String(new_proof**2 - previous_proof**2)))
                .digest('hex');

            if(hash_operation.slice(0, 5) == '00000') 
                check_proof = true;
            else 
                new_proof += 1;
        }

        return new_proof;
    }

    hash(block) {
        let encoded_block = utf8.encode(JSON.stringify(json.sort(block)));
        return crypto.createHash('sha256')
            .update(encoded_block)
            .digest('hex');
    }

    chain_valid(chain) {
        let previous_block = chain[0];
        let block_index = 1;

        while(block_index < chain.length) {
            let block = chain[block_index];
            if(block['previous_hash'] != this.hash(previous_block))
                return false;

            let previous_proof = previous_block['proof'];
            let proof = block['proof'];
            let hash_operation = crypto.createHash('sha256')
                .update(utf8.encode(String(proof**2 - previous_proof**2)))
                .digest('hex');

            if(hash_operation.slice(0, 5) != '00000')
                return false;

            previous_block = block;
            block_index += 1;
            
        }
        
        return true;
    }

}

module.exports = Blockchain;