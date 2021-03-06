function splitMessage(msg) {

    let binaryString = '';

    for (let i = 0; i < msg.length; i++) {
        let code = msg[i].charCodeAt(0);

        let binary = code.toString(2);

        while (binary.length < 8) {
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

function feistel(left, right, key = '0') {
    while (key.length < left.length) key = '0' + key;

    for (let i = 0; i < 2; i++) {
        let F = xor(right, key);
        let newRight = xor(F, left);
        left = right;
        right = newRight;

        console.log("Step: ", i, ":", left, right);
    }
    return [left,right];
}

function bitsToString(bits) {
    let convertedMessage= "";
    for(let i=0;i<bits.length;i+=7)
    {
        let char= bits.substring(i,i+7);
        convertedMessage+= String.fromCharCode(parseInt(char,2));
    }
    return convertedMessage;
}



let left, right;
[left, right] = splitMessage("electricidadyelectronica");
console.log(left,right);

let convertedLeft, convertedRight;
[convertedLeft,convertedRight]= feistel(left, right);

let encoded= bitsToString(convertedLeft+convertedRight);
console.log("Final message is: ",encoded);



