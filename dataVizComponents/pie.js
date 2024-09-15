window.onload = () => {
    draw(amountOfValues.value);
    createSliders(amountOfValues.value);
}

function draw(rangeInput) {
    if(document.getElementById("path")) {
    document.getElementById("path").remove();
    }

    let valuesArray = calculetValues(rangeInput);

    const svg = document.getElementById("chartContainer");

    // svg.style.height = `${(window.innerWidth * 0.6) / 2}px`;
    // svg.style.width = `${(window.innerWidth * 0.6) / 2}px`;

    const cx = svg.clientWidth / 2;
    const cy =  svg.clientHeight / 2;

    const radius = (window.innerWidth * 0.125) / 2;
    const outsideRadius = (window.innerHeight * 0.25) / 2;
    
    if (valuesArray.length == 1) {
        valuesArray[0] = valuesArray[0] - 0.01;
    }

    for(i = 0; i < valuesArray.length; i++) {
        const points = calculatePoints(valuesArray, cx, cy, radius, outsideRadius, i);

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.id = "path";
        svg.appendChild(path);
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        path.setAttribute("fill", `#${randomColor}`);

        const largeArcFlag = (points.endAngle - points.startAngle > Math.PI) ? 1 : 0;
        
        const pathData = [
            `M ${points.x1} ${points.y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${points.x2} ${points.y2}`,
            `L ${points.l1} ${points.l2}`,
            `A ${radius + outsideRadius} ${radius + outsideRadius} 0 ${largeArcFlag} 0 ${points.x3} ${points.y3}`,
            `L ${points.l3} ${points.l4} `
        ].join(' ');

        path.setAttribute('d', pathData);
    }
}

function createSliders(amountOfValues) {
    const maxValue = 100/amountOfValues % 1 == 0 ? 100/amountOfValues :  (100/amountOfValues).toFixed(2);

    for (i = 0; i < 8; i++) {
        if (document.getElementById(`slider${i}`) != null) {
            document.getElementById(`maxValues${i}`).remove();
            document.getElementById(`sliderText1`).remove();
            document.getElementById(`values${i}`).remove();
            document.getElementById(`sliderText0`).remove();
            document.getElementById(`slider${i}`).remove();
            document.getElementById(`amountOfValuesContainers`).remove();
        }
    }
    
    for (j = 0; j < amountOfValues; j++) {
        const div = document.createElement("div");
        div.id = `amountOfValuesContainers`;
        document.getElementById("sliderContainer").appendChild(div);

        const slider = document.createElement("input");
        slider.id = `slider${j}`;
        slider.setAttribute("type", "range");
        slider.setAttribute("min", "1");
        slider.setAttribute("max", `100`);
        slider.setAttribute("value", `${maxValue}`);
        div.appendChild(slider);

        const p0 = document.createElement("p");
        p0.id = `sliderText0`;
        p0.textContent = "Value: ";
        div.appendChild(p0);

        const sliderValue =  document.createElement("output");
        sliderValue.id = `values${j}`;
        p0.appendChild(sliderValue);

        const p1 = document.createElement("p");
        p1.id = "sliderText1";
        p1.textContent = "Max value for segment: "
        div.appendChild(p1);

        const maxSliderValue = document.createElement("output");
        maxSliderValue.id = `maxValues${j}`;
        maxSliderValue.textContent = `${maxValue}`
        p1.appendChild(maxSliderValue);
    }
}

function setSliderValues(amountOfValues) {
    // const maxValue = 100 / amountOfValues;

    // for (i = 0; i < amountOfValues; i++) {
    //     document.getElementById(`maxValues${i}`).textContent = maxValue % 1 == 0 ? maxValue :  maxValue.toFixed(2);
    // }
}

function calculatePoints(valuesArray, cx, cy, radius, outsideRadius, i) {
    const radians = calulateRadians(valuesArray);

    let startAngle = 0;
    let endAngle = 0;

    let cumulativeValue = 0;

    for(j = -1; j < i; j++){
 
        startAngle = cumulativeValue; 
    
        cumulativeValue = cumulativeValue + radians[j + 1];
 
        endAngle = cumulativeValue;
    }

    const x1 = parseFloat(cx) + (radius * Math.cos(startAngle));
    const y1 = parseFloat(cy) + (radius * Math.sin(startAngle));
    const x2 = parseFloat(cx) + (radius * Math.cos(endAngle));
    const y2 = parseFloat(cy) + (radius * Math.sin(endAngle));

    const l1 = parseFloat(cx) + ((radius + outsideRadius) * Math.cos(endAngle));
    const l2 = parseFloat(cy) + ((radius + outsideRadius) * Math.sin(endAngle))
    
    const x3 = parseFloat(cx) + ((radius + outsideRadius) * Math.cos(startAngle));
    const y3 = parseFloat(cy) + ((radius + outsideRadius) * Math.sin(startAngle));

    const l3 = parseFloat(cx) + ((radius) * Math.cos(startAngle));
    const l4 = parseFloat(cy) + ((radius) * Math.sin(startAngle));

    return {startAngle, endAngle, x1, y1, x2, y2, l1, l2, x3, y3, l3, l4}
}

function calculetValues(rangeInput) {
    let values = [];
    
    for (i = 0; i < rangeInput; i++) {
        values.push(100/rangeInput);
    }

    return values
}

function calulateRadians(valuesArray) {
    const radians = [];

    valuesArray.forEach(e => {
        radians.push(e * (360/100) * (Math.PI/180));        
    });
    
    return radians 
}

// const path = document.getElementsByTagName("path");
// path.addEventListener("mouseover", myFuncition);
// function myFuncition(){
//     console.log("aølwidj")
// }

const amountOfValues = document.getElementById("amountOfValues");
amountOfValuesText.textContent = amountOfValues.value;
amountOfValues.addEventListener("input", (e) => {
    amountOfValuesText.textContent = e.target.value;
    
    draw(e.target.value);
    createSliders(e.target.value);
    setSliderValues(e.target.value);
});

window.addEventListener("resize", () => {
    draw(amountOfValues.value);
});