function sustitution(char) {
    let code = (char.charCodeAt(0) + 1 ) % 123;
    if(code<96){
        code+=97;
    }
    return String.fromCharCode(code);
}

function permutation(block) {
    return block[2]+ block[1]+ block[3]+ block[0];
}

function getBlocks(message) {
    let blocks = [];
    for (let i = 0; i < message.length; i += 4) {
        blocks.push(message.substring(i, i + 4));
    }
    return blocks;
}

function feistel(blocks) {
    for (let i = 0; i < 16; i++) {
        let newBlocks = [];
        for (let j = 0; j < blocks.length; j += 2) {
            /*Takin 2 blocks per step*/
            let blockA = blocks[j];
            let blockB = blocks[j + 1];
            /*Applyng transition and permutation to block A */
            let sustitioned = "";
            for (let char of blockA) {
                sustitioned += sustitution(char);
            }
            blockA = permutation(sustitioned);
            newBlocks.push(blockB,blockA);
        }
        blocks= newBlocks;
        console.log("Step ", i, ": ", blocks);

    }
}

let message = "electricidadyelectronica";

let blocks = getBlocks(message);

feistel(blocks);