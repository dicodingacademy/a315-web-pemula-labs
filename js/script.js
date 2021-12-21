document.addEventListener("DOMContentLoaded", function () {

    const submitForm /* HTMLFormElement */ = document.getElementById("form");

    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addTodo();
    });
});


document.addEventListener(RENDER_EVENT, function () {
    const uncompletedTODOList = document.getElementById("todos");
    const listCompleted = document.getElementById("completed-todos");

    // clearing list item
    uncompletedTODOList.innerHTML = ""
    listCompleted.innerHTML = ""

    for(todoItem of todo){
        const todoElement = makeTodo(todoItem);
        if(todoItem.isCompleted){
            listCompleted.append(todoElement);
        } else {
            uncompletedTODOList.append(todoElement);
        }
    }
})
