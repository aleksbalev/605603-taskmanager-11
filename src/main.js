import SiteMenuComponent from "./components/site-menu";
import SortComponent from "./components/sort";
import FilterComponent from "./components/site-filter";
import TaskComponent from "./components/task-elem";
import TasksComponent from "./components/tasks.js";
import TaskEditComponent from "./components/task-edit-elem";
import NoTasksComponent from "./components/no-tasks.js";
import LoadMoreButtonComponent from "./components/button-load-more";
import BoardComponent from "./components/board";
import {
  generateTasks
} from "./mock/task";
import {
  generateFilters
} from "./mock/site-filter";
import {
  render
} from './utils';
import {
  renderPosition
} from './const';


const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTask = (taskListElement, task) => {
  const replaceTaskToEdit = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const replaceEditToTask = () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const taskComponent = new TaskComponent(task);
  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, () => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const taskEditComponent = new TaskEditComponent(task);
  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceEditToTask();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(taskListElement, taskComponent.getElement(), renderPosition.BEFOREEND);
};

const renderBoard = (boardComponent, tasks) => {
  const isAllTasksArchived = tasks.every((task) => task.isArchive);

  if (isAllTasksArchived) {
    render(boardComponent.getElement(), new NoTasksComponent().getElement(), renderPosition.BEFOREEND);
    return;
  }

  render(boardComponent.getElement(), new SortComponent().getElement(), renderPosition.BEFOREEND);
  render(boardComponent.getElement(), new TasksComponent().getElement(), renderPosition.BEFOREEND);

  const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);

  let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
  tasks.slice(0, showingTasksCount)
    .forEach((task) => {
      renderTask(taskListElement, task);
    });

  const loadMoreButtonComponent = new LoadMoreButtonComponent();

  render(boardComponent.getElement(), loadMoreButtonComponent.getElement(), renderPosition.BEFOREEND);

  loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
    const prevTasksCount = showingTasksCount;
    showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

    tasks.slice(prevTasksCount, showingTasksCount)
      .forEach((task) => renderTask(taskListElement, task));

    if (showingTasksCount >= tasks.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  });
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const tasks = generateTasks(TASK_COUNT);
const filters = generateFilters();

render(siteHeaderElement, new SiteMenuComponent().getElement(), renderPosition.BEFOREEND);
render(siteMainElement, new FilterComponent(filters).getElement(), renderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
render(siteMainElement, boardComponent.getElement(), renderPosition.BEFOREEND);

renderBoard(boardComponent, tasks);
