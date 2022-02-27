const btnAdd = document.querySelector('.btn-add') 
let listContainer = document.querySelector('.task-list')
let lists = localStorage.getItem("todo") ? JSON.parse(localStorage.getItem("todo")) : []
let input = document.querySelector('.new-task')

btnAdd.addEventListener('click', add) 
function add(e) {
    e.preventDefault();
    let list = {task:input.value, status:false}
    lists.push(list)
    localStorage.setItem("todo", JSON.stringify(lists))
    render()
}
function render() {
    listContainer.innerHTML = lists.map(e => `
    <div class="todo_thing">
    <input type="checkbox" class="check" value="${e.status}">
    <span class="todo_thing-name">${e.task}</span>
    <button class="delete">
    <i class="fas fa-trash"></i>
    </button>
    </div>`).join('')
    let task = document.querySelectorAll('.todo_thing-name')
    let check = document.querySelectorAll('.check')
    lists.forEach((x,i) => {
       if  (x.status === true) {
           check[i].checked = true
           task[i].style.textDecoration = 'line-through'
       } else { 
           check[i].checked = false
       }
    })
    check.forEach((x,i) => {
        x.addEventListener('click', () => checkItem(x.checked, i))
    })
    let del = document.querySelectorAll('.delete')
    del.forEach((x,i) => x.addEventListener('click', (e) => removeItem(i,e)))
}
function checkItem(value, i) {
    lists[i].status = value
    localStorage.setItem("todo", JSON.stringify(lists))
    render()
}
function removeItem(i,e) {
   e.preventDefault();
   lists.splice(i, 1)
   localStorage.setItem("todo", JSON.stringify(lists))
   render()
}

render()
