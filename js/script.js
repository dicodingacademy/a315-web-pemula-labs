
/**
 * Variabel konstan ini digunakan untuk menyediakan value
 * yang dipakai untuk mengakses object storage (localstorage)
 * pada browser. 
 */
 const STORAGE_KEY = "TODO_APPS";

 /**
  * Variabel ini menyediakan referensi element 
  * @var todoListElement referensi dari container yang menampung beberapa element todo
  * @var completedTodosElement referensi dari container yang menampung beberapa todo yang sudah selesai.
  */
 let todoListElement /* HTMLDivElement */ = null;
 let completedTodosElement /* HTMLDivElement */ = null;
 
 
 
 /**
  * Variabel yang digunakan untuk menampung beberapa elemen TODO.
  * Berikut adalah blueprint dari setiap item TODO:
  * 
  *  [
  *      {
  *          "id"         : "<integer>"
  *          "task"       : "<string>",
  *          "isCompleted": "<boolean>"
  *      }
  *  ] 
  * 
  */
 let todos /* array of object */ = [];
 
 /**
  * Variabel yang digunakan untuk memastikan dukungan operasi localStorage
  * Menyimpan nilai boolean yang diperoleh dari fungsi {@function isStorageExist()}
  */
 let storageExist /* boolean */ = isStorageExist(); 
 
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
         const taskContent /* string */ = inputTaskElement.value;
         addTaskToListTodo(taskContent);
     });
 
     /**
      * Memuat data TODO dari localStorage apabila browser 
      * telah mempunyai dukungan terhadap localStorage.
      */
     if(storageExist){
         loadDataFromStorage();
     }
 });
 
 /**
  * Menangkap event setelah data sukses disimpan ke localStorage.
  *  
  */
 document.addEventListener("ondatasaved", () => {
     console.log("Data berhasil di simpan.");
 });
 
 /**
  * Menangkap event setelah data TODO berhasil dimuat ke variabel {@see todos}
  * Dengan memanggil fungsi refresh.
  */
 document.addEventListener("ondataloaded", () => {
     refreshDataFromTodos();
 });
 
 
 function makeTodo(data /* string */) {
 
     /**
      * Inisiasi dari element teks dengan data
      * yang diperoleh dari input elemen sebelumnya.
      */
     const textElement /* HTMLHeadingElement */ = document.createElement("h2");
     textElement.innerText = data;
     
     /**
      * Menambah onclick pada elemen teks dari todo supaya
      * memanggil (dispatch) event onclick pada container.
      * 
      * Sehingga, apabila diklik pada area teks, akan trigger
      * onclick ke containernya
      */
     textElement.addEventListener("click", (e) => {
         const containerElement /* HTMLDivElement */ = e.target.parentElement
         containerElement.dispatchEvent(new Event("click"));
     })
 
     /**
      * Inisiasi dari elemen container yang menampung teks dari todo.
      * Dengan beberapa styling yang sudah diterapkan di CSS.
      */
     const container /* HTMLHeadingElement */ = document.createElement("div");
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
 
     const composedTodo = composeTodo(taskContent);
     todos.push(composedTodo);
     todoElement['itemId'] = parseInt(composedTodo.id);
 
     todoListElement.append(todoElement);
     update();
 }
 
 /**
  * Menambahkan task todo ke daftar completed.
  * 
  * @param {HTMLElement} task 
  */
 function addTaskToCompletedList(task /* HTMLElemet */){
     completedTodosElement.append(task);
 
     /**
      * Tandai pada item TODO bahwa item tersebut sudah selesai
      * Dengan set true pada property isCompleted
      * Kemudian trigger fungsi update().
      */
     const itemId = parseInt(task.itemId);
     todos.find((todo) => todo.id === itemId).isCompleted = true;
     update();
 }
 
 /**
  * Menghapus task dari list
  * 
  * @param {HTMLElement} taskElement 
  */
 function removeTask(taskElement /* HTMLElement */){
 
     /**
      * Jika berasal dari daftar completedTodos
      * maka temukan data TODO berdasarkan id yang didapat dari 
      * property itemID. Kemudian, hapus elemen tersebut berdasarkan ID
      * dengan menggunakan fungsi splice. Finally, trigger update()
      */
     if(taskElement.parentElement === completedTodosElement){
         const pos = todos.findIndex((todo) => todo.id === taskElement.itemId);
         todos.splice(pos, 1);
         update();
     }
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
 
 /**
  * Trigger update ke localStorage dengan menyimpan perubahan pada data TODO
  */
 function update() {
     if(storageExist)
         saveData();
 }
 
 /**
  * Membuat object TODO baru dan mengembalikannyta via return 
  * 
  * @param {String} taskContent 
  * @returns object of TODO defined in {@see todos}
  */
 function composeTodo(taskContent) {
     const idIndex = todos.length + 1;
     return {
         id: idIndex,
         task: taskContent,
         isCompleted: false
     }
 }
 
 /**
  * Refresh data TODO yang ditampilkan di layar 
  * Ini wajib dilakukan setelah melakukan load data dari localStorage
  */
 function refreshDataFromTodos() {
     todos.forEach((todo) => {
         const makedTodo /* HTLMLElement */ = makeTodo(todo.task);
         makedTodo['itemId'] = todo.id;
         setTodoOnClick(makedTodo);
 
         if(todo.isCompleted){
             completedTodosElement.append(makedTodo);
         } else {
             todoListElement.append(makedTodo);
         }
     })
 }
 
 /** --------------- WEB STORAGE ------------------ */
 
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
     
     let data = [];
     if(serializedData || serializedData === ""){
         data = JSON.parse(serializedData);
     } 
     todos = data;
     document.dispatchEvent(new Event("ondataloaded"));
 }
 