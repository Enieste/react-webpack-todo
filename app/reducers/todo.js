'use strict';

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text
      };
    default:
      return state
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_TODOS':
      return action.todos;
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
        ];
    case 'DELETE_TODO':
      return state.filter(obj => {
        return obj.id !== action.id;
      });
    case 'DELETE_ALL':
      return [];
    default:
      return state
    }
};

export default todos;