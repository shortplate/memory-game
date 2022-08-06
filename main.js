const mainDiv = document.querySelector("#main-div");
const subDiv = document.querySelector("#sub-div");
const h4 = document.querySelector("h4");
const startButton = document.querySelector("#start-button");
const retryButton = document.querySelector("#retry-button");
let idArray = [];
let stageNumber = 2;
let minusNumber = 0;
let clickNumber = 0;
idArray.push(String(Math.floor(Math.random() * 9)));

function printRectangle() {
    startButton.classList.add("hidden");
    h4.innerText = "Train Your Memory!";
    h4.classList.remove("hidden");
    for(i = 0; i < 9; i++) {
        const div = document.createElement("div");
        div.id = i;
        
        if(i === 3 || i === 6) {
            const br = document.createElement("br");
            subDiv.appendChild(br);
            div.classList.add("rectangle");
            subDiv.appendChild(div);
        } else {
            div.classList.add("rectangle");
            subDiv.appendChild(div);
        }
    }
    subDiv.classList.add("disable-click");
    printQuestion();
}

function printClickedDiv(specific) {
    specific.classList.add("change-color");
    subDiv.classList.add("disable-click");
    setTimeout(() => {
        specific.classList.remove("change-color");
    }, 400);
}

function printQuestion() {
    const randomId = Math.floor(Math.random() * 9);
    idArray.push(String(randomId));
    
    for(i = 0; i < stageNumber; i++) {
        const selectedId = document.getElementById(`${idArray[i]}`);
        setTimeout(() => {
            if(stageNumber - minusNumber === 1) {
                h4.innerText = "YOUR TURN";
            } else {
                h4.innerText = `${stageNumber - minusNumber} elements`;
            }
            selectedId.classList.add("change-color");
            const drop = new Audio('drop.mp3');
            drop.play();
        }, 400 + i * 1200);
        setTimeout(() => {
            selectedId.classList.remove("change-color");
            minusNumber += 1;
        }, 800 + i * 1200);
        setTimeout(() => {
            subDiv.classList.remove("disable-click");
        }, 800 + (stageNumber - 1) * 1200);
    }
}

function clickDiv(event) {
    if(isNaN(event.target.id) === false) {
        printClickedDiv(event.target);
        if(clickNumber < stageNumber - 1) {
            if(event.target.id === idArray[clickNumber]) {
                setTimeout(() => {
                    subDiv.classList.remove("disable-click");
                }, 300);
                const drop = new Audio('drop.mp3');
                drop.play();
                clickNumber += 1;
            } else {
                subDiv.classList.add("disable-click");
                    h4.innerText = "GAME OVER!";
                    const wrong = new Audio('wrong.mp3');
                    wrong.play();
                    stageNumber = 2;
                    clickNumber = 0;
                    minusNumber = 0;
                    retryButton.classList.remove("hidden");
            }
        } else if(clickNumber === stageNumber - 1) {
            if(event.target.id === idArray[clickNumber]) {
                for(i = 0; i < 9; i++) {
                    document.getElementById(`${i}`).classList.add("change-color");
                }
                setTimeout(() => {   
                    for(i = 0; i < 9; i++) {
                        document.getElementById(`${i}`).classList.remove("change-color");
                    }
                }, 400);
                const right = new Audio('right.mp3');
                right.play();
                stageNumber += 1;
                clickNumber = 0;
                minusNumber = 0;
                nextStage();
            } else {
                subDiv.classList.add("disable-click");
                h4.innerText = "GAME OVER!";
                const wrong = new Audio('wrong.mp3');
                wrong.play();
                stageNumber = 2;
                clickNumber = 0;
                minusNumber = 0;
                retryButton.classList.remove("hidden");
            }
        }
    }
}

function nextStage() {
    subDiv.classList.add("disable-click");
    setTimeout(printQuestion, 800);
}

function retry() {
    retryButton.classList.add("hidden");
    subDiv.innerHTML = "";
    idArray = [];
    idArray.push(String(Math.floor(Math.random() * 9)));
    printRectangle();
}

startButton.addEventListener("click", printRectangle);
retryButton.addEventListener("click", retry);
subDiv.addEventListener("click", clickDiv);