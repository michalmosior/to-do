type Task = {
	id: number;
	title: string;
	completed: boolean;
};

const list: HTMLUListElement = document.querySelector('.task__container');
const form: HTMLFormElement = document.querySelector('.input__box');
const input: HTMLInputElement = document.querySelector('.input');
const addTaskButton: HTMLButtonElement = document.querySelector('.submit__btn');
const infoBox: HTMLDivElement = document.querySelector('.info__box');
const statusBtns: NodeListOf<HTMLButtonElement> =
	document.querySelectorAll('.status__btn');
const clearCompletedBtn: HTMLButtonElement = document.querySelector(
	'.clear-completed__btn'
);
const themeButton: HTMLButtonElement =
	document.querySelector('.header__button');

let tasks: Task[] = loadTasks();
let id: number = 0;
let size: string;

const addTask = () => {
	if (input.value != '') {
		const newTask: Task = {
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

const createTaskElement = (task: Task) => {
	const taskBox: HTMLLIElement = document.createElement('li');
	const taskTitle: HTMLParagraphElement = document.createElement('p');
	const taskCheckbox: HTMLInputElement = document.createElement('input');
	const taskDeleteBtn: HTMLButtonElement = document.createElement('button');
	const taskDeleteBtnImg: HTMLImageElement = document.createElement('img');
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
	const infoTxt: HTMLParagraphElement = document.querySelector('.left__info');
	if (tasks.length.toString() === '0') {
		infoBox.classList.remove('display-flex');
	}
	infoTxt.textContent = `${tasks.length.toString()} items left`;
};

const checkCompleted = (
	task: Task,
	taskCheckbox: HTMLInputElement,
	taskTitle: HTMLParagraphElement
) => {
	taskCheckbox.addEventListener('change', () => {
		task.completed = taskCheckbox.checked;
		taskTitle.classList.toggle('completed');
	});
};

const handleStatusButtons = (task: Task, taskBox: HTMLLIElement) => {
	const allBtn: HTMLButtonElement = document.querySelector('.all__btn');
	const activeBtn: HTMLButtonElement = document.querySelector('.active__btn');
	const completedBtn: HTMLButtonElement =
		document.querySelector('.completed__btn');
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

function deleteTask(
	taskBox: HTMLLIElement,
	taskTitle: HTMLParagraphElement,
	taskDeleteBtn: HTMLButtonElement
) {
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

const clearCompleted = (taskTitle: HTMLParagraphElement) => {
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
	const moonIco: SVGElement = document.querySelector('.moon-ico');
	const sunIco: SVGElement = document.querySelector('.sun-ico');
	const header: HTMLHeadingElement = document.querySelector('.header');
	moonIco.classList.toggle('display-block');
	moonIco.classList.toggle('display-none');
	sunIco.classList.toggle('display-none');
	if (sunIco.classList.contains('display-none')) {
		root.style.setProperty('--backgroundColor', 'hsl(236, 33%, 92%)');
		root.style.setProperty('--taskBoxBackgroundColor', 'hsl(0, 0%, 98%)');
		header.classList.replace('dark-header', 'light-header');
	} else if (moonIco.classList.contains('display-none')) {
		root.style.setProperty('--backgroundColor', 'hsl(235, 21%, 11%)');
		root.style.setProperty('--taskBoxBackgroundColor', 'hsl(235, 24%, 19%)');
		header.classList.replace('light-header', 'dark-header');
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

function loadTasks(): Task[] {
	const taskJSON = localStorage.getItem('tasks');
	if (taskJSON == null) return [];
}
