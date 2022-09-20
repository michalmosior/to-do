const list = document.querySelector('.task__container');
const form = document.querySelector('.input__box');
const input = document.querySelector('.input');
const addTaskButton = document.querySelector('.submit__btn');
const infoBox = document.querySelector('.info__box');
const statusBtns = document.querySelectorAll('.status__btn');
let tasks = loadTasks();
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
    taskBox.setAttribute('id', id.toString());
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
    checkCompleted(task, taskCheckbox, taskTitle);
    deleteTask(task, taskBox, taskTitle, taskDeleteBtn);
};
const showInfoBox = () => {
    infoBox.classList.add('display-flex');
    itemLeftUptade();
};
const itemLeftUptade = () => {
    const infoTxt = document.querySelector('.left__info');
    infoTxt.textContent = `${id} items left`;
};
const checkCompleted = (task, taskCheckbox, taskTitle) => {
    taskCheckbox.addEventListener('change', () => {
        task.completed = taskCheckbox.checked;
        taskTitle.classList.toggle('completed');
    });
};
const deleteTask = (task, taskBox, taskTitle, taskDeleteBtn) => {
    taskDeleteBtn.addEventListener('click', () => {
        const taskName = taskTitle.textContent;
        taskBox.remove();
        itemLeftUptade();
        console.log(task.title);
        console.log(task);
        tasks = tasks.filter((task) => task.title != taskName);
    });
};
const changeStatusDisplayed = (e) => {
    statusBtns.forEach((statusBtn) => {
        if (statusBtn.classList.contains('status-active')) {
            statusBtn.classList.remove('status-active');
        }
    });
    e.target.classList.add('status-active');
};
addTaskButton.addEventListener('click', addTask);
window.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});
statusBtns.forEach((statusBtn) => {
    statusBtn.addEventListener('click', changeStatusDisplayed);
});
function loadTasks() {
    const taskJSON = localStorage.getItem('TASKS');
    if (taskJSON == null)
        return [];
    return JSON.parse(taskJSON);
}
