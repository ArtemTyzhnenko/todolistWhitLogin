import React, { Component, Fragment } from 'react';


import Weather from './Weather/Weather';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ToDoList from './ToDoList/ToDoList';
import ToDoFooter from './ToDoFooter/ToDoFooter';
import localStorageApi from '../../services/localStorageApi';
import { withRouter } from 'react-router-dom';

import {
  addTodo,
  onChecked,
  onRemove,
  onClickToggle,
  setFilter,
  clearCompleted,
  setEditableId,
  editableChange,
  inputChangeBlur,
  saveEdited,
  logOut,
} from '../../modules/todo/actions';

class ToDoListApp extends Component {
  state = {
    value: ''
  };
  
  filters = {
    all: (list) => list,
    completed: (list) => list.filter((item) => item.check),
    active: (list) => list.filter((item) => !item.check),
  };

  filterTodos = (optionalFilter) => {
    const {toDoList} = this.props.todos;
    return this.filters[optionalFilter](toDoList);
  };

  onSetFilter = (filter) => () => {
    const {actions} = this.props;
    actions.setFilter(filter)
  };

  onSetEditableId = (id, originText) => () => {
    const {actions} = this.props;
    actions.setEditableId(id, originText);
  };

  onInputChangeBlur = (id) => () => {
    const {actions} = this.props;
    actions.inputChangeBlur(id);
  };

  onInputChange = (e) => this.setState({value: e.target.value});

  clearInput = () => this.setState({value: ''});

  onSaveTodo = (e) => {
    const {actions} = this.props;
    const {value} = this.state;
    const id = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    if (!!value.trim() && e.keyCode === 13) {
      actions.addTodo(value, id);
      this.clearInput();
    }
  };

  // componentDidUpdate(){
  //   const { userId } = this.props.login;
  //   const user = localStorageApi.get('user');
  //   localStorageApi.add('user', {...user, [userId] : this.props.todos.toDoList});
  // }
  
  componentDidUpdate(){
    const { userId } = this.props.login;
    // const user = localStorageApi.get('user');
    localStorageApi.add('todos',  this.props.todos.toDoList);
  }

  onLogOutClick = () => { 
    const {actions} = this.props;
    actions.logOut();
    localStorageApi.clear();
    this.props.history.push("/login")
  };

  render() {
    const {toDoList, editableId, filter, active, id} = this.props.todos;
    const {isFetching} = this.props.weather;
    const {city, temp, weather, pressure, icon,} = this.props.weather.weatherInfo;
    const {value} = this.state;
    const list = this.filterTodos(filter);
    const hasToDo = !!toDoList.length;
    const counter = this.filterTodos('active').length;
    const {actions} = this.props;
    const urlForIcon = `http://openweathermap.org/img/w/${icon}.png`;
    return (
      <Fragment>

        <button type="button" onClick={this.onLogOutClick} className="log-out">Log out</button>
        { isFetching ? <p className={'loader'}>Loading...</p> :
          <Weather
            city={city}
            temp={temp}
            weather={weather}
            pressure={pressure}
            urlForIcon={urlForIcon}
            isFetching={isFetching}
          />
        }

        <h1>todos</h1>
        <input type="text"
               placeholder={'What needs to be done?'}
               className={'add-input'}
               onChange={this.onInputChange}
               onKeyDown={this.onSaveTodo}
               value={value}
               maxLength={'450px'}
        />
        <ToDoList toDoList={list}
                  onChecked={actions.onChecked}
                  onRemove={actions.onRemove}
                  onClickToggle={actions.onClickToggle}
                  hasToDo={hasToDo}
                  setEditableId={this.onSetEditableId}
                  editableId={editableId}
                  inputChangeBlur={this.onInputChangeBlur}
                  editableChange={actions.editableChange}
                  saveEdited={actions.saveEdited}
                  active={active}
                  id={id}
        />
        <ToDoFooter hasToDo={hasToDo}
                    clearCompleted={actions.clearCompleted}
                    onSetFilter={this.onSetFilter}
                    counter={counter}
                    filter={filter}
        />
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        addTodo,
        onChecked,
        onRemove,
        onClickToggle,
        setFilter,
        clearCompleted,
        setEditableId,
        editableChange,
        inputChangeBlur,
        saveEdited,
        logOut,
      },
      dispatch,
    ),
  };
};

const mapStateToProps = state => {
  return {
    todos: state.todos,
    weather: state.weather,
    login: state.login,
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToDoListApp));