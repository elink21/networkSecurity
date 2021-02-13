var map = Array.prototype.map;
let iconAnimation = anime({
    targets: "#icon span",
    rotateX: [0, 360],
    easing: 'linear',
    duration: 500,
});
function caesar(msg, key) {
    key = +key;
    var mappedArray = map.call(msg, function (char) {
        let newNumber = char.charCodeAt(0) + key;
        if (newNumber > 122) {
            return 96 + newNumber % 122;
        } else {
            return newNumber;
        }
    });
    iconAnimation.play();
    return String.fromCharCode(...mappedArray);

}



let plain = document.querySelector("#plainInput");
let encrypted = document.querySelector("#encryptedInput");
let key = document.querySelector("#keyInput");


plain.addEventListener("input", function () {
    encrypted.value = caesar(plain.value, key.value);
});


key.addEventListener("input", function () {
    encrypted.value = caesar(plain.value, key.value);
});