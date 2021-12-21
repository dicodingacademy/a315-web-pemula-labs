function makeTodo(todoObject){//data /* string */, timestamp /* string */, isCompleted /* boolean */) {

    const {id, task, timestamp, isCompleted} = todoObject;

    const textTitle = document.createElement("h2");
    textTitle.innerText = task;

    const textTimestamp = document.createElement("p");
    textTimestamp.innerText = timestamp;

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner")
    textContainer.append(textTitle, textTimestamp);

    const container = document.createElement("div");
    container.classList.add("item", "shadow")
    container.append(textContainer);
    container.setAttribute("id", `todo-${id}`);
    
    if(isCompleted){
        container.append(
            createUndoButton(id),
            createTrashButton(id)
        );
    } else {
        container.append(
            createCheckButton(id)
        );
    }

    return container;
}


function createUndoButton(todoId) {
    return createButton("undo-button", function(){
        undoTaskFromCompleted(todoId);
    });
}

function createTrashButton(todoId) {
    return createButton("trash-button", function(){
        removeTaskFromCompleted(todoId);
    });
}

function createCheckButton(todoId) {
    return createButton("check-button", function(){
        addTaskToCompleted(todoId);
    });
}

function createButton(buttonTypeClass /* string */, eventListener /* callback function */) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}


function addTodo() {
    const textTodo = document.getElementById("title").value;
    const timestamp = document.getElementById("date").value;

    const generatedID = generateId();
    const todoObject = generateTodoObject(generatedID, textTodo, timestamp, false)
    todo.push(todoObject)
    
    document.dispatchEvent(new Event(RENDER_EVENT))
}

function addTaskToCompleted(todoId /* HTMLELement */) {

    const todoTarget = findTodo(todoId);
    if(todoTarget == null) return;

    todoTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
}

function removeTaskFromCompleted(todoId /* HTMLELement */) {
    const todoTarget = findTodoIndex(todoId);
    if(todoTarget === -1) return;
    todo.splice(todoTarget, 1);
    
    document.dispatchEvent(new Event(RENDER_EVENT));
}

function undoTaskFromCompleted(todoId /* HTMLELement */){

    const todoTarget = findTodo(todoId);
    if(todoTarget == null) return;

    todoTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
}