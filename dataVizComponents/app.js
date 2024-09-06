window.onload = () => {
    draw();  
    const chartContainer = document.getElementById("pie");
    centerX = window.scrollX + chartContainer.getBoundingClientRect().left;
    console.log(chartContainer.getBoundingClientRect());
    centerY =  "567px";

    const dot = document.createElement("dot");
    document.body.appendChild(dot);
    dot.id = "dot";
    dot.style.left = "200px";
    dot.style.top = centerY;
}

function draw() {
  
}

function calculateCenter() {
    const chartContainer = document.getElementById("pie");

    // centerX = (window.innerWidth /2)
    // centerY = (window.innerHeight - chartContainer.offsetTop) + (chartContainer.offsetHeight/2)
    // console.log(chartContainer.getBoundingClientRect().top);
}







// const conatiner  = document.getElementById("divTest")

// const left  = conatiner.getBoundingClientRect().left;
// const width  = conatiner.getBoundingClientRect().right;
// const centerX = left + ((width-left)/2);

// const tops  = conatiner.getBoundingClientRect().top;
// const height  = conatiner.getBoundingClientRect().bottom;
// const centerY =  tops + ((height-tops)/2);

// const dot =  document.createElement("div");
// document.body.appendChild(dot);
// dot.id = "dot";
// dot.style.left = `${centerX-2.5}px`;
// dot.style.top = `${centerY-2.5}px`;

// const r = 200;
// const random = Math.floor(Math.random() * (360 - 0) + 0)
// console.log(random);

// const pointX = r * Math.sin(random)
// const pointY = r * Math.cos(random);

// const dot2 =  document.createElement("div");
// document.body.appendChild(dot2);
// dot2.id = "dot";
// dot2.style.left = `${(centerX-2.5)+pointX}px`;
// dot2.style.top = `${(centerY-2.5)+pointY}px`;

// const secondPos = random + (360 / 2)
// const pointX2 = r * Math.sin(secondPos)
// const pointY2 = r * Math.cos(secondPos);

// const dot3 =  document.createElement("div");
// document.body.appendChild(dot3);
// dot3.id = "dot";
// dot3.style.left = `${(centerX-2.5)+pointX2}px`;
// dot3.style.top = `${(centerY-2.5)+pointY2}px`;