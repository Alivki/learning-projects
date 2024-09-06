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