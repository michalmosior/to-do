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

let tasks: Task[] = loadTasks();
let id: number = 0;

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
	handleStatusButtons(task, taskBox);
	clearCompleted(task, taskBox);
};

const showInfoBox = () => {
	infoBox.classList.add('display-flex');
	itemLeftUptade();
};

const itemLeftUptade = () => {
	const infoTxt: HTMLParagraphElement = document.querySelector('.left__info');
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
	task: Task,
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

const clearCompleted = (task: Task, taskBox: HTMLLIElement) => {
	const clearCompletedBtn: HTMLButtonElement = document.querySelector(
		'.clear-completed__btn'
	);
	clearCompletedBtn.addEventListener('click', () => {
		tasks.forEach((el) => {
			console.log(el);
		});
	});
};

addTaskButton.addEventListener('click', addTask);
window.addEventListener('keyup', function (e) {
	e.key === 'Enter' ? addTask() : null;
});

statusBtns.forEach((statusBtn) => {
	statusBtn.addEventListener('click', changeStatusDisplayed);
});

function loadTasks(): Task[] {
	const taskJSON = localStorage.getItem('TASKS');
	if (taskJSON == null) return [];
	return JSON.parse(taskJSON);
}
