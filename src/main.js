import SiteMenuComponent from "./components/site-menu";
import FilterComponent from "./components/site-filter";
import BoardComponent from "./components/board";
import BoardController from "./controllers/board.js";
import TasksModel from './modules/tasks.js';
import {
  generateTasks
} from "./mock/task";
import {
  generateFilters
} from "./mock/site-filter";
import {
  render
} from './utils/render';
import {
  renderPosition
} from './utils/const';


const TASK_COUNT = 22;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const tasks = generateTasks(TASK_COUNT);
const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);
const filters = generateFilters();

render(siteHeaderElement, new SiteMenuComponent(), renderPosition.BEFOREEND);
render(siteMainElement, new FilterComponent(filters), renderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
const boardController = new BoardController(boardComponent, tasksModel);

render(siteMainElement, boardComponent, renderPosition.BEFOREEND);
boardController.render(tasks);
