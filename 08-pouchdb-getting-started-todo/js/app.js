(function() {

  'use strict';

  // Agregamos la instrucción para validar e instalar el SW 
  if ( navigator.serviceWorker ){

    navigator.serviceWorker.register('/sw.js');

  }

  var ENTER_KEY = 13;
  var newTodoDom = document.getElementById('new-todo');
  var syncDom = document.getElementById('sync-wrapper');

  // EDITING STARTS HERE (you dont need to edit anything above this line)

  // Creamos la base de datos
  var db = new PouchDB('todos');
  var remoteCouch = false;

  // El siguiente codigo permite acualizar el UI luego de insrtar en la DB
  db.changes({
    since: 'now',
    live: true
  }).on('change', showTodos);

  // We have to create a new todo document and enter it in the database
  // Escribir en la base de datos
  function addTodo(text) {

    // Validamos para no insertar registros vacios en la DB
    if ( text.length <= 0 ) return;

    var todo = {
      _id: new Date().toISOString(),
      title: text,
      completed: false
    };
    // Inserción con callback
    /*
    db.put(todo, function callback(err, result) {
      if (!err) {
        console.log('Successfully posted a todo!');
      }
    });
    */
   // Inserción con promesa
   db.put( todo )
      .then( console.log('Insertado!!!...') )
              .catch( console.log )

  }

  // Show the current list of todos by reading them from the database
  // Obtener todos los documentos
  function showTodos() {

    // Código mostrado en el tutorial usando callbacks
    /*
    db.allDocs({include_docs: true, descending: true}, function(err, doc) {
      redrawTodosUI(doc.rows);
    });
    */

    // Ahora vamos a codificar para realizar con promesas
    db.allDocs( { include_docs: true, descending: false} )
      .then(doc => {
        console.log(doc);
        redrawTodosUI(doc.rows)
      });

  }

  // Actualizar un registro en la base de  cuando marcamos un check
  function checkboxChanged(todo, event) {

    console.log( todo );
    console.log( event );

    todo.completed = event.target.checked;
    db.put(todo).then(console.log('Registro Actualizado!!!...'));

  }

  // User pressed the delete button for a todo, delete it
  // Borrar registro
  function deleteButtonPressed(todo) {
    db.remove(todo);
  }

  // The input box when editing a todo has blurred, we should save
  // the new title or delete the todo if the title is empty
  // Acutalizar el todo, para ello se hace doble click en el item y cuando termine de editarlo y le de enter
  // por ejemplo nos va a actualizar el registro
  function todoBlurred(todo, event) {

    console.log('Entro en la fucnión');

    var trimmedText = event.target.value.trim(); // Verifica que haya información dentro del campo de texto
    if (!trimmedText) {
      // Si no hay campo lo borra
      db.remove(todo);
    } else {
      // Caso contrario actualiza el titulo y manda el put a la DB
      todo.title = trimmedText;
      db.put(todo);
    }

  }

  // Initialise a sync with the remote server
  function sync() {
  }

  // EDITING STARTS HERE (you dont need to edit anything below this line)

  // There was some form or error syncing
  function syncError() {
    syncDom.setAttribute('data-sync-state', 'error');
  }

  // User has double clicked a todo, display an input so they can edit the title
  function todoDblClicked(todo) {
    var div = document.getElementById('li_' + todo._id);
    var inputEditTodo = document.getElementById('input_' + todo._id);
    div.className = 'editing';
    inputEditTodo.focus();
  }

  // If they press enter while editing an entry, blur it to trigger save
  // (or delete)
  function todoKeyPressed(todo, event) {
    if (event.keyCode === ENTER_KEY) {
      var inputEditTodo = document.getElementById('input_' + todo._id);
      inputEditTodo.blur();
    }
  }

  // Given an object representing a todo, this will create a list item
  // to display it.
  function createTodoListItem(todo) {
    var checkbox = document.createElement('input');
    checkbox.className = 'toggle';
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', checkboxChanged.bind(this, todo));

    var label = document.createElement('label');
    label.appendChild( document.createTextNode(todo.title));
    label.addEventListener('dblclick', todoDblClicked.bind(this, todo));

    var deleteLink = document.createElement('button');
    deleteLink.className = 'destroy';
    deleteLink.addEventListener( 'click', deleteButtonPressed.bind(this, todo));

    var divDisplay = document.createElement('div');
    divDisplay.className = 'view';
    divDisplay.appendChild(checkbox);
    divDisplay.appendChild(label);
    divDisplay.appendChild(deleteLink);

    var inputEditTodo = document.createElement('input');
    inputEditTodo.id = 'input_' + todo._id;
    inputEditTodo.className = 'edit';
    inputEditTodo.value = todo.title;
    inputEditTodo.addEventListener('keypress', todoKeyPressed.bind(this, todo));
    inputEditTodo.addEventListener('blur', todoBlurred.bind(this, todo));

    var li = document.createElement('li');
    li.id = 'li_' + todo._id;
    li.appendChild(divDisplay);
    li.appendChild(inputEditTodo);

    if (todo.completed) {
      li.className += 'complete';
      checkbox.checked = true;
    }

    return li;
  }

  function redrawTodosUI(todos) {
    var ul = document.getElementById('todo-list');
    ul.innerHTML = '';
    todos.forEach(function(todo) {
      ul.appendChild(createTodoListItem(todo.doc));
    });
  }

  function newTodoKeyPressHandler( event ) {
    if (event.keyCode === ENTER_KEY) {
      addTodo(newTodoDom.value);
      newTodoDom.value = '';
    }
  }

  function addEventListeners() {
    newTodoDom.addEventListener('keypress', newTodoKeyPressHandler, false);
  }

  addEventListeners();
  showTodos();

  if (remoteCouch) {
    sync();
  }

})();
