function filterHash() {
    let hash = window.location.hash.substring(1)
    let boxes = document.querySelectorAll(".box")
    boxes.forEach((box) => {
        if (box.innerText.toLowerCase().includes(hash.toLowerCase())) {
            box.style.display = "block"
        } else {
            box.style.display = "none"
        }
    })
}

function setupToggle() {
    let toggle = document.querySelector("#toggle")
    toggle.addEventListener("click", function () {
        let hidden = document.querySelectorAll("#filters a.hidden")
        if (toggle.innerHTML.trim() === "+") {
            hidden.forEach((a) => {
                a.style.display = "inline"
            })
            toggle.innerHTML = "-"
        } else {
            hidden.forEach((a) => {
                a.style.display = "none"
            })
            toggle.innerHTML = "+"
        }
    })
}

document.addEventListener("DOMContentLoaded", filterHash)
document.addEventListener("DOMContentLoaded", setupToggle)
window.addEventListener("hashchange", filterHash)
