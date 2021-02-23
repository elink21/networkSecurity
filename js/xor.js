function charToBin(char) {
    char = char.toLowerCase();
    let code = char.charCodeAt(0);
    code = code % 97;
    let bin = code.toString(2);
    while (bin.length < 5) {
        bin = "0" + bin;
    }

    return bin;
}

function binToString(bin) {
    res = "";
    for (let i = 0; i <= bin.length - 5; i += 5) {
        let section = bin.slice(i, i + 5);
        let converted = "";
        if (parseInt(section, 2) + 97 <= 122) {
            res += String.fromCharCode(parseInt(section, 2) + 97);
        }
        else {
            let n = parseInt(section, 2) + 97;
            n = n % 122;
            res += parseInt(n);
        }


    }
    return res;
}

function adjustKey(key, size) {
    if (key === '') key = 'aaaaaa';
    while (key.length < size) key += key;
    return key.slice(0, size);
}


function getBinStrings(strA, key) {
    let binA = "";
    let binB = "";

    for (let char of strA) {
        binA += charToBin(char);
    }
    for (let char of key) {
        binB += charToBin(char);
    }

    return [binA, binB];
}

function xor(a, b) {
    let res = "";
    for (let i = 0; i < a.length; i++) {
        a[i] != b[i] ? res += "1" : res += "0";
    }
    return res;
}

function cleanInput() {
    let strA = document.querySelector('#msgInput').value;
    let strB = document.querySelector('#keyInput').value;

    let cleanA = "";
    let cleanB = "";

    for (let c of strA) {
        if (97 <= c.charCodeAt(0) && c.charCodeAt(0) <= 122 ||
            49 <= c.charCodeAt(0) && c.charCodeAt(0) <= 54) {
            cleanA += c;
        }
    }
    for (let c of strB) {
        if (97 <= c.charCodeAt(0) && c.charCodeAt(0) <= 122) {
            cleanB += c;
        }
    }

    document.querySelector('#msgInput').value = cleanA;
    document.querySelector('#keyInput').value = cleanB;
}

function xorCipher() {
    cleanInput();
    let strA = document.querySelector('#msgInput').value;
    strA === '' ? strA = 'a' : strA = strA;
    let key = document.querySelector('#keyInput').value;

    //Getting disabled inputs

    let binA = document.querySelector('#binAInput');
    let binB = document.querySelector('#binBInput');
    let resBin = document.querySelector('#resBinInput');
    let resInput = document.querySelector('#resInput');

    let newKey = adjustKey(key, strA.length);

    let arr = getBinStrings(strA, newKey);

    binA.value = arr[0];
    binB.value = arr[1];

    let bin = xor(...arr);

    resBin.value = bin;


    let res = binToString(bin);
    resInput.value = res;

}

let strA = "abcdefgh";
let key = "abcdaaaaaaaaaaa";
