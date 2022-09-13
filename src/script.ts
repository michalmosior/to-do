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
const tasks: Task[] = loadTasks();
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
	const infoTxt: HTMLParagraphElement = document.querySelector('.left__info');
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
	const targetBtn: HTMLButtonElement = e.target.parentElement;
	targetBtn.parentElement.remove();
	id = id - 1;
	itemLeftUptade();
	id === 0 ? infoBox.classList.remove('display-flex') : null;
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
		console.log('Sss');
		addTask();
	}
});

statusBtns.forEach((statusBtn) => {
	statusBtn.addEventListener('click', changeStatusDisplayed);
});

function loadTasks(): Task[] {
	const taskJSON = localStorage.getItem('TASKS');
	if (taskJSON == null) return [];
	return JSON.parse(taskJSON);
}
