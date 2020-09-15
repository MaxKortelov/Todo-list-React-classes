import React from 'react';
import './Tutorial.css';

class MainPage extends React.PureComponent {

    state = {
        list: []
    }


    componentDidMount(prevProps, prevState, snapshot) {
        let list = [...this.props.list];
        this.setState({list});
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let list = [...this.props.list];
        this.setState({list});
    }

    render() {

        let todoList =
             this.state.list.map(el => {
                return <li className="todoName"
                           key={el.id}>
                    <b>{el.name}</b>
                    <ul>
                        {el.tasks.map(el => {
                                let classes = ['taskList'];
                                if(el.isDone === true) {
                                    classes.push('lineThrough');
                                }
                            return <li className={classes.join(' ')} key={el.id}>{el.task}</li>
                        })}
                    </ul>
                    <div className="align">
                        <button className="btnremove" onClick={() => this.props.onChangeTodo(el.id)}>Изменить</button>
                        <button className="btnremove" onClick={() => this.props.onDelete(el.id)}>Удалить</button>
                    </div>
                </li>
            });
        

        return(
            <div className="page">
                <div className="align">
                    <button className="btn-style-opt"
                            onClick={() => this.props.createNewTodo()}
                    >
                        Создать новый Todo-list
                    </button>
                </div>
                <h1>Список задач</h1>
                <div className="check-list-buble">
                    <ul className="check-list">
                        {todoList}
                    </ul>
                </div>
            </div>
        )
    }
}

export default MainPage;