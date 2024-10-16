window.onload = () => {
    changeBG();

setInterval(changeBG, 60000);
}

function changeBG() {
    document.body.style.backgroundImage = `url("src/${random()}.jpg")`;

}

random = () => { return Math.floor(Math.random() * 43) }