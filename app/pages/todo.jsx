'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import apiTools from '../apiTools';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        items: state.todos
    }
};

let TODO = React.createClass({
    getInitialState() {
        return {loaded: false};
    },
    handleDelete(id) {
        apiTools.todos.remove(id).then(_ => {
            this.props.dispatch({
               type: 'DELETE_TODO',
               id
            });
        });
    },
    deleteAll() {
        apiTools.todos.removeAll().then(_ =>
            this.props.dispatch({
                type: 'DELETE_ALL'
            }));
    },
    addItem(item) {
        apiTools.todos.add({text: item}).then((res) => {
            this.props.dispatch({
                type: 'ADD_TODO',
                id: res.id,
                text: item
            });
        });
    },
    componentDidMount() {
        apiTools.todos.list().then((res) => {
            this.setState({loaded: true});
            this.props.dispatch({
                type: 'LOAD_TODOS',
                todos: res
            });
        });
    },
    render() {
        return <div className="todo col-md-4 col-md-offset-4 col-xs-4 col-xs-offset-4">
            <TodoBanner count={this.props.items.length} deleteAll={this.deleteAll}/>
            {this.state.loaded ?
                <TodoList items={this.props.items} handleDelete={this.handleDelete}/> :
                <p>Loading...</p> }
            <TodoForm onFormSubmit={this.addItem}/>
        </div>;
    }
});

const TodoBanner = React.createClass({
    render() {
        return (
            <h3>TODO list ({this.props.count}) {this.props.count ?
                <button onClick={this.props.deleteAll} className="btn btn-warning">Forget all</button> :
                false}
            </h3>
        );
    }
});

const TodoList = React.createClass({
    render() {
        return <ul>
            {this.props.items.map(todoItem =>
                <TodoListItem key={todoItem.id} deleteClicked={() => this.props.handleDelete(todoItem.id)} text={todoItem.text}/>
            )}
        </ul>;
    }
});

const TodoListItem = React.createClass({
    render() {
        return <li>{this.props.text} <button onClick={this.props.deleteClicked} className="btn btn-warning">X</button></li>;
    }
});

const TodoForm = React.createClass({
    getInitialState() {
        return {item: ''};
    },
    handleSubmit(e) {
        e.preventDefault();
        this.props.onFormSubmit(this.state.item);
        this.setState({item: ''});
        this.todoTextNode.focus();
    },
    onChange(e) {
        this.setState({
            item: e.target.value
        });
    },
    render() {
        return <div className="todo-form">
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>Add todo:</label>
                    <input type="text" className="form-control" ref={node => this.todoTextNode = node} onChange={this.onChange}
                           value={this.state.item}/>
                    <input type="submit" className="todo-submit-button btn btn-success" value="Do"
                           disabled={this.state.item.replace(/ /g, '').length === 0}/>
                </div>
            </form>
        </div>
    }
});

const TodoPage = React.createClass({
    render() {
        return <div className="application">
            <TODO />
        </div>;
    }
});

TODO = connect(mapStateToProps)(TODO);

export default TodoPage;