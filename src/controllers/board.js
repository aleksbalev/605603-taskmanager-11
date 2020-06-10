import LoadMoreButtonComponent from "../components/button-load-more";
import SortComponent, {
  SortType
} from "../components/sort";
import TasksComponent from "../components/tasks.js";
import TaskController from "./task";
import NoTasksComponent from "../components/no-tasks.js";
import {
  render,
  remove
} from '../utils/render';
import {
  renderPosition
} from '../utils/const';

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTasks = (taskListElement, tasks, onDataChange, onViewChange) => {
  return tasks.map((task) => {
    const taskController = new TaskController(taskListElement, onDataChange, onViewChange);

    taskController.render(task);

    return taskController;
  });
};

const getSortedTasks = (tasks, sortType, from, to) => {
  let sortedTasks = [];
  const showingTasks = tasks.slice();

  switch (sortType) {
    case SortType.DATE_UP:
      sortedTasks = showingTasks.sort((a, b) => a.dueDate - b.dueDate);
      break;
    case SortType.DATE_DOWN:
      sortedTasks = showingTasks.sort((a, b) => b.dueDate - a.dueDate);
      break;
    case SortType.DEFAULT:
      sortedTasks = showingTasks;
      break;
  }

  return sortedTasks.slice(from, to);
};

export default class BoardController {
  constructor(container, tasksModel) {
      this._container = container;
      this._tasksModel = tasksModel;

      <<
      << << < HEAD
        ===
        === =
        this._tasks = []; >>>
      >>> > 2465 ded9b64005171af30426dde60c1ee9d86f58
      this._showedTaskControllers = [];
      this._showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
      this._noTasksComponent = new NoTasksComponent();
      this._sortComponent = new SortComponent();
      this._tasksComponent = new TasksComponent();
      this._loadMoreButtonComponent = new LoadMoreButtonComponent();

      this._onDataChange = this._onDataChange.bind(this);
      this._onSortTypeChange = this._onSortTypeChange.bind(this);
      this._onViewChange = this._onViewChange.bind(this); <<
      << << < HEAD
      this._onLoadMoreButtonClick = this._onLoadMoreButtonClick.bind(this);
      this._onFilterChange = this._onFilterChange.bind(this);

      this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
      this._tasksModel.setFilterChangeHandler(this._onFilterChange);
    } ===
    === =

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
}

render(tasks) {
  this._tasks = tasks; >>>
  >>> > 2465 ded9b64005171af30426dde60c1ee9d86f58

  render() {
    const container = this._container.getElement(); <<
    << << < HEAD
    const tasks = this._tasksModel.getTasks();
    const isAllTasksArchived = tasks.every((task) => task.isArchive); ===
    === =
    const isAllTasksArchived = this._tasks.every((task) => task.isArchive); >>>
    >>> > 2465 ded9b64005171af30426dde60c1ee9d86f58

    if (isAllTasksArchived) {
      render(container, this._noTasksComponent, renderPosition.BEFOREEND);
      return;
    }

    render(container, this._sortComponent, renderPosition.BEFOREEND);
    render(container, this._tasksComponent, renderPosition.BEFOREEND);

    this._renderTasks(tasks.slice(0, this._showingTasksCount));

    this._renderLoadMoreButton();
  }

  _removeTasks() {
    this._showedTaskControllers.forEach((taskConstroller) => taskConstroller.destroy());
    this._showedTaskControllers = [];
  }

  _renderTasks(tasks) {
    const taskListElement = this._tasksComponent.getElement();

    const newTasks = renderTasks(taskListElement, tasks, this._onDataChange, this._onViewChange);
    this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);

    this._showingTasksCount = this._showedTaskControllers.length;
  }

  _renderLoadMoreButton() {
    remove(this._loadMoreButtonComponent);

    if (this._showingTasksCount >= this._tasksModel.getTasks().length) {
      return;
    }

    const container = this._container.getElement();
    render(container, this._loadMoreButtonComponent, renderPosition.BEFOREEND);

    this._loadMoreButtonComponent.setClickHandler(this._onLoadMoreButtonClick);
  }

  _updateTasks(count) {
    this._removeTasks();
    this._renderTasks(this._tasksModel.getTasks().slice(0, count));
    this._renderLoadMoreButton();
  }

  _onDataChange(taskController, oldData, newData) {
    const isSuccess = this._tasksModel.updateTask(oldData.id, newData);

    if (isSuccess) {
      taskController.render(newData);
    }
  }

  _onViewChange() {
    this._showedTaskControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    this._showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

    const sortedTasks = getSortedTasks(this._tasksModel.getTasks(), sortType, 0, this._showingTasksCount);

    this._removeTasks();
    this._renderTasks(sortedTasks);

    this._renderLoadMoreButton();
  }

  _loadMoreButtonComponent() {
    const prevTasksCount = this._showingTasksCount;
    const tasks = this._tasksModel.getTasks();

    this._showingTasksCount = this._showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

    const sortedTasks = getSortedTasks(tasks, this._sortComponent.getSortType(), prevTasksCount, this._showingTasksCount);
    this._renderTasks(sortedTasks);

    if (this._showingTasksCount >= tasks.length) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _onFilterChange() {
    this._updateTasks(SHOWING_TASKS_COUNT_ON_START);
  }

  _onDataChange(taskController, oldData, newData) {
    const index = this._tasks.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._tasks = [].concat(this._tasks.slice(0, index), newData, this._tasks.slice(index + 1));

    taskController.render(this._tasks[index]);
  }

  _onViewChange() {
    this._showedTaskControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    this._showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

    const sortedTasks = getSortedTasks(this._tasks, sortType, 0, this._showingTasksCount);
    const taskListElement = this._tasksComponent.getElement();

    taskListElement.innerHTML = ``;

    const newTasks = renderTasks(taskListElement, sortedTasks, this._onDataChange, this._onViewChange);
    this._showedTaskControllers = newTasks;

    this._renderLoadMoreButton();
  }
}