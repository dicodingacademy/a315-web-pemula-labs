document.addEventListener("DOMContentLoaded", function () {

    const submitForm /* HTMLFormElement */ = document.getElementById("form");

    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addTodo();
    });

    if(isStorageExist()){
        loadDataFromStorage();
    }
});

document.addEventListener(SAVED_EVENT, () => {
    console.log("Data berhasil di simpan.");
});

document.addEventListener(RENDER_EVENT, function () {
    const uncompletedTODOList = document.getElementById("todos");
    const listCompleted = document.getElementById("completed-todos");

    // clearing list item
    uncompletedTODOList.innerHTML = ""
    listCompleted.innerHTML = ""

    for(todoItem of todos){
        const todoElement = makeTodo(todoItem);
        if(todoItem.isCompleted){
            listCompleted.append(todoElement);
        } else {
            uncompletedTODOList.append(todoElement);
        }
    }
})
