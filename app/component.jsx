'use strict';

import React from 'react';

const TODO = React.createClass({
    getInitialState() {
        return {items: []};
    },
    handleDelete(i) {
        this.setState({items: this.state.items.filter((item, _i) => _i !== i)});
    },
    deleteAll() {
        this.setState({items: []});
    },
    addItem(item) {
        this.setState({items: this.state.items.concat([item])});
    },
    render() {
        return <div className="todo col-md-4 col-md-offset-4 col-xs-4 col-xs-offset-4">
            <TodoBanner count={this.state.items.length} deleteAll={this.deleteAll}/>
            <TodoList items={this.state.items} handleDelete={this.handleDelete}/>
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
            {this.props.items.map((itemText, i) =>
                <TodoListItem deleteClicked={() => this.props.handleDelete(i)} text={itemText}/>
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
        React.findDOMNode(this.refs.item).focus();
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
                    <input type="text" className="form-control" ref="item" onChange={this.onChange}
                           value={this.state.item}/>
                    <input type="submit" className="todo-submit-button btn btn-success" value="Do"
                           disabled={this.state.item.replace(/ /g, '').length === 0}/>
                </div>
            </form>
        </div>
    }
});

const Application = React.createClass({
    getInitialState() {
        return {count: 6};
    },
    onCountChange(e) {
        console.log(e);
        this.setState({
            count: e.target.value
        });
    },
    render() {
        return <div className="application">
            <TODO/>
        </div>;
    }
});

export default Application;