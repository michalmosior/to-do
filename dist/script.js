const list = document.querySelector('.task__container');
const form = document.querySelector('.input__box');
const input = document.querySelector('.input');
const addTaskButton = document.querySelector('.submit__btn');
const infoBox = document.querySelector('.info__box');
const statusBtns = document.querySelectorAll('.status__btn');
const clearCompletedBtn = document.querySelector('.clear-completed__btn');
const themeButton = document.querySelector('.header__button');
let tasks = loadTasks();
let id = 0;
let size;
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
    taskTitle.textContent = task.title;
    taskCheckbox.classList.add('box__left');
    taskCheckbox.type = 'checkbox';
    taskDeleteBtn.classList.add('delete__button');
    taskDeleteBtnImg.setAttribute('src', './img/icon-cross.svg');
    list.prepend(taskBox);
    taskBox.append(taskCheckbox, taskTitle, taskDeleteBtn);
    taskDeleteBtn.append(taskDeleteBtnImg);
    showInfoBox();
    checkCompleted(task, taskCheckbox, taskTitle);
    deleteTask(taskBox, taskTitle, taskDeleteBtn);
    handleStatusButtons(task, taskBox);
    clearCompleted(taskTitle);
};
const showInfoBox = () => {
    infoBox.classList.add('display-flex');
    itemLeftUptade();
};
const itemLeftUptade = () => {
    const infoTxt = document.querySelector('.left__info');
    if (tasks.length.toString() === '0') {
        infoBox.classList.remove('display-flex');
    }
    infoTxt.textContent = `${tasks.length.toString()} items left`;
};
const checkCompleted = (task, taskCheckbox, taskTitle) => {
    taskCheckbox.addEventListener('change', () => {
        task.completed = taskCheckbox.checked;
        taskTitle.classList.toggle('completed');
    });
};
const handleStatusButtons = (task, taskBox) => {
    const allBtn = document.querySelector('.all__btn');
    const activeBtn = document.querySelector('.active__btn');
    const completedBtn = document.querySelector('.completed__btn');
    allBtn.addEventListener('click', () => {
        taskBox.classList.contains('display-none')
            ? taskBox.classList.remove('display-none')
            : null;
    });
    activeBtn.addEventListener('click', () => {
        task.completed === true
            ? taskBox.classList.add('display-none')
            : taskBox.classList.remove('display-none');
    });
    completedBtn.addEventListener('click', () => {
        task.completed === false
            ? taskBox.classList.add('display-none')
            : taskBox.classList.remove('display-none');
    });
};
function deleteTask(taskBox, taskTitle, taskDeleteBtn) {
    taskDeleteBtn.addEventListener('click', () => {
        const taskName = taskTitle.textContent;
        taskBox.remove();
        tasks = tasks.filter((task) => task.title != taskName);
        itemLeftUptade();
    });
}
const changeStatusDisplayed = (e) => {
    statusBtns.forEach((statusBtn) => {
        statusBtn.classList.contains('status-active')
            ? statusBtn.classList.remove('status-active')
            : null;
    });
    e.target.classList.add('status-active');
};
const clearCompleted = (taskTitle) => {
    clearCompletedBtn.addEventListener('click', () => {
        if (taskTitle.classList.contains('completed')) {
            const taskName = taskTitle.textContent;
            tasks = tasks.filter((task) => task.title != taskName);
            taskTitle.parentElement.remove();
            itemLeftUptade();
        }
    });
};
const changeTheme = () => {
    const root = document.documentElement;
    const moonIco = document.querySelector('.moon-ico');
    const sunIco = document.querySelector('.sun-ico');
    const header = document.querySelector('.header');
    let size;
    moonIco.classList.toggle('display-block');
    moonIco.classList.toggle('display-none');
    sunIco.classList.toggle('display-none');
    const changeHeaderBackground = (ico) => {
        const width = window.innerWidth;
        if (width > 768) {
            size = 'desktop';
            console.log(size);
            console.log(ico);
        }
        else {
            size = 'mobile';
            console.log(size);
            console.log(ico);
        }
    };
    changeHeaderBackground(sunIco);
    const nightThemeBackground = `url('./img/bg-${size}-dark.jpg')`;
    const dayThemeBackground = `url('./img/bg-${size}-light.jpg')`;
    if (sunIco.classList.contains('display-none')) {
        header.style.backgroundImage = dayThemeBackground;
        root.style.setProperty('--backgroundColor', 'hsl(236, 33%, 92%)');
        root.style.setProperty('--taskBoxBackgroundColor', 'hsl(0, 0%, 98%)');
    }
    else if (moonIco.classList.contains('display-none')) {
        header.style.backgroundImage = nightThemeBackground;
        root.style.setProperty('--backgroundColor', 'hsl(235, 21%, 11%)');
        root.style.setProperty('--taskBoxBackgroundColor', 'hsl(235, 24%, 19%)');
    }
};
addTaskButton.addEventListener('click', addTask);
window.addEventListener('keyup', function (e) {
    e.key === 'Enter' ? addTask() : null;
});
statusBtns.forEach((statusBtn) => {
    statusBtn.addEventListener('click', changeStatusDisplayed);
});
themeButton.addEventListener('click', changeTheme);
function loadTasks() {
    const taskJSON = localStorage.getItem('tasks');
    if (taskJSON == null)
        return [];
    return JSON.parse(taskJSON);
}
