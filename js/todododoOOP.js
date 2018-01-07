function Todo () {
    // empty
}

Todo.prototype.addToDo = function (value, id) {
    var record = {
        id: id,
        text: value,
        done: false
    }
    if (localStorage.getItem('toDos') === null) {
        var toDos = [];
        toDos.push(record);
        localStorage.setItem('toDos', JSON.stringify(toDos));
    }
    else {
        var toDos = JSON.parse(localStorage.getItem('toDos'));
        toDos.push(record);
        localStorage.setItem('toDos', JSON.stringify(toDos));
    }

    document.getElementById('addInput').value = '';
    this.fetchToDo();
}

Todo.prototype.fetchToDo = function () {
    if (localStorage.getItem('toDos') !== null) {
        var toDos = JSON.parse(localStorage.getItem('toDos'));
        var toDoList = document.getElementById('listTodo');
        var doneList = document.getElementById('listDone');
        toDoList.innerHTML = '';
        doneList.innerHTML = '';
        for (var i = toDos.length-1; i >= 0 ; i--) {
            if (!toDos[i].done) {
                toDoList.innerHTML += '<li id="li' + toDos[i].id + '">' +
                    '<div class="button-done"><button onclick="objToDo.doneToDo(' + toDos[i].id + ')"><i class="fa fa-check-circle-o" aria-hidden="true"></i></button></div>' +
                    '<div class="text">' + toDos[i].text + '</div>' +
                    '<div class="button-delete"><button onclick="objToDo.deleteToDo(' + toDos[i].id + ')"><i class="fa fa-trash" aria-hidden="true"></i></button></div>' +
                    '</li>';
            }
            else {
                doneList.innerHTML += '<li id="li' + toDos[i].id + '">' +
                    '<div class="button-undone"><button onclick="objToDo.undoneToDo(' + toDos[i].id + ')"><i class="fa fa-check-circle" aria-hidden="true"></i></button></div>' +
                    '<div class="text-done">' + toDos[i].text + '</div>' +
                    '<div class="button-delete"><button onclick="objToDo.deleteToDo(' + toDos[i].id + ')"><i class="fa fa-trash" aria-hidden="true"></i></button></div>' +
                    '</li>';
            }
        }// end of for
    }
}

Todo.prototype.deleteToDo = function (id) {
    var toDos = JSON.parse(localStorage.getItem('toDos'));
    for (var i = 0; i < toDos.length; i++) {
        if (toDos[i].id == id) {
            toDos.splice(i, 1);
        }
    }
    localStorage.setItem('toDos', JSON.stringify(toDos));
    this.fetchToDo();
}

Todo.prototype.doneToDo = function (id) {
    var toDos = JSON.parse(localStorage.getItem('toDos'));
    for (var i = 0; i < toDos.length; i++) {
        if (toDos[i].id == id) {
            toDos[i].done = true;
        }
    }
    localStorage.setItem('toDos', JSON.stringify(toDos));
    this.fetchToDo();
}

Todo.prototype.undoneToDo = function (id) {
    var toDos = JSON.parse(localStorage.getItem('toDos'));
    for (var i = 0; i < toDos.length; i++) {
        if (toDos[i].id == id) {
            toDos[i].done = false;
        }
    }
    localStorage.setItem('toDos', JSON.stringify(toDos));
    this.fetchToDo();
}


/*--- Run this crap ---*/


var objToDo = new Todo();

objToDo.fetchToDo();

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
        objToDo.addToDo(value, id);
        id++;
        localStorage.setItem('autoIncId', id);
    }
});

document.getElementById('addInput').addEventListener('keydown', function (e) {
    var value = this.value;
    if (e.code === 'Enter' && value) {
        var id = parseInt(localStorage.getItem('autoIncId'));
        objToDo.addToDo(value, id);
        id++;
        localStorage.setItem('autoIncId', id);
    }
});
