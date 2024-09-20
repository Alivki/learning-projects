window.onload = () => {
    draw(amountOfValues.value);
    createSliders(amountOfValues.value);
}

function draw(rangeInput) {
    // console.log(document.getElementsByTagName("path"))
    // if(document.getElementsByTagName("path").length != 0) {
    //     console.log("adw"); 
    //     document.getElementsByTagName("path").remove();
    // }

    let valuesArray = calculetValues(rangeInput);

    const svg = document.getElementById("chartContainer");

    const cx = svg.clientWidth / 2;
    const cy =  svg.clientHeight / 2;

    const radius = (window.innerWidth * 0.125) / 2;
    const outsideRadius = (window.innerHeight * 0.25) / 2;
    const hoverRadius = (window.innerHeight * 0.275) / 2;
    
    if (valuesArray.length == 1) {
        valuesArray[0] = valuesArray[0] - 0.01;
    }

    for(i = 0; i < valuesArray.length; i++) {
        const points = calculatePoints(valuesArray, cx, cy, radius, outsideRadius, hoverRadius, i);

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.id = "path";
        document.getElementById("chartContainer").appendChild(path);
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        path.setAttribute("fill", `#${randomColor}`);
        path.setAttribute("prosentage", `${valuesArray[i].toFixed(2)}`)

        const largeArcFlag = (points.endAngle - points.startAngle > Math.PI) ? 1 : 0;
        
        const pathData = [
            `M ${points.x1} ${points.y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${points.x2} ${points.y2}`,
            `L ${points.l1} ${points.l2}`,
            `A ${radius + outsideRadius} ${radius + outsideRadius} 0 ${largeArcFlag} 0 ${points.x3} ${points.y3}`,
            `L ${points.l3} ${points.l4} `
        ].join(' ');

        const hoverPathData = [
            `M ${points.x1} ${points.y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${points.x2} ${points.y2}`,
            `L ${points.ll1} ${points.ll2}`,
            `A ${radius + hoverRadius} ${radius + hoverRadius} 0 ${largeArcFlag} 0 ${points.xx3} ${points.yy3}`,
            `L ${points.l3} ${points.l4} `
        ].join(' ');

        path.setAttribute('d', pathData);
        path.setAttribute("hover", hoverPathData);
    }
}

function createSliders(amountOfValues) {
    const maxValue = 100/amountOfValues % 1 == 0 ? 100/amountOfValues :  (100/amountOfValues).toFixed(2);

    for (i = 0; i < 8; i++) {
        if (document.getElementById(`slider${i}`) != null) {
            // document.getElementById(`maxValues${i}`).remove();
            // document.getElementById(`sliderText1`).remove();
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
    }
}

function calculatePoints(valuesArray, cx, cy, radius, outsideRadius, hoverRadius, i) {
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

    const ll1 = parseFloat(cx) + ((radius + hoverRadius) * Math.cos(endAngle));
    const ll2 = parseFloat(cy) + ((radius + hoverRadius) * Math.sin(endAngle))
    
    const x3 = parseFloat(cx) + ((radius + outsideRadius) * Math.cos(startAngle));
    const y3 = parseFloat(cy) + ((radius + outsideRadius) * Math.sin(startAngle));

    const xx3 = parseFloat(cx) + ((radius + hoverRadius) * Math.cos(startAngle));
    const yy3 = parseFloat(cy) + ((radius + hoverRadius) * Math.sin(startAngle));

    const l3 = parseFloat(cx) + ((radius) * Math.cos(startAngle));
    const l4 = parseFloat(cy) + ((radius) * Math.sin(startAngle));

    return {startAngle, endAngle, x1, y1, x2, y2, l1, l2, x3, y3, l3, l4, ll1, ll2, xx3, yy3}
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


// document.getElementsByTagName("input").addEventListener("input", (e) => {
//     console.log("this works on all sliders?");
// });

const amountOfValues = document.getElementById("amountOfValues");
amountOfValuesText.textContent = amountOfValues.value;
amountOfValues.addEventListener("input", (e) => {
    amountOfValuesText.textContent = e.target.value;
    
    draw(e.target.value);
    createSliders(e.target.value);
});

window.addEventListener("resize", () => {
    draw(amountOfValues.value);
});

let path = "";
document.getElementById("chartContainer").addEventListener("mouseover", (e) => {
    if(e.srcElement.nodeName === "path") {
        const hoverElement = document.getElementById("hiddenHover");
        const hoverColorElement = document.getElementById("hiddenHoverColor");
        hoverElement.style.visibility = "visible";
        hoverColorElement.style.visibility = "visible";
        hoverColorElement.style.backgroundColor = `${e.srcElement.getAttribute("fill")}`;
        hoverElement.textContent = `${e.srcElement.getAttribute("prosentage")}%`;

        path = e.srcElement.getAttribute("d");
        let hoverPath = e.srcElement.getAttribute("hover");
        e.srcElement.setAttribute("d", `${hoverPath}`);
    }
    e.stopPropagation();
});

document.getElementById("chartContainer").addEventListener("mouseout", (e) => {
    if(e.fromElement.nodeName === "path") {
        document.getElementById("hiddenHover").style.visibility = "hidden";
        document.getElementById("hiddenHoverColor").style.visibility = "hidden";
        e.srcElement.setAttribute("d", `${path}`);
    }
    e.stopPropagation();
});

document.addEventListener("mousemove", (e) => {
    const hidden = document.getElementById("hiddenHover");
    const hiddenColor = document.getElementById("hiddenHoverColor");
    console.log(e)
    const x = e.layerX;
    const y = e.layerY;

    hidden.style.left = `${x - (hidden.clientWidth / 2)}px`;
    hidden.style.top = `${y - (hidden.clientHeight + 15)}px`;

    hiddenColor.style.left = `${x - (hidden.clientWidth / 2.5)}px`;
    hiddenColor.style.top = `${y - (hidden.clientHeight + 7.5)}px`;
})