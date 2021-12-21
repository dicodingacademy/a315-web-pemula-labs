function makeTodo(todoObject) {

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

        const undoButton = document.createElement("button");
        undoButton.classList.add("undo-button");
        undoButton.addEventListener("click", function () {
            undoTaskFromCompleted(id);
        });

        const trashButton = document.createElement("button");
        trashButton.classList.add("trash-button");
        trashButton.addEventListener("click", function () {
            removeTaskFromCompleted(id);
        });

        container.append(undoButton, trashButton);
    } else {

        const checkButton = document.createElement("button");
        checkButton.classList.add("check-button");
        checkButton.addEventListener("click", function () {
            addTaskToCompleted(id);
        });

        container.append(checkButton);
    }

    return container;
}

function addTodo() {
    const textTodo = document.getElementById("title").value;
    const timestamp = document.getElementById("date").value;

    const generatedID = generateId();
    const todoObject = generateTodoObject(generatedID, textTodo, timestamp, false);
    todos.push(todoObject);
    
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function addTaskToCompleted(todoId /* HTMLELement */) {

    const todoTarget = findTodo(todoId);
    if(todoTarget == null) return;

    todoTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function removeTaskFromCompleted(todoId /* HTMLELement */) {
    const todoTarget = findTodoIndex(todoId);
    if(todoTarget === -1) return;
    todos.splice(todoTarget, 1);
    
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function undoTaskFromCompleted(todoId /* HTMLELement */){

    const todoTarget = findTodo(todoId);
    if(todoTarget == null) return;

    todoTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}