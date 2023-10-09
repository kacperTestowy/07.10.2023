const display = document.querySelector(".display");
const clearBtn = document.querySelector(".clear");
const btns = document.querySelectorAll(".btn");

let first = true;

let numbers = [];
let signs = [];

let lastUsedSign = '';

let lastSign = false;

let clear = false;

clearBtn.addEventListener("click", () => {
    first = true;
    numbers = [];
    signs = [];
    lastUsedSign = '';
    lastSign = false;
    clear = false;
    display.textContent = '0';
})

btns.forEach(btn => btn.addEventListener("click", (e) => {
    if(!display.textContent.includes('.') || (display.textContent.includes('.') && e.target.dataset.value != '.')) {
        displayOnScreen(e.target.dataset.value);
    }
    console.log(numbers);
    console.log(signs);
    console.log(lastSign);
    console.log(lastUsedSign);
}))

function displayOnScreen(d) {
    if(clear) {
        display.textContent = '';
        clear = false;
    }
    if(first) {
        if(!Number(d) && d != '0') display.textContent += d;
        else display.textContent = d;
        first = false;
    } else {
        if(display.textContent.charAt(0) == '0' && display.textContent.includes('.')) display.textContent += d;
        else if(display.textContent.charAt(0) == '0' && d != '0') display.textContent += d;
        else if(display.textContent.charAt(0) == '0' && d == '0') display.textContent = d;
        else display.textContent += d;
        //if(display.textContent.charAt(0) == '0' && display.textContent.charAt(1) != '.' && display.textContent.length >= 2) display.textContent = display.textContent.slice(1, display.textContent.length);
    }
    if(!Number(d) && d != '0' && d != '.') {
        if(lastSign) {
            signs[signs.length - 1] = d;
            lastSign = true;
        } else {
            signs[signs.length] = d;
            lastSign = true;
        }
        if(signs[0] != '=') {
            let val = display.textContent.slice(0, display.textContent.length - 1);
            if(val) numbers[numbers.length] = val;
        } else {
            signs[0] = signs[1];
            signs = signs.slice(0, 1);
        }
        clear = true;
        if((signs.length == 2 || signs[1] == '=') && numbers.length == 2) {
            calculate();
        }
    } else {
        lastSign = false;
    }
    if (signs[0] == undefined && display.textContent == '=') {
        switch (lastUsedSign) {
            case '*':
                numbers[0] = String(Number(numbers[0]) * Number(numbers[0]));
                break;
            case '/':
                if(Number(numbers[0]) != 0) {
                    numbers[0] = String(Number(numbers[0]) / Number(numbers[0]));
                } else {
                    console.log("dzielenie przez 0!");
                    alert("Nie można dzielić przez 0! Zmieniono wartość na 0.\nWybierz działanie a następnie wpisz liczbę.");
                    numbers[0] = String(0);
                    first = true;
                }
                break;
            case '+':
                numbers[0] = String(Number(numbers[0]) + Number(numbers[0]));
                break;
            case '-':
                numbers[0] = String(Number(numbers[0]) - Number(numbers[0]));
                break;
        }
        display.textContent = numbers[0];
    }
}

function calculate() {
    switch (signs[0]) {
        case '*':
            numbers[0] = String(Number(numbers[0]) * Number(numbers[1]));
            break;
        case '/':
            if(Number(numbers[1]) != 0) {
                numbers[0] = String(Number(numbers[0]) / Number(numbers[1]));
            } else {
                console.log("dzielenie przez 0!");
                alert("Nie można dzielić przez 0! Zmieniono wartość na 0.\nWybierz działanie a następnie wpisz liczbę.");
                numbers[0] = String(0);
                first = true;
            }
            break;
        case '+':
            numbers[0] = String(Number(numbers[0]) + Number(numbers[1]));
            break;
        case '-':
            numbers[0] = String(Number(numbers[0]) - Number(numbers[1]));
            break;
    }
    lastUsedSign = signs[0];
    signs[0] = signs[1];
    signs = [signs[0]];
    numbers = numbers.slice(0, 1);
    signs = signs.slice(0, 1);
    display.textContent = numbers[0];
}

/*
const display = document.querySelector(".display");
const btns = document.querySelectorAll(".btn");

let first = true;

let numbers = [];
let signs = [];

let lastUsedSign = '';

let lastSign = false;

let clear = false;

btns.forEach(btn => btn.addEventListener("click", (e) => {
    if(!display.textContent.includes('.') || (display.textContent.includes('.') && e.target.dataset.value != '.')) {
        displayOnScreen(e.target.dataset.value);
    }
    console.log(numbers);
    console.log(signs);
    console.log(lastSign);
    console.log(lastUsedSign);
}))

function displayOnScreen(d) {
    if(clear) {
        display.textContent = '';
        clear = false;
    }
    if(first) {
        if(!Number(d)) display.textContent += d;
        else display.textContent = d;
        first = false;
    } else {
        display.textContent += d;
    }
    if(!Number(d) && d != '0' && d != '.') {
        if(lastSign) {
            signs[signs.length - 1] = d;
            lastSign = true;
        } else {
            signs[signs.length] = d;
            lastSign = true;
        }
        if(signs[0] != '=') {
            let val = display.textContent.slice(0, display.textContent.length - 1);
            if(val) numbers[numbers.length] = val;
        } else {
            signs[0] = signs[1];
            signs = signs.slice(0, 1);
        }
        clear = true;
        if((signs.length == 2 || signs[1] == '=') && numbers.length == 2) {
            calculate();    
        }
    } else {
        lastSign = false;
    }
    if (signs[0] == undefined && display.textContent == '=') {
        switch (lastUsedSign) {
            case '*':
                numbers[0] = String(Number(numbers[0]) * Number(numbers[0]));
                break;
            case '/':
                if(numbers[0] != 0) numbers[0] = String(Number(numbers[0]) / Number(numbers[0]));
                else numbers[0] = 0;
                break;
            case '+':
                numbers[0] = String(Number(numbers[0]) + Number(numbers[0]));
                break;
            case '-':
                numbers[0] = String(Number(numbers[0]) - Number(numbers[0]));
                break;
        }
        display.textContent = numbers[0];
    }
}

function calculate() {
    switch (signs[0]) {
        case '*':
            numbers[0] = String(Number(numbers[0]) * Number(numbers[1]));
            break;
        case '/':
            if(numbers[1] != 0) numbers[0] = String(Number(numbers[0]) / Number(numbers[1]));
            else numbers[0] = 0;
            break;
        case '+':
            numbers[0] = String(Number(numbers[0]) + Number(numbers[1]));
            break;
        case '-':
            numbers[0] = String(Number(numbers[0]) - Number(numbers[1]));
            break;
    }
    lastUsedSign = signs[0];
    signs[0] = signs[1];
    signs = [signs[0]];
    numbers = numbers.slice(0, 1);
    signs = signs.slice(0, 1);
    display.textContent = numbers[0];
}
*/