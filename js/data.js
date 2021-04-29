const STORAGE_KEY = "TODO_APPS";

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

let todos = [];

/**
  * Fungsi ini digunakan untuk memeriksa apakah localStorage didukung oleh browser atau tidak
  * 
  * @returns boolean 
  */
 function isStorageExist() /* boolean */ {
    if(typeof(Storage) === undefined){
        alert("Browser kamu tidak mendukung local storage");
        return false
    } 
    return true;
}

/**
 * Fungsi ini digunakan untuk menyimpan data ke localStorage
 * berdasarkan KEY yang sudah ditetapkan sebelumnya.
 */
function saveData() {
    const parsed /* string */ = JSON.stringify(todos);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

/**
 * Fungsi ini digunakan untuk memuat data dari localStorage
 * Dan memasukkan data hasil parsing ke variabel {@see todos}
 */
function loadDataFromStorage() {
    const serializedData /* string */ = localStorage.getItem(STORAGE_KEY);
    
    let data = JSON.parse(serializedData);
    
    if(data !== null)
        todos = data;

    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
    if(isStorageExist())
        saveData();
}

function composeTodoObject(task, timestamp, isCompleted) {
    return {
        id: +new Date(),
        task,
        timestamp,
        isCompleted
    };
}

function findTodo(todoId) {

    for(todo of todos){
        if(todo.id === todoId)
            return todo;
    }

    return null;
}

function findTodoIndex(todoId) {
    
    let index = 0
    for (todo of todos) {
        if(todo.id === todoId)
            return index;

        index++;
    }

    return -1;
}