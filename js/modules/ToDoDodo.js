var ToDoDodo = (function () {

    /* Global auto increment Id  */
    if (localStorage.getItem('autoIncId') === null) {localStorage.setItem('autoIncId', 1);}
    if (localStorage.getItem('toDos') === '[]') {localStorage.setItem('autoIncId', 1);}

    /* ToDoDodo class declaration */
    function ToDoDodo(selector) {
        this.container = document.querySelector(selector);

        this.init();
    }

    ToDoDodo.prototype.init = function () {
        this.container.innerHTML = '' +
            '<header>\n' +
            '    <div class="dodo-logo">\n' +
            '        <h3>TodoDodo</h3>\n' +
            '    </div>\n' +
            '    <div class="dodo-input wld_clear">\n' +
            '        <input id="addInput" type="text" placeholder="Do some stuff...">\n' +
            '        <button id="addButton"><i class="fa fa-plus-circle" aria-hidden="true"></i></button>\n' +
            '    </div>\n' +
            '</header>\n' +
            '\n' +
            '<div class="wrap">\n' +
            '    <section>\n' +
            '        <ul class="dodo-todo wld_clear" id="listTodo">\n' +
            '        </ul>\n' +
            '        <ul class="dodo-todo wld_clear" id="listDone">\n' +
            '        </ul>\n' +
            '    </section>\n' +
            '</div>\n' +
            '\n' +
            '<footer>\n' +
            '    <div>copyright &copy; 2017 TodoDodo</div>\n' +
            '</footer>';

        var self = this;
        document.getElementById('addButton').addEventListener('click', function () {
            var value = document.getElementById('addInput').value;
            if (value) {
                var id = parseInt(localStorage.getItem('autoIncId'));
                self.addToDo(value, id);
                id++;
                localStorage.setItem('autoIncId', id);
            }
        });
        document.getElementById('addInput').addEventListener('keydown', function (e) {
            var value = this.value;
            if (e.code === 'Enter' && value) {
                var id = parseInt(localStorage.getItem('autoIncId'));
                self.addToDo(value, id);
                id++;
                localStorage.setItem('autoIncId', id);
            }
        });
        this.renderToDoDodo();
    }

    ToDoDodo.prototype.renderToDoDodo = function () {
        if (localStorage.getItem('toDos') !== null) {
            var toDos = JSON.parse(localStorage.getItem('toDos'));
            var toDoList = document.getElementById('listTodo');
            var doneList = document.getElementById('listDone');
            toDoList.innerHTML = '';
            doneList.innerHTML = '';
            for (var i = toDos.length - 1; i >= 0; i--) {
                //var innerId = toDos[i].id; // something like inner index of array, I Don't Know why!!
                this.renderItem(toDoList, doneList, toDos[i]);
            }
        }
    }

    ToDoDodo.prototype.renderItem = function (toDoList, doneList, toDosElement) {
        var self = this;
        if (!toDosElement.done) {
            // render to-do items
            var liContainer = document.createElement('li');
            toDoList.appendChild(liContainer);

            var btnDoneContainer = document.createElement('div');
            btnDoneContainer.classList.add('button-done');
            liContainer.appendChild(btnDoneContainer);
            var btnDone = document.createElement('button');
            btnDone.innerHTML = '<i class="fa fa-check-circle-o" aria-hidden="true"></i>';
            btnDone.addEventListener('click', function () {
                self.doneToDo(toDosElement.id);
            });
            btnDoneContainer.appendChild(btnDone);

            var textContainer = document.createElement('div');
            textContainer.classList.add('text');
            textContainer.innerText = toDosElement.text;
            liContainer.appendChild(textContainer);

            var btnDeleteContainer = document.createElement('div');
            btnDeleteContainer.classList.add('button-delete');
            liContainer.appendChild(btnDeleteContainer);
            var btnDelete = document.createElement('button');
            btnDelete.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
            btnDelete.addEventListener('click', function () {
                self.deleteToDo(toDosElement.id);
                console.log(toDosElement.id);
            });
            btnDeleteContainer.appendChild(btnDelete);
        }
        else {
            // render done items
            var liContainer = document.createElement('li');
            doneList.appendChild(liContainer);

            var btnUnDoneContainer = document.createElement('div');
            btnUnDoneContainer.classList.add('button-undone');
            liContainer.appendChild(btnUnDoneContainer);
            var btnUnDone = document.createElement('button');
            btnUnDone.innerHTML = '<i class="fa fa-check-circle" aria-hidden="true"></i>';
            btnUnDone.addEventListener('click', function () {
                self.undoneToDo(toDosElement.id);
            });
            btnUnDoneContainer.appendChild(btnUnDone);

            var textContainer = document.createElement('div');
            textContainer.classList.add('text-done');
            textContainer.innerText = toDosElement.text;
            liContainer.appendChild(textContainer);

            var btnDeleteContainer = document.createElement('div');
            btnDeleteContainer.classList.add('button-delete');
            liContainer.appendChild(btnDeleteContainer);
            var btnDelete = document.createElement('button');
            btnDelete.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
            btnDelete.addEventListener('click', function () {
                self.deleteToDo(toDosElement.id);
            });
            btnDeleteContainer.appendChild(btnDelete);
        }
    }

    ToDoDodo.prototype.addToDo = function (value, id) {
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
        this.renderToDoDodo();
    }

    ToDoDodo.prototype.deleteToDo = function (id) {
        var toDos = JSON.parse(localStorage.getItem('toDos'));
        for (var i = 0; i < toDos.length; i++) {
            if (toDos[i].id == id) {
                toDos.splice(i, 1);
            }
        }
        localStorage.setItem('toDos', JSON.stringify(toDos));
        this.renderToDoDodo();
    }

    ToDoDodo.prototype.doneToDo = function (id) {
        var toDos = JSON.parse(localStorage.getItem('toDos'));
        for (var i = 0; i < toDos.length; i++) {
            if (toDos[i].id == id) {
                toDos[i].done = true;
            }
        }
        localStorage.setItem('toDos', JSON.stringify(toDos));
        this.renderToDoDodo();
    }

    ToDoDodo.prototype.undoneToDo = function (id) {
        var toDos = JSON.parse(localStorage.getItem('toDos'));
        for (var i = 0; i < toDos.length; i++) {
            if (toDos[i].id == id) {
                toDos[i].done = false;
            }
        }
        localStorage.setItem('toDos', JSON.stringify(toDos));
        this.renderToDoDodo();
    }

    return ToDoDodo
})()



