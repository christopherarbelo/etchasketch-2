const GRID = document.querySelector("main")
const RESET_BUTTON = document.querySelector("#reset")

createGridItems()
configEvents()

RESET_BUTTON.addEventListener("click", () => {
    GRID.textContent = ""
    let size = prompt("Enter a new size (NOTE: Only one size is needed because it's a square)", 16)

    do {
        size = checkSize(size)
        if (size > 100) {
            size = checkSize(prompt("Please enter a size no more than 100", 100))
        }
    } while (size > 100)

    function checkSize(size) {
        if (isNaN(Number(size)) || !size) {
            return 16
        }
        return size
    }

    createGridItems(size)
    changeGridTemplate(size)
    configEvents()
})

function createGridItems(size = 16) {
    let itemCount = size ** 2

    while (itemCount > 0) {
        createGridItem()
        itemCount--
    }
}

function changeGridTemplate(size) {
    GRID.style.gridTemplate = `repeat(${size}, 1fr) / repeat(${size}, 1fr)`
}

function createGridItem() {
    const item = document.createElement("div")
    
    item.classList.add("grid-item")
    GRID.appendChild(item)
}

function configEvents(color) {
    const GRID_ITEMS = document.querySelectorAll(".grid-item")

    GRID_ITEMS.forEach(item => {
        item.addEventListener("mouseover", e => {

            if (color) {
                e.target.style.backgroundColor = randomRGB()
            } else {
                if (!e.target.style.backgroundColor) {
                    e.target.style.backgroundColor = "rgba(0, 0, 0, 0.1)"
                } else {
                    darkenBlack(e, e.target.style.backgroundColor)
                }
            }
        })
    })
}

function darkenBlack(event, color) {
    if (color.split(",").length === 4) { // if len is 4 there is a transparency (alpha) value
        let increment = Number(color.split(",")[3].trim().slice(0, -1)) + .1
        event.target.style.backgroundColor = `rgba(0, 0, 0, ${increment})`
    }
}

function randomRGB() {
    const R = randomColor()
    const G = randomColor()
    const B = randomColor()

    return `rgb(${R}, ${G}, ${B})`
}

function randomColor() {
    return Math.floor(Math.random() * 256)
}
