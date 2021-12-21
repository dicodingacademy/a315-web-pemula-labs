const todo = [];
const RENDER_EVENT = "render-todo";

function generateId() {
    return +new Date();
}

function generateTodoObject(id, task, timestamp, isCompleted) {
    return {
        id,
        task,
        timestamp,
        isCompleted
    }
}

function findTodo(todoId){
    for(todoItem of todo){
        if(todoItem.id === todoId){
            return todoItem
        }
    }
    return null
}

function findTodoIndex(todoId) {
    for(index in todo){
        if(todo[index].id === todoId){
            return index
        }
    }
    return -1
}
