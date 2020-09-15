import React from 'react';
import './Tutorial.css';
import MainPage from './mainpage';
import Createtodo from './createTodo';

class Todo extends React.Component {
    state = {
        val: true,
        list: [],
        note: {id: 1, name: '', tasks: []}
    }

    onMainPage = (props) => (
        this.setState({val: true})
    )
    onAddPage = (props) => (
        this.setState({val: false})
    )

    onAddItemList = (item) => {
        let newList = [...this.state.list, item];
        newList.map((el, i) => el.id = i);
        this.setState({list: newList});
        this.setState({note: {id: 1, name: '', tasks: []}});
    }

    onChangeTodo = (id) => {
        let note = {...this.state.list[id]};
        let list = [...this.state.list];
        this.setState({note});
        list.splice(id, 1);
        this.setState({list});
        this.setState({val: !this.state.val});
    }

    onDelete = (id) => {
            let list = this.state.list;
            list.splice(list[id], 1);
            list.map((el, i) => el.id = i);
            this.setState({list});
    }

    createNewTodo = () => {
        this.setState({note: {id: 1, name: 'Новый список задач', tasks: []}});
        this.setState({val: !this.state.val});
    }

    componentWillMount() {
        if (localStorage.getItem('list') !== null) {
            let list = JSON.parse(localStorage.getItem('list'));
            this.setState({list});
        }
    }

    componentDidUpdate() {
        localStorage.setItem('list', JSON.stringify(this.state.list));
    }

    render() {
        const { val } = this.state;

        return(
            <div id="bodypage">
                <header>
                <button value="1" className="btn-style" onClick={this.onMainPage}>Главная страница</button>
                <button value="2" className="btn-style" onClick={this.onAddPage}>Редактор Todo-list</button>
                </header>
                { val && (<MainPage list={this.state.list}
                                    onDelete={this.onDelete}
                                    onChangeTodo={this.onChangeTodo}
                                    createNewTodo={this.createNewTodo}
                />) }
                { !val && (<Createtodo onAddItemList={this.onAddItemList}
                                       note={this.state.note}
                />) }
            </div>
        )
    }
}

export default Todo;