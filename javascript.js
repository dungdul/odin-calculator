let number1 = 0;
let number2 = 0;
let operator = null;

function operate() {
    switch (operator) {
        case "add":
            return number1 + number2;
        case "subtract":
            return number1 - number2;
        case "multiply":
            return number1 * number2;
        case "divide":
            return number1 / number2;
    }
}

function updateDisplay() {
    // Update number displayed
    const displayDiv = document.querySelector("#display");
    if (number2) {
        displayDiv.textContent = number2;
    } else if (number1) {
        displayDiv.textContent = number1;
    } else {
        displayDiv.textContent = 0;
    }

    // Highlight currently selected operator
    const operatorButtons = document.querySelectorAll(".operator");
    operatorButtons.forEach(button => {
        button.classList.remove("selected");
        if (button.id === operator) {
            button.classList.add("selected");
        }
    })
}