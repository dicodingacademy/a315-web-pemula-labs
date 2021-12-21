/**
 * [
 *    {
 *      id: <int>
 *      task: <string>
 *      timestamp: <string>
 *      isCompleted: <boolean>
 *    }
 * ]
 */
const todos = [];
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
    for(todoItem of todos){
        if(todoItem.id === todoId){
            return todoItem
        }
    }
    return null
}

function findTodoIndex(todoId) {
    for(index in todos){
        if(todos[index].id === todoId){
            return index
        }
    }
    return -1
}
