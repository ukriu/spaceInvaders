const validCodes = {
    "c1907a5129538ea4eb47676ec4e28eae2583f599c1a4217432fe7151beccd512": "https://spaceinvaders.ukriu.com/game/index.html?invader=url(%27https://avatars.githubusercontent.com/u/87287585%27)&laser=url(https://avatars.githubusercontent.com/u/81536172)&shooter=url(https://avatars.githubusercontent.com/u/90866414)&boom=url(https://avatars.githubusercontent.com/u/70831061)",
    "f1c086afae631d4854443006f07053152d2a0e7fde717f00f59924ef7912fd98": "https://archive.ukriu.com/v0/soon/",
    "9a1165199664150a440f861b70bf4f339639acc09abed68dd1d53d5f3e1f82b1": "https://spaceinvaders.ukriu.com/game/index.html?invader=url(https://avatars.githubusercontent.com/u/72394012)&laser=url(https://cdn.discordapp.com/avatars/530953496023924736/16f5f939f1af7b6d401a95de12285847.webp)&shooter=url(https://avatars.githubusercontent.com/u/74854681)&boom=url(https://cdn.discordapp.com/avatars/719224227936469107/25be2a51d1f105ec6146ce741c5cd21c.webp)",
};

function handleCode() {
    let e = document.getElementById("code-input").value.trim(),
        t = CryptoJS.SHA256(e).toString(CryptoJS.enc.Hex),
        d = document.getElementById("error-message");
    validCodes[t] ? window.location.href = validCodes[t] : d.textContent = "Invalid code. Please try again."
}
document.addEventListener("DOMContentLoaded", () => {
    let e = document.getElementById("code-input");
    e.addEventListener("keypress", e => {
        "Enter" === e.key && (e.preventDefault(), handleCode())
    })
});
