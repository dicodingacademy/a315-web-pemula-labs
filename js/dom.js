const UNCOMPLETED_LIST_TODO_ID = "todos";
const COMPLETED_LIST_TODO_ID = "completed-todos";
const TODO_ACCESS_OBJECT = "dataTodo";

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
    
    if(isCompleted){
        container.append(
            createUndoButton(),
            createTrashButton()
        );
    } else {
        container.append(
            createCheckButton()
        );
    }

    container[TODO_ACCESS_OBJECT] = {
        data,
        timestamp,
        isCompleted
    };

    return container;
}

function createUndoButton() {
    return createButton("undo-button", function(event){
        undoTaskFromCompleted(event.target.parentElement);
    });
}

function createTrashButton() {
    return createButton("trash-button", function(event){
        removeTaskFromCompleted(event.target.parentElement);
    });
}

function createCheckButton() {
    return createButton("check-button", function(event){
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



function addTaskToCompleted(taskElement /* HTMLELement */) {
    let listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID);
    let todoData = taskElement[TODO_ACCESS_OBJECT];
    let newTodo = makeTodo(todoData.data, todoData.timestamp, !todoData.isCompleted);

    listCompleted.append(newTodo);
    taskElement.remove();
}

function removeTaskFromCompleted(taskElement /* HTMLELement */) {
    taskElement.remove();
}

function undoTaskFromCompleted(taskElement /* HTMLELement */){
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
    let todoData = taskElement[TODO_ACCESS_OBJECT];
    let newTodo = makeTodo(todoData.data, todoData.timestamp, !todoData.isCompleted);

    listUncompleted.append(newTodo);
    taskElement.remove();
}