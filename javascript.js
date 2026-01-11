let number1 = "";
let number2 = "";
let operation = "";

function operate() {
    number1 = +number1;
    number2 = +number2;

    // Calculate the result
    let result;
    switch (operation) {
        case "add":
            result = number1 + number2;
            break;
        case "subtract":
            result = number1 - number2;
            break;
        case "multiply":
            result = number1 * number2;
            break;
        case "divide":
            result = number1 / number2;
            break;
    }

    // Update numbers and operation
    number1 = String(result);
    number2 = "";
    operation = "";
}

function updateDisplay() {
    // Update number in display panel
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
        // Call operate() if there are already two numbers
        if (number2) operate();

        operation = button.id;
        updateDisplay();
    })
})

// Clear button
document.querySelector("#clear").addEventListener("click", () => {
    number1 = "";
    number2 = "";
    operation = "";
    updateDisplay();
})

// Call operate() when the equal button is pressed
document.querySelector("#equal").addEventListener("click", () => {
    operate();
    updateDisplay();
})

updateDisplay();