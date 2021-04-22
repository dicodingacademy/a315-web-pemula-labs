document.addEventListener("DOMContentLoaded", function () {

    const submitForm /* HTMLFormElement */ = document.getElementById("form");

    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let uncompletedTODOList = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
        let textTodo = document.getElementById("title").value;
        let timestamp = document.getElementById("date").value;
        let todo = makeTodo(textTodo, timestamp, false);

        uncompletedTODOList.append(todo);
    });
});


