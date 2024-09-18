const grid = document.querySelector(".grid"),
    resultDisplay = document.querySelector(".results");
let currentShooterIndex = 202;
const width = 15,
    aliensRemoved = [];
let invadersId, isGoingRight = !0,
    direction = 1,
    results = 0;
for (let i = 0; i < 225; i++) {
    let e = document.createElement("div");
    grid.appendChild(e)
}
const squares = Array.from(document.querySelectorAll(".grid div")),
    alienInvaders = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39];

function draw() {
    for (let e = 0; e < alienInvaders.length; e++) aliensRemoved.includes(e) || squares[alienInvaders[e]].classList.add("invader")
}

function remove() {
    for (let e = 0; e < alienInvaders.length; e++) squares[alienInvaders[e]].classList.remove("invader")
}

function moveShooter(e) {
    switch (squares[currentShooterIndex].classList.remove("shooter"), e.key) {
        case "ArrowLeft":
        case "a":
            currentShooterIndex % 15 != 0 && (currentShooterIndex -= 1);
            break;
        case "ArrowRight":
        case "d":
            currentShooterIndex % 15 < 14 && (currentShooterIndex += 1)
    }
    squares[currentShooterIndex].classList.add("shooter")
}

function moveInvaders() {
    let e = alienInvaders[0] % 15 == 0,
        r = alienInvaders[alienInvaders.length - 1] % 15 == 14;
    if (remove(), r && isGoingRight)
        for (let s = 0; s < alienInvaders.length; s++) alienInvaders[s] += 16, direction = -1, isGoingRight = !1;
    if (e && !isGoingRight)
        for (let n = 0; n < alienInvaders.length; n++) alienInvaders[n] += 14, direction = 1, isGoingRight = !0;
    for (let t = 0; t < alienInvaders.length; t++) alienInvaders[t] += direction;
    draw(), squares[currentShooterIndex].classList.contains("invader") && (resultDisplay.innerHTML = "GAME OVER", clearInterval(invadersId)), aliensRemoved.length === alienInvaders.length && (resultDisplay.innerHTML = "YOU WIN", clearInterval(invadersId))
}

function shoot(e) {
    let r, s = currentShooterIndex;
    ("ArrowUp" === e.key || "w" === e.key || "s" === e.key) && (r = setInterval(function e() {
        if (s >= 15) {
            if (squares[s].classList.remove("laser"), (s -= 15) >= 0 && squares[s].classList.add("laser"), squares[s].classList.contains("invader")) {
                squares[s].classList.remove("laser"), squares[s].classList.remove("invader"), squares[s].classList.add("boom"), setTimeout(() => squares[s].classList.remove("boom"), 300), clearInterval(r);
                let n = alienInvaders.indexOf(s);
                aliensRemoved.push(n), results++, resultDisplay.innerHTML = results
            }
        } else clearInterval(r), s >= 0 && squares[s].classList.remove("laser")
    }, 100))
}
draw(), squares[currentShooterIndex].classList.add("shooter"), document.addEventListener("keydown", moveShooter), invadersId = setInterval(moveInvaders, 600), document.addEventListener("keydown", shoot), document.getElementById("left").addEventListener("click", () => moveShooter({
    key: "ArrowLeft"
})), document.getElementById("right").addEventListener("click", () => moveShooter({
    key: "ArrowRight"
})), document.getElementById("up").addEventListener("click", () => shoot({
    key: "ArrowUp"
})), document.addEventListener("DOMContentLoaded", () => {
    function e(e) {
        let r = new URLSearchParams(new URL(e).search),
            s = {};
        return r.forEach((e, r) => {
            r && e && (s[`--${r}-bg`] = e)
        }), s
    }

    function r(e) {
        let r = document.createElement("style");
        r.textContent = `:root { ${Object.entries(e).map(([e,r])=>`${e}: ${r};`).join(" ")} }`, document.head.appendChild(r)
    }
    let s = e(window.location.href);
    r(s)
});