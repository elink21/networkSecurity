let characters = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@!";



function splitMessage(msg) {

    let binaryString = '';

    for (let i = 0; i < msg.length; i++) {
        let code = characters.indexOf(msg[i]);

        let binary = code.toString(2);

        while (binary.length < 6) {
            binary = '0' + binary;
        }

        binaryString += binary;
    }

    let middlePoint = Math.floor(binaryString.length / 2);

    return [binaryString.substring(0, middlePoint), binaryString.substring(middlePoint)];
}

function xor(a, b) {
    /*Getting binary of key*/

    let xorString = '';
    for (let i = 0; i < a.length; i++) {
        a[i] == b[i] ? xorString += '0' : xorString += '1';
    }
    return xorString;
}

function permutation(block) {
    [block[0],block[1],block[2],block[3]]= [block[3],block[2],block[0],block[1]];
    return block;
}

function feistel(left, right, key) {
    key = "01111";
    let outputSection = document.querySelector('#outputSection');
    outputSection.innerHTML += `
    <div id="n" class="step">Step</div>
    <div class="a step">Left bits</div>
    <div class="b step">Right bits</div>
    `;

    while (key.length < left.length) key = '0' + key;

    for (let i = 0; i < 16; i++) {
        /*Lucifer*/
        let F = xor(right, key);
        let newRight = xor(F, left);

        /*Permutaciones*/
        left= permutation(left);

        right = newRight;

        let toAdd = `
        <div id="n step${i}" class="n step" >${i}</div>
        <div id="a step${i}" class="a step">${left}</div>
        <div id="b step${i}" class="b step">${right}</div>
        `;



        outputSection.innerHTML += toAdd;

        console.log("Step: ", i, ":", left, right);
    }
    return [right, left];
}

function bitsToString(bits) {
    let convertedMessage = "";
    for (let i = 0; i < bits.length; i += 6) {
        let blockBit = bits.substring(i, i + 6);
        let code = parseInt(blockBit, 2);

        console.log(blockBit, code);
        convertedMessage += characters[code];
    }
    return convertedMessage;
}





function applyFeistel() {
    let message = document.querySelector('#message').value;
    let output = document.querySelector('#outputSection');

    output.innerHTML="";


    let left, right;
    [left, right] = splitMessage(message);
    console.log(left, right);

    let convertedLeft, convertedRight;
    [convertedLeft, convertedRight] = feistel(left, right);

    encoded = bitsToString(convertedLeft + convertedRight);

    console.log("Final message is: ", encoded);

    output.innerHTML+=`
    <div></div>
    <div class="step">Resultado</div>
    <div class="step">${encoded}</div>
    
    `;

    anime({
        targets: ".step",
        translateX: [-300, 0],
        opacity: [0, 1],
        easing: 'easeInOutSine',
        delay: anime.stagger(50)
    })

    

}


