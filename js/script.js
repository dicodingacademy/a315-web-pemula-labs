/**
 * Variabel ini menyediakan referensi element 
 * @var todoListElement referensi dari container yang menampung beberapa element todo
 * @var completedTodosElement referensi dari container yang menampung beberapa todo yang sudah selesai.
 */
let todoListElement /* HTMLDivElement */ = null;
let completedTodosElement /* HTMLDivElement */ = null;

/**
 * Agar lebih safe, maka baiknya jalankan kode javascript setelah semua
 * elemen dimuat atau dirender oleh browser di mana akan trigger event yang bisa dimanfaatkan.
 */
document.addEventListener("DOMContentLoaded", () => {

    /**
     * Inisiasi variabel {@see todoListElement} dan {@see completedTodosElement} 
     * Dengan mengambil referensi elemen dari querySelector()
     */
    todoListElement = document.querySelector("#todolist");
    completedTodosElement = document.querySelector("#completed");

    /**
     * Inisiasi variabel {@see inputTaskElement} dan {@see submitBtnElement} 
     * Dengan mengambil referensi elemen dari querySelector()
     */
    const inputTaskElement /* HTMLInputElement */ = document.querySelector(".form #title");
    const submitBtnElement /* HtmlInputElement */ = document.querySelector(".form > .btn-submit");
    
    /**
     * Menambahkan event onclick pada tombol submit
     * Supaya dapat menambahkan task baru ke {@see todoListElement}
     */
    submitBtnElement.addEventListener("click", () => {
        const taskContent /* string */= inputTaskElement.value;
        addTaskToListTodo(taskContent);
    });
});

function makeTodo(data /* string */) {

    /**
     * Inisiasi dari element teks dengan data
     * yang diperoleh dari input elemen sebelumnya.
     */
    const textElement = document.createElement("h2");
    textElement.innerText = data;
    
    /**
     * Menambah onclick pada elemen teks dari todo supaya
     * memanggil (dispatch) event onclick pada container.
     * 
     * Sehingga, apabila diklik pada area teks, akan trigger
     * onclick ke containernya
     */
    textElement.addEventListener("click", (e) => {
        const containerElement = e.target.parentElement
        containerElement.dispatchEvent(new Event("click"));
    })

    /**
     * Inisiasi dari elemen container yang menampung teks dari todo.
     * Dengan beberapa styling yang sudah diterapkan di CSS.
     */
    const container = document.createElement("div");
    container.append(textElement);
    container.classList.add('item', 'shadow');

    return container;
}

/**
 * Menambahkan event onclick pada element todo 
 * 
 * @param {HTMLElement} todoElement 
 */
function setTodoOnClick(todoElement /* HTMLElement */){
    todoElement.addEventListener("click", (e) => {
        onTodoClick(e.target);
    });
}

/**
 * Menambahkan task todo berdasarkan judul task 
 * yang berasal dari parameter {@see taskContent}
 * 
 * @param {String} taskContent 
 */
function addTaskToListTodo(taskContent /* string */) {
    const todoElement = makeTodo(taskContent);
    setTodoOnClick(todoElement);

    todoListElement.append(todoElement)
}

/**
 * Menambahkan task todo ke daftar completed.
 * 
 * @param {HTMLElement} task 
 */
function addTaskToCompletedList(task /* HTMLElemet */){
    completedTodosElement.append(task);
}

/**
 * Menghapus task dari list
 * 
 * @param {HTMLElement} taskElement 
 */
function removeTask(taskElement /* HTMLElement */){
    taskElement.remove();
}

/**
 * Menerapkan handler dari event onclick pada setiap elemen todo.
 * 
 * @param {HTMLElement} taskElement 
 */
function onTodoClick(taskElement /* HTMLElement */) {
    const parentElement /* HTMLDivElement */ = taskElement.parentElement;

    /**
     * Memeriksa lokasi dari elemen todo apakah berada di daftar todo atau di completed.
     * Jika :
     *      Di daftar TODO -> pindah elemen TODO ke daftar completed
     *      Di daftar completed -> Tampilkan dialog konfirmasi, jika {@code true},
     *                             maka akan menghapus todo tersebut dari list dan
     *                             menampilkan dialog alert "Sudah selesai!"
     */
    if(parentElement === todoListElement){

        removeTask(taskElement);
        addTaskToCompletedList(taskElement);

    } else if(parentElement === completedTodosElement){
        
        const taskText /* string */     = taskElement.children[0].innerText;
        let resultConfirm /* boolean */ = confirm(`Apakah kamu yakin untuk menghapus task "${taskText}" ?`);
        
        /**
         * Cek kondisi, apabila benar. maka akan menjalankan tugas yang telah 
         * di definisikan pada dokumentasi sebelumnya.
         */
        if(resultConfirm){
            removeTask(taskElement);
            alert(`Task "${taskText}" sudah selesai!`);
        }
            
    }
}

