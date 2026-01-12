let numbers = ["", ""];
let operation = "";

// To keep track if the operation is just done. If that is the case, when user presses a digit button, numbers[0] should be overwritten, not appended
let operationDone = true;

const displayDiv = document.querySelector("#display");

function operate() {
    // Don't do anything if operation isn't specified yet
    // By checking only the operation, user can input a negative number. For example, by pressing - and 2 then = , numbers[0] becomes 0 and numbers[1] becomes 2, the result is 0 - 2 which is -2.
    if (!operation) return;

    numbers = numbers.map(number => +number);

    // Calculate the result
    let result;
    switch (operation) {
        case "add":
            result = numbers[0] + numbers[1];
            break;
        case "subtract":
            result = numbers[0] - numbers[1];
            break;
        case "multiply":
            result = numbers[0] * numbers[1];
            break;
        case "divide":
            // Check for division by 0
            if (numbers[1] === 0) {
                alert("Unfortunately, dividing by zero doesn't simply result in infinity.")
                numbers = numbers.map(number => String(number));
                return;
            }

            result = numbers[0] / numbers[1];
            break;
    }

    // Round the result
    result = Math.round(result * 10 ** 6) / 10 ** 6;

    // Update numbers and operation
    numbers = [String(result), ""];
    operation = "";
}

function updateDisplay() {
    // Update number in display panel
    if (numbers[1]) {
        displayDiv.textContent = numbers[1];
    } else if (numbers[0]) {
        displayDiv.textContent = numbers[0];
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

function updateNumber(index, digit) {
    if (!numbers[index] || numbers[index] === "0") {
        if (digit === ".") {
            numbers[index] = "0.";
        } else {
            numbers[index] = digit;
        }
    } else {
        // Skip if user inputs a dot while there is already a dot
        if (digit === "." && numbers[index].includes(".")) {
            return;
        }
        numbers[index] += digit;
    }
}

// Update number when a digit button is pressed
document.querySelectorAll(".digit").forEach(button => {
    button.addEventListener("click", () => {
        if (!operation) {
            updateNumber(0, button.textContent);
        } else {
            updateNumber(1, button.textContent);
        };
        updateDisplay();
    })
})

// Update operation when an operation button is pressed
document.querySelectorAll(".operation").forEach(button => {
    button.addEventListener("click", () => {
        // Call operate() if there are already two numbers
        if (numbers[1]) operate();

        operation = button.id;
        updateDisplay();
    })
})

// Clear button
document.querySelector("#clear").addEventListener("click", () => {
    numbers = ["", ""];
    operation = "";
    updateDisplay();
})

// Call operate() when the equal button is pressed
document.querySelector("#equal").addEventListener("click", () => {
    operate();
    updateDisplay();
})

updateDisplay();