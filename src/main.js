import {
  createSiteMenuTemplate
} from './components/site-menu';
import {
  createSiteFilterTemplate
} from './components/site-filter';
import {
  createBoardTemplate
} from './components/board';
import {
  createTaskEditElement
} from './components/task-edit-elem';
import {
  createTaskElement
} from './components/task-elem';
import {
  createButtonLoadMoreElement
} from './components/button-load-more';

const TASK_COUNT = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`main`);
const siteHeaderElement = document.querySelector(`.main__control`);

render(siteHeaderElement, createSiteMenuTemplate(), `beforeend`);
render(siteMainElement, createSiteFilterTemplate(), `beforeend`);
render(siteMainElement, createBoardTemplate(), `beforeend`);

const taskListElement = siteMainElement.querySelector(`.board__tasks`);
const boardElement = siteMainElement.querySelector(`.board`);

render(taskListElement, createTaskEditElement(), `afterbegin`);

for (let i = 0; i < TASK_COUNT; i++) {
  render(taskListElement, createTaskElement(), `beforeend`);
}

render(boardElement, createButtonLoadMoreElement(), `beforeend`);
