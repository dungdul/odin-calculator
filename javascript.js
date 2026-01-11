let number1 = "";
let number2 = "";
let operation = "";

function operate() {
    number1 = +number1;
    number2 = +number2;
    switch (operation) {
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

    // Highlight currently selected operation
    const operationButtons = document.querySelectorAll(".operation");
    operationButtons.forEach(button => {
        button.classList.remove("selected");
        if (button.id === operation) {
            button.classList.add("selected");
        }
    })
}

function updateNumber(digit) {
    if (!operation) {
        number1 += digit;
    } else {
        number2 += digit;
    }
}

// Update number when a digit button is pressed
document.querySelectorAll(".digit").forEach(button => {
    button.addEventListener("click", () => {
        updateNumber(button.textContent);
        updateDisplay();
    })
})

// Update operation when an operation button is pressed
document.querySelectorAll(".operation").forEach(button => {
    button.addEventListener("click", () => {
        operation = button.id;
        updateDisplay();
    })
})

// The clear button
document.querySelector("#clear").addEventListener("click", () => {
    number1 = "";
    number2 = "";
    operation = "";
    updateDisplay();
})

updateDisplay();