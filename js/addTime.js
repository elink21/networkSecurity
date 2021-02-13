anime({
    targets: "#plusSign",
    scaleX: [0.8, 1.2],
    scaleY: [0.8, 1.2],
    direction: 'alternate',
    loop: true,
    duration: 1000,
    easing: 'linear'
});



function addTime() {
    let inputs = document.querySelectorAll("input");
    let values = [];
    for (input of inputs) {
        values.push(parseInt(input.value));
    }
    timeA = values.slice(0, 4);
    timeB = values.slice(4, 8);

    let days={0:"Sun",1:'Mon',2:'Tue',3:"Wed",4:"Thu",5:"Fri",6:"Sat"};

    let res = convertToTime(convertToSeconds(timeA) + convertToSeconds(timeB));
    console.table(res);
    let resBox= document.querySelector("#result h3");
    
    let resHTML=`
    📅 <br> The new date is:<br>  ${days[res[0]]} , ${res[1]}h:${res[2]}m:${res[3]}s 
    `
    resBox.innerHTML= resHTML;
}

function convertToTime(seconds) {
    let day = Math.floor((seconds / 86400)) % 7;
    seconds %= 86400;
    let hour = Math.floor(seconds / 3600);
    seconds %= 3600;
    let minute = Math.floor(seconds / 60);
    seconds %= 60;
    return [day, hour, minute, seconds];
}

function convertToSeconds(date) {
    let seconds = 0;
    seconds += date[0] * 86400;
    seconds += date[1] * 3600;
    seconds += date[2] * 60;
    seconds += date[3];
    return seconds
}