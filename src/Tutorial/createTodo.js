import React from 'react';
import './Tutorial.css';

export default class Createtodo extends React.PureComponent {
    state = {
        note: {
                id: 1,
                name: '',
                tasks: [],
            },
        task: '',
        isDone: false,
        counter: 0,
        approved: undefined
    }

    onAddNote = () => {
        if(this.state.note.name.length > 0 || this.state.note.tasks.length > 0) {
            let newNote = {...this.state.note};
            this.setState({note: {id: 1, name: '', tasks: [],}});
            this.props.onAddItemList(newNote);
        }
    }

    onClearFields = () => {
        this.setState({note: {id: 1, name: '', tasks: [],}, task: '', isDone: false, counter: 0,});
    }

    checkTask (el) {
        let arr = {...this.state.note};
        arr.tasks[el.id].isDone = !this.state.note.tasks[el.id].isDone;
        this.setState({note: arr});
    }

    changeInputName = (event) => {
        let note = {...this.state.note, name: event.target.value};
        this.setState({note});
    }

    addTodo = () => {
        if (this.state.task.length > 0) {
            let obj =  [...this.state.note.tasks, {id: undefined, task: this.state.task, isDone: this.state.isDone}];
            obj.map((el, i) => el.id = i);
            let note = {...this.state.note, tasks: [...obj]};
            this.setState(  {note, task: '', isDone: false});
        }
    }

    onChangeTodo = (id) => {
        let newTasks = [...this.state.note.tasks];
        this.setState({task: newTasks[id].task, isDone: newTasks[id].isDone});
        this.onDelete(id);
    }

    onDelete = (id) => {
        let tasks = this.state.note.tasks;
        tasks.splice(id, 1);
        this.setState({note: {...this.state.note, tasks}});
    }

    componentDidMount() {
        if (localStorage.getItem('newNote') !== null) {
            let note = JSON.parse(localStorage.getItem('newNote'));
            this.setState({note});
        }

        if(this.props.note.name.length > 0) {
            let note = {...this.props.note};
            this.setState({note});
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        localStorage.setItem('newNote', JSON.stringify(this.state.note));
    }

    render() {
        let list = this.state.note.tasks.map((el) => {
            let classes = ['chbx'];
            if(el.isDone === true) {
                classes.push('lineThrough');
            }

            return <li className={classes.join(' ')}
                       key={el.id}>
                {el.task}
                <input type="checkbox"
                       checked={el.isDone}
                       className="chbx"
                       onClick={() => this.checkTask(el)}
                />
                <button className="btnremove" onClick={() => this.onChangeTodo(el.id)}>Изменить</button>
                <button className="btnremove" onClick={() => this.onDelete(el.id)}>Удалить</button>
            </li>
        });

        return(
            <div className="page">
                <h1>Редактор Todo-list</h1>
                <div className="align">
                    <button className="btn" onClick={() => this.onAddNote()}>Сохранить Todo-list</button>
                    <button className="btn" onClick={() => this.onClearFields()}>Очистить Todo-list</button>
                </div>
                <div id="nameTodo" className="divInput">
                    <input type="text"
                           placeholder="Название списка задач"
                           className="inputField"
                           value={this.state.note.name}
                           onChange={event => this.changeInputName(event)} />
                </div>
                <div id="nameTodo" className="divInput">
                    <input type="text"
                           placeholder="Напишите сюда задачу"
                           className="inputField"
                           value={this.state.task}
                           onChange={event => this.setState({task: event.target.value})} />
                    <button className="btn-style-add"
                            onClick={() => this.addTodo()}>+</button>
                </div>
                <ul>
                    {list}
                </ul>
            </div>
        )
    }
}

