window.onload = () => {
    // const chartContainer = document.getElementById("chartContainer");

    draw();  
}

function draw() {
    const values = [20,35,30,15];

    if(document.getElementById("dot") == null) { 
        for(i = 0; i < values.length; i++) {
            const points = calculatePointPositions(values, i);

            const dot = document.createElement("div");
            document.body.appendChild(dot);
            dot.id = "dot";
            dot.style.left = `${points.x}px`;
            dot.style.top = `${points.y}px`; 
            const randomColor = Math.floor(Math.random()*16777215).toString(16);
            dot.style.backgroundColor = "#" + randomColor;
        }


        // forEach.prosentageValues((e) => {
        // });


    } else {
        document.getElementById("dot").remove();
        draw();
    }
}

function calculatePointPositions(values, i) {
    const center = calculateCenter();
    const prosentage = calculateProsentage(values, i);

    const r = calculateRadius();  
    // const random = Math.floor(Math.random() * 360);
    const random = 0;

    let finalPros = prosentage[i];
    for(let j = 0; j < i; j++) {finalPros = finalPros + prosentage[j];}

    const pointX = parseFloat(center.x) + (r * Math.cos(random + finalPros));
    const pointY = parseFloat(center.y) + (r * Math.sin(random + finalPros));

    return {
        x: pointX,
        y: pointY
    }
}

function calculateProsentage(array, i) {
    const radianOfCircle = [];

    array.forEach(e => {
        radianOfCircle.push((e * (360/100)) * (Math.PI / 180));
        // radianOfCircle[array.indexOf(e)] = (e * (360/100)) * (Math.PI / 180);
    });
    
    return radianOfCircle;
}

function calculateCenter() {
    const centerX = chartContainer.getBoundingClientRect().left + ((chartContainer.getBoundingClientRect().right - chartContainer.getBoundingClientRect().left) / 2);
    const centerY = chartContainer.getBoundingClientRect().top + ((chartContainer.getBoundingClientRect().bottom - chartContainer.getBoundingClientRect().top) / 2);

    return {
        x: centerX.toString(),
        y: centerY.toString()
    }
}

function calculateRadius() {
    const windowWidth = window.innerWidth;
    return (windowWidth * 0.175) / 2;
}

window.addEventListener("resize", () => {
    draw();
})