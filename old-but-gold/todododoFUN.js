/* First version of script. Procedural programming. Clean, easy to understand, simply great! :) */

fetchToDos();


if (localStorage.getItem('autoIncId') === null) {
    localStorage.setItem('autoIncId', 1);
}
if (localStorage.getItem('toDos') === '[]') {
    localStorage.setItem('autoIncId', 1);
}


document.getElementById('addButton').addEventListener('click', function () {
    var value = document.getElementById('addInput').value;
    if (value) {
        var id = parseInt(localStorage.getItem('autoIncId'));
        addTodo(value, id);
        id++;
        localStorage.setItem('autoIncId', id);
    }
});

document.getElementById('addInput').addEventListener('keydown', function (e) {
    var value = this.value;
    if (e.code === 'Enter' && value) {
        var id = parseInt(localStorage.getItem('autoIncId'));
        addTodo(value, id);
        id++;
        localStorage.setItem('autoIncId', id);
    }
});


function addTodo(value, id) {
    var toDo = {
        id: id,
        text: value,
        done: false
    }
    if (localStorage.getItem('toDos') === null) {
        var toDos = [];
        toDos.push(toDo);
        localStorage.setItem('toDos', JSON.stringify(toDos));
    }
    else {
        var toDos = JSON.parse(localStorage.getItem('toDos'));
        toDos.push(toDo);
        localStorage.setItem('toDos', JSON.stringify(toDos));
    }

    document.getElementById('addInput').value = '';
    fetchToDos();
}

function fetchToDos() {
    if (localStorage.getItem('toDos') !== null) {
        var toDos = JSON.parse(localStorage.getItem('toDos'));
        var toDoList = document.getElementById('listTodo');
        var doneList = document.getElementById('listDone');
        toDoList.innerHTML = '';
        doneList.innerHTML = '';
        for (var i = toDos.length-1; i >= 0 ; i--) {
            if (!toDos[i].done) {
                toDoList.innerHTML += '<li id="li' + toDos[i].id + '">' +
                    '<div class="button-done"><button onclick="doneToDo(' + toDos[i].id + ')"><i class="fa fa-check-circle-o" aria-hidden="true"></i></button></div>' +
                    '<div class="text">' + toDos[i].text + '</div>' +
                    '<div class="button-delete"><button onclick="deleteToDo(' + toDos[i].id + ')"><i class="fa fa-trash" aria-hidden="true"></i></button></div>' +
                    '</li>';
            }
            else {
                doneList.innerHTML += '<li id="li' + toDos[i].id + '">' +
                    '<div class="button-undone"><button onclick="undoneToDo(' + toDos[i].id + ')"><i class="fa fa-check-circle" aria-hidden="true"></i></button></div>' +
                    '<div class="text-done">' + toDos[i].text + '</div>' +
                    '<div class="button-delete"><button onclick="deleteToDo(' + toDos[i].id + ')"><i class="fa fa-trash" aria-hidden="true"></i></button></div>' +
                    '</li>';
            }
        }// end of for
    }
}

function deleteToDo(id) {
    var toDos = JSON.parse(localStorage.getItem('toDos'));
    for (var i = 0; i < toDos.length; i++) {
        if (toDos[i].id == id) {
            toDos.splice(i, 1);
        }
    }
    localStorage.setItem('toDos', JSON.stringify(toDos));
    fetchToDos();
}

function doneToDo(id) {
    var toDos = JSON.parse(localStorage.getItem('toDos'));
    for (var i = 0; i < toDos.length; i++) {
        if (toDos[i].id == id) {
            toDos[i].done = true;
        }
    }
    localStorage.setItem('toDos', JSON.stringify(toDos));
    fetchToDos();
}

function undoneToDo(id) {
    var toDos = JSON.parse(localStorage.getItem('toDos'));
    for (var i = 0; i < toDos.length; i++) {
        if (toDos[i].id == id) {
            toDos[i].done = false;
        }
    }
    localStorage.setItem('toDos', JSON.stringify(toDos));
    fetchToDos();
}