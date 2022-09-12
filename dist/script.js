const list = document.querySelector('.task__container');
const form = document.querySelector('.input__box');
const input = document.querySelector('.input');
const addTaskButton = document.querySelector('.submit__btn');
const infoBox = document.querySelector('.info__box');
const tasks = loadTasks();
let id = 0;
const addTask = () => {
    if (input.value != '') {
        const newTask = {
            id: id,
            title: input.value,
            completed: false,
        };
        tasks.push(newTask);
        input.value = '';
        id++;
        createTaskElement(newTask);
    }
};
const createTaskElement = (task) => {
    const taskBox = document.createElement('li');
    const taskTitle = document.createElement('p');
    const taskCheckbox = document.createElement('input');
    const taskDeleteBtn = document.createElement('button');
    const taskDeleteBtnImg = document.createElement('img');
    taskBox.classList.add('box', 'task__box');
    taskTitle.classList.add('task__name');
    taskCheckbox.classList.add('box__left');
    taskDeleteBtn.classList.add('delete__button');
    taskDeleteBtnImg.setAttribute('src', './img/icon-cross.svg');
    taskTitle.textContent = task.title;
    taskCheckbox.type = 'checkbox';
    list.prepend(taskBox);
    taskBox.append(taskCheckbox, taskTitle, taskDeleteBtn);
    taskDeleteBtn.append(taskDeleteBtnImg);
    showInfoBox();
    deleteTask();
};
const showInfoBox = () => {
    infoBox.classList.add('display-flex');
    itemLeftUptade();
};
const itemLeftUptade = () => {
    const infoTxt = document.querySelector('.left__info');
    infoTxt.textContent = `${id} items left`;
};
function deleteTask() {
    const deleteButtons = document.querySelectorAll('.delete__button');
    deleteButtons.forEach((btn) => {
        btn.addEventListener('click', deleteBox);
    });
}
const deleteBox = (e) => {
    console.log(e.target);
    e.target.parentElement.parentElement.remove();
    id = id - 1;
    console.log('sss');
    itemLeftUptade();
    if (id === 0) {
        infoBox.classList.remove('display-flex');
    }
};
addTaskButton.addEventListener('click', addTask);
function loadTasks() {
    const taskJSON = localStorage.getItem('TASKS');
    if (taskJSON == null)
        return [];
    return JSON.parse(taskJSON);
}
