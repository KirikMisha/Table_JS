const addTableBtn = document.querySelector('#add-table-btn')
const addRowBtn = document.querySelector('#add-row-btn')
const removeRowBtn = document.querySelector('#remove-row-btn')
const xInput = document.querySelector('#x-input')
const yInput = document.querySelector('#y-input')
const tableBlock = document.querySelector("#table-block")
const rowNumberInput = document.querySelector('#row-number-input')


const data = []


function createTable( /* array of table rows*/ data) {
    removeRowBtn.disabled = data.length === 0;
    let html = ""
    data.forEach((row, index) => {
        html += createTableRow(row, index)
    })
    tableBlock.insertAdjacentHTML('afterbegin', `
        <table>
            <thead>
                <tr>
                    <td>№</td>
                    <td>X</td>
                    <td>Y</td>  
                </tr>
            </thead>
            <tbody id="table-body">
                ${html}
            </tbody>
        </table>
`)
}
/**
 * @param row - {x: number, y: number} element of data
 * @param index - number index of data element
* */
function createTableRow(row,  index) {
    return (`
        <tr>
            <td>${++index}</td>
            <td>${row.x}</td>
            <td>${row.y}</td>
        </tr>
`)
}

addTableBtn.addEventListener('click', () => {
    addRowBtn.disabled = false
    removeRowBtn.disabled = false
    addTableBtn.disabled = true
    createTable(data)
})

function removeRow(/*number of row*/ index) {
    data.splice(index, 1)
    tableBlock.innerHTML = ""
    createTable(data)
}


removeRowBtn.addEventListener('click', () => {
    let index = +rowNumberInput.value
    if (Number.isNaN(index)) {
        alert("Wrong row number")
    } else {
        removeRow(--index)
        rowNumberInput.value = ""
    }
})

addRowBtn.addEventListener('click', () => {
    const yVal = +yInput.value.trim()
    const xVal = +xInput.value.trim()
    const obj = {x: xVal, y: yVal}

    data.push(obj)
    tableBlock.innerHTML = ""
    yInput.value = ""
    xInput.value = ""
    createTable(data)
})
