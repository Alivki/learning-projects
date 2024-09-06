window.onload = () => {
    const canvas = document.getElementById("canvas"); 
    const ctx = canvas.getContext("2d"); 
    canvas.width = 1500;
    canvas.height = 1000;
    let width = canvas.width;
    let height = canvas.height; 

    const input = document.querySelector("#slider");
    value.textContent = input.value;
    input.addEventListener("input", (event) => {
        value.textContent = event.target.value;
        calculator.calculateValues();
    });

    firstPosition = 0;
    let values = [];
    
    const calculator = new sorter(ctx, width, height, input, firstPosition, values);

    calculator.calculateValues();
    calculator.animate();
};

class sorter {
    #ctx;
    #width;
    #height;
    #input;
    #firstPosition; 
    #values;
    constructor(ctx, width, height, input, firstPosition, values) {
        this.#ctx = ctx;
        this.#width = width;
        this.#height = height;
        this.#input = input;
        this.#ctx.strokeStyle = "black";
        this.#firstPosition = firstPosition;
        this.#values = values;
    }
    #drawCanvas(){
        for (let i = 0; i < this.#values.length; i++) {
            this.#ctx.fillStyle = "rgb(185, 196, 245)";
            this.#ctx.fillRect(this.#firstPosition, this.#height - this.#values[i] * 9.5, this.#width / this.#values.length, this.#values[i] * 9.5);
            this.#firstPosition = this.#firstPosition + this.#width / this.#values.length;
        }   
    }
    calculateValues(){
        this.#values = []
        for (let i = 0; i < this.#input.value; i++) {
            this.#values.push(Math.floor(Math.random() * 100));
        }
    }
    animate() {
        this.#firstPosition = 0;
        this.#ctx.clearRect(0, 0, this.#width, this.#height);
        this.#drawCanvas();
        
        requestAnimationFrame(this.animate.bind(this));
    }
}


function sort(){
    let array = [2,5,7,4,3,1]
    let sortedArray = [];

}