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
 const SAVED_EVENT = "saved-todo";
 const STORAGE_KEY = "TODO_APPS";
 
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
    if(isStorageExist()){
        const parsed /* string */ = JSON.stringify(todos);
        localStorage.setItem(STORAGE_KEY, parsed);
        document.dispatchEvent(new Event(SAVED_EVENT));
        
    }
}

/**
 * Fungsi ini digunakan untuk memuat data dari localStorage
 * Dan memasukkan data hasil parsing ke variabel {@see todos}
 */
function loadDataFromStorage() {
    const serializedData /* string */ = localStorage.getItem(STORAGE_KEY);
    
    let data = JSON.parse(serializedData);
    
    if(data !== null){
        for(todo of data){
            todos.push(todo);
        }
    }

    document.dispatchEvent(new Event(RENDER_EVENT));
}