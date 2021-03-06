function adjustKey(key, size) {
    if (key === '') key = 'aaaaaa';
    while (key.length < size) key += key;
    return key.slice(0, size);
}

function cleanInput() {
    let strA = document.querySelector('#msgInput').value;
    let strB = document.querySelector('#keyInput').value;
    let strC = document.querySelector('#encodedInput').value;

    let cleanA = "";
    let cleanB = "";
    let cleanC = "";

    for (let c of strA) {
        if (97 <= c.charCodeAt(0) && c.charCodeAt(0) <= 122) {
            cleanA += c;
        }
    }
    for (let c of strB) {
        if (97 <= c.charCodeAt(0) && c.charCodeAt(0) <= 122) {
            cleanB += c;
        }
    }

    for (let c of strC) {
        if (97 <= c.charCodeAt(0) && c.charCodeAt(0) <= 122) {
            cleanC += c;
        }
    }

    document.querySelector('#msgInput').value = cleanA;
    document.querySelector('#keyInput').value = cleanB;
    document.querySelector('#encodedInput').value = cleanC;
}

function chrToCode(chr) {
    return chr.charCodeAt(0) - 97;
}

function codeToChr(code) {
    return String.fromCharCode((code + 97))
}


function vigenere(msg, key) {
    let encrypted = "";
    for (let i = 0; i < msg.length; i++) {
        encrypted += codeToChr((chrToCode(msg[i]) + chrToCode(key[i])) % 26);
    }
    return encrypted;
}


function decrypt(encrypted, key) {
    let decrypted = "";
    for (let i = 0; i < encrypted.length; i++) {
        let remain = chrToCode(encrypted[i]) - chrToCode(key[i]);
        if (remain >= 0) {
            decrypted += codeToChr(remain % 26);
        }
        else {
            decrypted += codeToChr((remain + 26) % 26);
        }

    }
    return decrypted;
}

function vigenereDecrypt() {
    cleanInput();
    let encrypted = document.querySelector('#encodedInput').value;
    let key = document.querySelector('#keyInput').value;

    key = adjustKey(key, encrypted.length);

    document.querySelector('#decodedInput').value = decrypt(encrypted, key);

}

function vigenereCipher() {


    cleanInput();
    let msg = document.querySelector('#msgInput').value;
    let key = document.querySelector('#keyInput').value;

    key = adjustKey(key, msg.length);

    document.querySelector('#resInput').value = vigenere(msg, key);
}

function updateKey() {
    vigenereCipher();
    vigenereDecrypt();
}