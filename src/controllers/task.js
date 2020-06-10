import TaskComponent from '../components/task-elem';
import TaskEditComponent from '../components/task-edit-elem';
import {
  render,
  replace,
  remove,
} from '../utils/render';
import {
  renderPosition
} from '../utils/const';

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class TaskController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;
    this._taskComponent = null;
    this._taskEditComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(task) {
      const oldTaskComponent = this._taskComponent;
      const oldTaskEditComponent = this._taskEditComponent;

      this._taskComponent = new TaskComponent(task);
      this._taskEditComponent = new TaskEditComponent(task);

      this._taskComponent.setEditButtonClickHandler(() => {
        this._replaceTaskToEdit();
        document.addEventListener(`keydown`, this._onEscKeyDown);
      });

      this._taskComponent.setArchiveButtonClickHandler(() => {
        this._onDataChange(this, task, Object.assign({}, task, {
          isArchive: !task.isArchive,
        }));
      });

      this._taskComponent.setFavoritesButtonClickHandler(() => {
        this._onDataChange(this, task, Object.assign({}, task, {
          isFavorite: !task.isFavorite,
        }));
      });

      this._taskEditComponent.setSubmitHandler((evt) => {
        evt.preventDefault();
        this._replaceEditToTask();
      });

      if (oldTaskEditComponent && oldTaskComponent) {
        replace(this._taskComponent, oldTaskComponent);
        replace(this._taskEditComponent, oldTaskEditComponent);
      } else {
        render(this._container, this._taskComponent, renderPosition.BEFOREEND);
      } <<
      << << < HEAD
    } ===
    === =
} // ?
>>>
>>> > 2465 ded9b64005171af30426dde60c1ee9d86f58

setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToTask();
    }
  }

  <<
  << << < HEAD
destroy() {
    remove(this._taskEditComponent);
    remove(this._taskComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  ===
  === = >>>
  >>> > 2465 ded9b64005171af30426dde60c1ee9d86f58
_replaceEditToTask() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._taskEditComponent.reset();
    replace(this._taskComponent, this._taskEditComponent);
    this._mode = Mode.DEFAULT; <<
    << << < HEAD
  } ===
  === =
} // ?
>>>
>>> > 2465 ded9b64005171af30426dde60c1ee9d86f58

_replaceTaskToEdit() {
  this._onViewChange();
  replace(this._taskEditComponent, this._taskComponent);
  this._mode = Mode.EDIT;
}

_onEscKeyDown(evt) {
  const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

  if (isEscKey) {
    this._replaceEditToTask();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
}
}
