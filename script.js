const field = document.getElementById("field")
const timer = document.getElementById("timer")
const field_size = document.getElementById("field_size")
const btn = document.getElementById("control")
const size_hint = document.getElementById("size_hint")

const nearest_sq = n => Math.pow(Math.ceil(Math.sqrt(n)), 2);

const warning = () => {
    field_size.value = ''
    field_size.placeholder = "Введите число больше 0"
    return -1
}

function shuffle(array) {
    let currentIndex = array.length;
  
    while (currentIndex != 0) {
  
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
}

const hide = (cells) => {
    let counter = 1
    field.querySelectorAll(".cell").forEach(el => {
        el.firstChild.style.opacity = "0"
        Number(el.firstChild.innerHTML) != 0 ? el.addEventListener("click", function handleClick() {
            if (Number(el.firstChild.innerHTML) == counter) {
                el.firstChild.style.opacity = "1"
                el.classList.add("cell_active")
                el.removeEventListener('click', handleClick)
                counter++
                if (Number(el.firstChild.innerHTML) == 0) {
                    console.log(counter)
                    alert("YOU WON!!!!")
                    initField()
                }
            } else {
                el.firstChild.style.opacity = "1"
                initField()
                alert("Вы не угадали")
            }
        }) : void(0)
    })
    
}

const buildField = (square, cells) => {
    field.style.display = "grid"
    field.style.gridTemplateRows = `repeat(${Math.sqrt(square)}, auto)`
    field.style.gridTemplateColumns = `repeat(${Math.sqrt(square)}, auto)`
    const elementNumbers = new Array(square).fill(0)
    elementNumbers.map((v, i) => {
        i + 1 <= cells ? elementNumbers[i] = i + 1 : void(0)
    })
    shuffle(elementNumbers)
    elementNumbers.map(val => {
        const cell = document.createElement('div')
        cell.classList.add("cell")
        cell.innerHTML = `<h2>${val}</h2>`
        field.appendChild(cell)
        if (val == 0) cell.classList.add('cell_inactive')
    })
    
    setTimeout(hide, cells*300, cells)

}


const initField = (square, cells) => {
    field.classList.toggle("field_inactive")
    field.classList.toggle("field_active")
    size_hint.classList.toggle("hidden")
    field_size.value = ''
    field_size.classList.toggle("hidden")

    document.querySelectorAll('.cell').forEach(el => el.remove())

    square > 0 ? buildField(square, cells) : 0
    
}
    
btn.addEventListener('click', () => {
    const cells = Number(field_size.value)
    const size = cells > 0 ? nearest_sq(cells) : warning()
    if (size != -1 && field.classList.contains("field_inactive")) {
        initField(size, cells)
        btn.textContent = "Выход"
    }
    else if (size == -1 && field.classList.contains("field_active")) {
        initField()
        btn.textContent = "Начать"
    }
    console.log(size)
})