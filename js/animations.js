anime({
    targets:'#innerGrid',
    opacity:[0,1],
    scaleX:[0,1],
    scaleY:[0,1],
    duration:2000,
    ease:'easeInOutCirc',
    delay:anime.stagger(300),
})



anime({
    targets:'#security-icon',
    rotateY: [-360, 360],
    loop: true,
    direction: "alternate",
    easing: "easeInOutSine",
    duration: 3000,
});