const grid = document.querySelector(".grid"),
    resultDisplay = document.querySelector(".results");
let currentShooterIndex = 202;
const width = 15,
    aliensRemoved = [];
let invadersId, isGoingRight = true,
    direction = 1,
    results = 0;

for (let i = 0; i < 225; i++) {
    let cell = document.createElement("div");
    let view = document.createElement("div");
    view.classList.add("view");
    cell.appendChild(view);
    grid.appendChild(cell);
}

const squares = Array.from(document.querySelectorAll(".grid > div")),
    alienInvaders = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39];

function draw() {
    for (let i = 0; i < alienInvaders.length; i++) {
        if (!aliensRemoved.includes(i)) {
            squares[alienInvaders[i]].classList.add("invader");
        }
    }
}

function remove() {
    for (let i = 0; i < alienInvaders.length; i++) {
        squares[alienInvaders[i]].classList.remove("invader");
    }
}

function moveShooter(e) {
    squares[currentShooterIndex].classList.remove("shooter");
    switch (e.key) {
        case "ArrowLeft":
        case "a":
            if (currentShooterIndex % width !== 0) currentShooterIndex -= 1;
            break;
        case "ArrowRight":
        case "d":
            if (currentShooterIndex % width < width - 1) currentShooterIndex += 1;
            break;
    }
    squares[currentShooterIndex].classList.add("shooter");
}

function moveInvaders() {
    const leftEdge = alienInvaders[0] % width === 0;
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1;
    remove();

    if (rightEdge && isGoingRight) {
        for (let i = 0; i < alienInvaders.length; i++) alienInvaders[i] += width + 1;
        direction = -1;
        isGoingRight = false;
    }

    if (leftEdge && !isGoingRight) {
        for (let i = 0; i < alienInvaders.length; i++) alienInvaders[i] += width - 1;
        direction = 1;
        isGoingRight = true;
    }

    for (let i = 0; i < alienInvaders.length; i++) alienInvaders[i] += direction;
    draw();

    if (squares[currentShooterIndex].classList.contains("invader")) {
        resultDisplay.innerHTML = `${results}<br>YOU LOSE`;
        clearInterval(invadersId);
        lockInputs();
    }
    if (aliensRemoved.length === alienInvaders.length) {
        resultDisplay.innerHTML = `${results}<br>YOU WIN`;
        clearInterval(invadersId);
        lockInputs();
    }
}

function shoot(e) {
    let laserId, currentLaserIndex = currentShooterIndex;
    if (e.key === "ArrowUp" || e.key === "w" || e.key === " ") {
        laserId = setInterval(() => {
            squares[currentLaserIndex].classList.remove("laser");
            currentLaserIndex -= width;
            if (currentLaserIndex < 0) {
                clearInterval(laserId);
                return;
            }
            squares[currentLaserIndex].classList.add("laser");

            if (squares[currentLaserIndex].classList.contains("invader")) {
                squares[currentLaserIndex].classList.remove("laser");
                squares[currentLaserIndex].classList.remove("invader");
                squares[currentLaserIndex].classList.add("boom");

                setTimeout(() => squares[currentLaserIndex].classList.remove("boom"), 300);
                clearInterval(laserId);

                const alienRemoved = alienInvaders.indexOf(currentLaserIndex);
                aliensRemoved.push(alienRemoved);
                results++;
                resultDisplay.innerHTML = results;
            }
        }, 100);
    }
}

function lockInputs() {
    document.removeEventListener("keydown", handleKeydown);
    document.getElementById("left").removeEventListener("click", handleLeftButton);
    document.getElementById("right").removeEventListener("click", handleRightButton);
    document.getElementById("up").removeEventListener("click", handleUpButton);
}

function handleKeydown(e) {
    moveShooter(e);
    shoot(e);
}

function handleLeftButton() {
    moveShooter({ key: "ArrowLeft" });
}

function handleRightButton() {
    moveShooter({ key: "ArrowRight" });
}

function handleUpButton() {
    shoot({ key: "ArrowUp" });
}

draw();
squares[currentShooterIndex].classList.add("shooter");

document.addEventListener("keydown", handleKeydown);
document.getElementById("left").addEventListener("click", handleLeftButton);
document.getElementById("right").addEventListener("click", handleRightButton);
document.getElementById("up").addEventListener("click", handleUpButton);

invadersId = setInterval(moveInvaders, 600);

document.addEventListener("DOMContentLoaded", () => {
    function parseQueryParams(url) {
        let params = new URLSearchParams(new URL(url).search);
        let styleVars = {};
        params.forEach((value, key) => {
            if (key && value) {
                styleVars[`--${key}-bg`] = value;
            }
        });
        return styleVars;
    }

    function applyStyles(styleVars) {
        let styleElement = document.createElement("style");
        styleElement.textContent = `:root { ${Object.entries(styleVars).map(([key, value]) => `${key}: ${value};`).join(" ")} }`;
        document.head.appendChild(styleElement);
    }

    let styleVars = parseQueryParams(window.location.href);
    applyStyles(styleVars);
});