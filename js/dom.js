const UNCOMPLETED_LIST_TODO_ID = "todos";
const COMPLETED_LIST_TODO_ID = "completed-todos";
const TODO_ITEMID = "itemId";

function makeTodo(data /* string */, timestamp /* string */, isCompleted /* boolean */) {

    const textTitle = document.createElement("h2");
    textTitle.innerText = data;

    const textTimestamp = document.createElement("p");
    textTimestamp.innerText = timestamp;

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner")
    textContainer.append(textTitle, textTimestamp);

    const container = document.createElement("div");
    container.classList.add("item", "shadow")
    container.append(textContainer);

    if (isCompleted) {
        container.append(
            createUndoButton(),
            createTrashButton()
        );
    } else {
        container.append(
            createCheckButton()
        );
    }

    return container;
}

function createUndoButton() {
    return createButton("undo-button", function (event) {
        undoTaskFromCompleted(event.target.parentElement);
    });
}

function createTrashButton() {
    return createButton("trash-button", function (event) {
        removeTaskFromCompleted(event.target.parentElement);
    });
}

function createCheckButton() {
    return createButton("check-button", function (event) {
        addTaskToCompleted(event.target.parentElement);
    });
}

function createButton(buttonTypeClass /* string */, eventListener /* Event */) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
        event.stopPropagation();
    });
    return button;
}

function addTodo() {
    let uncompletedTODOList = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
    let textTodo = document.getElementById("title").value;
    let timestamp = document.getElementById("date").value;
    let todo = makeTodo(textTodo, timestamp, false);
    let todoObject = composeTodoObject(textTodo, timestamp, false);
    todo[TODO_ITEMID] = todoObject.id;
    todos.push(todoObject);

    uncompletedTODOList.append(todo);
    updateDataToStorage();
}

function addTaskToCompleted(taskElement /* HTMLELement */) {
    let listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID);
    let taskTitle = taskElement.querySelector(".inner > h2").innerText;
    let taskTimestamp = taskElement.querySelector(".inner > p").innerText;

    // let todoData = taskElement[TODO_ACCESS_OBJECT];
    let newTodo = makeTodo(taskTitle, taskTimestamp, true);

    todos.find(function (todo) {
        return todo.id === taskElement[TODO_ITEMID];
    }).isCompleted = true;

    listCompleted.append(newTodo);
    taskElement.remove();
    updateDataToStorage();
}

function removeTaskFromCompleted(taskElement /* HTMLELement */) {

    const todoPosition = todos.findIndex(function (todo) {
        return todo.id === taskElement[TODO_ITEMID];
    });
    todos.splice(todoPosition, 1);

    taskElement.remove();
    updateDataToStorage();
}

function undoTaskFromCompleted(taskElement /* HTMLELement */) {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
    let taskTitle = taskElement.querySelector(".inner > h2").innerText;
    let taskTimestamp = taskElement.querySelector(".inner > p").innerText;
    // let todoData = taskElement[TODO_ACCESS_OBJECT];
    let newTodo = makeTodo(taskTitle, taskTimestamp, false);

    todos.find(function (todo) {
        return todo.id === taskElement[TODO_ITEMID];
    }).isCompleted = false;

    listUncompleted.append(newTodo);
    taskElement.remove();
    updateDataToStorage();
}

function refreshDataFromTodos() {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
    let listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID);

    todos.forEach((todo) => {
        const newTodo = makeTodo(todo.task, todo.timestamp, todo.isCompleted);
        newTodo[TODO_ITEMID] = todo.id;

        if(todo.isCompleted){
            listCompleted.append(newTodo);
        } else {
            listUncompleted.append(newTodo);
        }
    });
}