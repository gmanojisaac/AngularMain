---

## 1. Ngxs setup

# Using 64bit Windows OS

# Open powershell in Admin Mode and install packages

```powershell
npm install @ngxs/store @ngxs/store@dev @ngxs/logger-plugin@dev @ngxs/devtools-plugin --save
```

# To Test Task Component create other components for testing in isolation using ngxs stores

  <pre class="mermaid">
  flowchart TD
  id5([Task Component]) -->  id6([PureTaskListComponent])
  id6([PureTaskListComponent]) --> id7([TaskListComponent])
  id7([TaskListComponent]) --> id8([PureInboxScreenComponent])
  id8([PureInboxScreenComponent]) --> id9([ngxsCheckComponent])
  </pre>

# In App.module import and add forRoot

  <pre class="mermaid">
  flowchart TD
  id1([Main Module]) -->  id2([NgxsModule.forRoot])
  id1([Main Module]) -->  id3([NgxsReduxDevtoolsPluginModule.forRoot])
  id1([Main Module]) -->  id4([NgxsLoggerPluginModule.forRoot])
  </pre>

```typescript
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { environment } from '../environments/environment';
...

    NgxsModule.forRoot([], {
      developmentMode: !environment.production,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot({
      disabled: environment.production,
    }),

````

## 2. Create HTML Task component

# Create state and model, in src/app create state and models folder.

# In models folder create task.model.ts file

  <pre class="mermaid">
  flowchart TD
  id1([Interface Task]) -->  id2([id: string])
  id1([Interface Task]) -->  id3([title: string])
  id1([Interface Task]) -->  id4([state: string])
  </pre>

```typescript
  export interface Task {
    id: string;
    title: string;
    state: string;
  }

  import { Injectable } from '@angular/core';
  import { State, Selector, Action, StateContext } from '@ngxs/store';
  import { patch, updateItem } from '@ngxs/store/operators';
  import { Task } from '../models/task.model';

````

# In state folder create task.state.ts file

  <pre class="mermaid">
  flowchart TD
  id1([actions]) -->  id2([ARCHIVE_TASK])
  id1([actions]) -->  id3([PIN_TASK])
  id1([actions]) -->  id4([APP_ERROR])
  </pre>

```typescript

  // Defines the actions available to the app
  export const actions = {
  ARCHIVE_TASK: 'ARCHIVE_TASK',
  PIN_TASK: 'PIN_TASK',
  ERROR: 'APP_ERROR',
  };

  export class ArchiveTask {
  static readonly type = actions.ARCHIVE_TASK;

  constructor(public payload: string) {}
  }

  export class PinTask {
  static readonly type = actions.PIN_TASK;

  constructor(public payload: string) {}
  }
  // The class definition for our error field
  export class AppError {
  static readonly type = actions.ERROR;
  constructor(public payload: boolean) {}
  }

  // The initial state of our store when the app loads.
  // Usually you would fetch this from a server
  const defaultTasks = [
  { id: '1', title: 'Something', state: 'TASK_INBOX' },
  { id: '2', title: 'Something more', state: 'TASK_INBOX' },
  { id: '3', title: 'Something else', state: 'TASK_INBOX' },
  { id: '4', title: 'Something again', state: 'TASK_INBOX' },
  ];
  ...

```

  <pre class="mermaid">
  flowchart TD
  id1([Interface TaskStateModel]) -->  id2([tasks])
  id1([Interface TaskStateModel]) -->  id3([status])
  id1([Interface TaskStateModel]) -->  id4([error])
  </pre>

  <pre class="mermaid">
  flowchart TD
  id5([status]) -->  id6([idle])
  id5([status]) -->  id7([loading])
  id5([status]) -->  id8([success])
  id5([status]) -->  id9([error])
  </pre>

```typescript
  export interface TaskStateModel {
    tasks: Task[];
    status: 'idle' | 'loading' | 'success' | 'error';
    error: boolean;
  }

```

  <pre class="mermaid">
  flowchart TD
  id1([TaskStateModel:default state ]) -->  id2([tasks: defaultTasks])
  id1([TaskStateModel:default state]) -->  id3([status: 'idle'])
  id1([TaskStateModel:default state]) -->  id4([error: false])
  </pre>

```typescript

  // Sets the default state
  @State<TaskStateModel>({
    name: 'taskbox',
    defaults: {
      tasks: defaultTasks,
      status: 'idle',
      error: false,
    },
  })

```

  <pre class="mermaid">
  flowchart TD
  id1([TasksState]) -->  id2([Selector: getError])
  id1([TasksState]) -->  id3([Selector: getAllTasks])
  id1([TasksState]) -->  id4([Action: pinTask])
  id1([TasksState]) -->  id5([Action: ArchiveTask])
  id1([TasksState]) -->  id6([Action: setAppError])
  </pre>

````typescript
    @Injectable()
    export class TasksState {
      // Defines a new selector for the error field
      @Selector()
      static getError(state: TaskStateModel): boolean {
        return state.error;
      }

      @Selector()
      static getAllTasks(state: TaskStateModel): Task[] {
        return state.tasks;
      }

      // Triggers the PinTask action, similar to redux
      @Action(PinTask)
      pinTask(
        { getState, setState }: StateContext<TaskStateModel>,
        { payload }: PinTask
      ) {
        const task = getState().tasks.find((task) => task.id === payload);

        if (task) {
          const updatedTask: Task = {
            ...task,
            state: 'TASK_PINNED',
          };
          setState(
            patch({
              tasks: updateItem<Task>(
                (pinnedTask) => pinnedTask?.id === payload,
                updatedTask
              ),
            })
          );
        }
      }
      // Triggers the archiveTask action, similar to redux
      @Action(ArchiveTask)
      archiveTask(
        { getState, setState }: StateContext<TaskStateModel>,
        { payload }: ArchiveTask
      ) {
        const task = getState().tasks.find((task) => task.id === payload);
        if (task) {
          const updatedTask: Task = {
            ...task,
            state: 'TASK_ARCHIVED',
          };
          setState(
            patch({
              tasks: updateItem<Task>(
                (archivedTask) => archivedTask?.id === payload,
                updatedTask
              ),
            })
          );
        }
      }
      // Function to handle how the state should be updated when the action is triggered
      @Action(AppError)
      setAppError(
        { patchState, getState }: StateContext<TaskStateModel>,
        { payload }: AppError
      ) {
        const state = getState();
        patchState({
          error: !state.error,
        });
      }
    }

```

## 3. Define Task Component Array and States
# Add In Lazy loaded feature.module inject the store - state logic for the feature

```typescript
  import { TasksState } from '../state/task.state';
  import { NgxsModule } from '@ngxs/store';
  ...

  imports: [..., NgxsModule.forFeature([TasksState])],

````

# In feature.component

# Add selector: app-task and component: TaskComponent

  <pre class="mermaid">
  flowchart LR
  id1([Task]) -->  id2([App-Task])
  id2([App-Task]) -->  id3([onPinTask])
  id2([App-Task]) -->  id4([onArchiveTask])
  </pre>

```typescript
import { Task } from '../models/task.model';
...

@Input() task: Task;

// tslint:disable-next-line: no-output-on-prefix
@Output()
onPinTask = new EventEmitter<Event>();

// tslint:disable-next-line: no-output-on-prefix
@Output()
onArchiveTask = new EventEmitter<Event>();

/**
_ Component method to trigger the onPin event
_ @param id string
\*/
onPin(id: any) {
this.onPinTask.emit(id);
}
/**
_ Component method to trigger the onArchive event
_ @param id string
\*/
onArchive(id: any) {
this.onArchiveTask.emit(id);
}

```

# Add in feature: apptask.component.html

  <pre class="mermaid">
  flowchart LR
  id1([Label]) -->  id2([Checkbox])
  id2([Checkbox]) -->  id3([Icon])
  </pre>

```typescript
<div class="list-item {{ task.state }}">
  <label
    [attr.aria-label]="'archiveTask-' + task.id"
    for="checked-{{ task.id }}"
    class="checkbox"
  >
    <input
      type="checkbox"
      disabled="true"
      [defaultChecked]="task.state === 'TASK_ARCHIVED'"
      name="checked-{{ task.id }}"
      id="checked-{{ task.id }}"
    />
    <span class="checkbox-custom" (click)="onArchive(task.id)"></span>
  </label>
  <label
    [attr.aria-label]="task.title + ''"
    for="title-{{ task.id }}"
    class="title"
  >
    <input
      type="text"
      [value]="task.title"
      readonly="true"
      id="title-{{ task.id }}"
      name="title-{{ task.id }}"
      style="text-overflow: ellipsis;"
    />
  </label>
  <button
    *ngIf="task.state !== 'TASK_ARCHIVED'"
    class="pin-button"
    [attr.aria-label]="'pinTask-' + task.id"
    (click)="onPin(task.id)"
  >
    <span class="icon-star"></span>
  </button>
</div>
```

## 4. Display logic for Task States from Store

# Add Selector: app-pure-task-list and component: PureTaskListComponent

  <pre class="mermaid">
  flowchart LR
  id1([loading: flag]) -->  id2([app-pure-task-list])
  id3([task:Array]) --> id2([app-pure-task-list])
  id2([app-pure-task-list]) --> id4([onPinTask])
  id2([app-pure-task-list]) --> id5([onArchiveTask])
  </pre>

```typescript
  /**
   * @ignore
   * Component property to define ordering of tasks
   */
  tasksInOrder: Task[] = [];

  @Input() loading = false;

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onPinTask: EventEmitter<any> = new EventEmitter();

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onArchiveTask: EventEmitter<any> = new EventEmitter();

  @Input()
  set tasks(arr: Task[]) {
    const initialTasks = [
      ...arr.filter((t) => t.state === 'TASK_PINNED'),
      ...arr.filter((t) => t.state !== 'TASK_PINNED'),
    ];
    const filteredTasks = initialTasks.filter(
      (t) => t.state === 'TASK_INBOX' || t.state === 'TASK_PINNED'
    );
    this.tasksInOrder = filteredTasks.filter(
      (t) => t.state === 'TASK_INBOX' || t.state === 'TASK_PINNED'
    );
  }
```

# Add in PureTaskListComponent.html

  <pre class="mermaid">
  flowchart TD
  id1([HTML: States]) -->  id2([Loading: Flag True])
  id1([HTML: States]) --> id3([tasksInOrder.length is 0])
  id1([HTML: States]) --> id4([tasksInOrder.length NOT 0])
  </pre>

```typescript
<div class="list-items">
    <app-task
    *ngFor="let task of tasksInOrder"
    [task]="task"
    (onArchiveTask)="onArchiveTask.emit($event)"
    (onPinTask)="onPinTask.emit($event)"
    >
    </app-task>
    <div
    *ngIf="tasksInOrder.length === 0 && !loading"
    class="wrapper-message"
    >
    <span class="icon-check"></span>
    <p class="title-message">You have no tasks</p>
    <p class="subtitle-message">Sit back and relax</p>
    </div>
    <div *ngIf="loading">
    <div *ngFor="let i of [1, 2, 3, 4, 5, 6]" class="loading-item">
        <span class="glow-checkbox"></span>
        <span class="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
        </span>
    </div>
    </div>
</div>
```

## 5. Load All Task States from Store

# Add Selector: app-task-list and component: TaskListComponent

  <pre class="mermaid">
  flowchart TD
  id1([Stores]) -->  id2([Select: tasks])
  id1([Stores]) --> id3([Dispatch: archiveTask])
  id1([Stores]) --> id4([Dispatch: pinTask])
  </pre>

```typescript
  tasks$?: Observable<any>;

  constructor(private store: Store) {
    this.tasks$ = store.select((state) => state.taskbox.tasks);
  }

  /**
   * Component method to trigger the archiveTask event
   */
  archiveTask(id: any) {
    this.store.dispatch(new ArchiveTask(id));
  }

  /**
   * Component method to trigger the pinTask event
   */
  pinTask(id: any) {
    this.store.dispatch(new PinTask(id));
  }
```

# Add in TaskListComponent.html

```typescript
    <app-pure-task-list
      [tasks]="tasks$ | async"
      (onArchiveTask)="archiveTask($event)"
      (onPinTask)="pinTask($event)"
    ></app-pure-task-list>
```

## 6. Logic for Error State and normal state

# Add Selector: app-pure-inbox-screen and component: PureInboxScreenComponent

  <pre class="mermaid">
  flowchart TD
  id1([Error States]) -->  id2([Error Screen])
  id1([Error States]) --> id3([No Error Screen])
  </pre>

```typescript
  @Input() error: any;
```

# Add in PureInboxScreenComponent.html

```typescript
<div *ngIf="error" class="page lists-show">
      <div class="wrapper-message">
        <span class="icon-face-sad"></span>
        <p class="title-message">Oh no!</p>
        <p class="subtitle-message">Something went wrong</p>
      </div>
    </div>

    <div *ngIf="!error" class="page lists-show">
      <nav>
        <h1 class="title-page">Taskbox</h1>
      </nav>
      <app-task-list></app-task-list>
    </div>
```

## 7. Update Error State from Store

# Add Selector: app-task-ngxs and component: ngxsCheckComponent

  <pre class="mermaid">
  flowchart TD
  id1([Error Observable]) -->  id2([Store: Select Error])
  </pre>

```typescript
  error$: Observable<boolean>;
  constructor(private store: Store) {
    this.error$ = store.select((state) => state.taskbox.error);
  }
```

# Add in ngxsCheckComponent.html

```typescript
    <app-pure-inbox-screen [error]="error$ | async"></app-pure-inbox-screen>
```

## 8.Load the github code to stackblitz also Load the static-pages to gh-pages

```typescript
ng add angular-cli-ghpages
git remote remove origin
git remote add origin https://github.com/gmanojisaac/Angularngxs.git
git remote -v show
git add .
git commit -am “Completed ngxs”
git push -u origin ngxs
ng deploy --base-href=/Angularngxs/
```
