import SiteMenuComponent from "./components/site-menu";
import FilterController from "./controllers/filter";
import BoardComponent from "./components/board";
import BoardController from "./controllers/board.js";
import TasksModel from './modules/tasks.js';
import {
  generateTasks
} from "./mock/task";
import {
  render
} from './utils/render';
import {
  renderPosition
} from './utils/const';


const TASK_COUNT = 22;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
render(siteHeaderElement, new SiteMenuComponent(), renderPosition.BEFOREEND);

const tasks = generateTasks(TASK_COUNT);
const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const filterController = new FilterController(siteMainElement, tasksModel);
filterController.render();

const boardComponent = new BoardComponent();
const boardController = new BoardController(boardComponent, tasksModel);

render(siteMainElement, boardComponent, renderPosition.BEFOREEND);
boardController.render(tasks);
