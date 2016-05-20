import { combineReducers } from 'redux';
import todos from './todo';
import user from './user';
import { routerReducer } from 'react-router-redux';

const appReducers = combineReducers({
  todos,
  user,
  routing: routerReducer
});

export default appReducers;


/*

state = {
    user: {
        login: login,
        email: email,
        created_at: date,
        updated_at: date
    },
    todos: [
        {
            text: todo1,
            id: 1,
            complete: true
        },
        {
            text: todo2,
            id: 2,
            complete: false
        }
    ]
}
*/