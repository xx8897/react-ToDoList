import React from 'react';
import Todo from './Todo';

class App extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            todos: [],
            newId: 4,
            newText: '',
        }
    }
    
    // 取 todo 的內容
    getNewValue (e) {
        const newText = e.target.value;
        
        this.setState({
            newText: newText,
        });
    }
    

    // 新增
    addTodo (e) {
        const {todos, newText, newId} = this.state;
        
        if (!newText) {
            e.preventDefault();
            return;
        }
        
        this.setState({
            todos: [
                ...todos,
                {id: newId, text: newText, completed: false}
            ],
            newId: newId +1,
            newText: '',
        });
    }

    // 刪除
    deleteTodo (id) {
        const {todos} = this.state;
        
        let newTodos = todos.filter((item) => item.id !== id);
        
        this.setState({
            todos: newTodos,
        });        
    }

    // 完成
    checkTodoToggle (id) {
        const {todos} = this.state;

        let newTodos = todos.map((item) => {
            if(item.id === id){
                item.completed = !item.completed;
            }
            return item;
        });
        
        this.setState({
            todos: newTodos,
        })
    }

    // 編輯
    saveEditedValue(id, value) {
        const {todos} = this.state;

        let newTodos = todos.map((item) => {
            if(item.id === id){
                item.text = value;
            }
            return item;
        });
        
        this.setState({
            todos: newTodos,
        })
    }
    
    render () {
        let {todos} = this.state;
        return (
            <div className="container">
                <header className="header__container">
                    <h1 className="header__site-title">Todolist</h1>
                </header>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" id="input-add" placeholder=""
                        value={this.state.newText}
                        onChange={(e) => this.getNewValue(e)} />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            onClick={(e) => this.addTodo(e)}
                        >add</button>
                    </div>
                </div>
                <ul className="list-group list-group-flush">
                    {todos.map((todo) =>
                        <Todo
                            key={todo.id}
                            todo={todo}
                            remove={(id) => this.deleteTodo(id)}
                            checkToggle={(id) => this.checkTodoToggle(id)}
                            saveEditedValue={(id, value) => this.saveEditedValue(id, value)}
                        />
                    )}
                </ul>
            </div>
        );
    }
}

export default App;