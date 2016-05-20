'use strict';

import networkTools from './networkTools';

const root = 'https://portfolio-todo-backend.herokuapp.com';

const apiTools = {
    todos: {
        list() {
            return networkTools.get(`${root}/todos`);
        },
        add(todo) {
            return networkTools.post(`${root}/todos`, todo);
        },
        remove(id) {
            return networkTools.del(`${root}/todos/${id}`);
        },
        removeAll() {
            return networkTools.del(`${root}/todos`);
        }
    },
    auth: {
        signIn(login, password) {
            return networkTools.post(`${root}/signIn`, {login, password}).then(r => r.user);
        },
        session() {
            return networkTools.get(`${root}/session`).then(r => r.user);
        },
        signOut() {
            return networkTools.get(`${root}/signOut`);
        },
        signUp(login, email, password) {
            return networkTools.post(`${root}/signUp`, {login, email, password}).then(r => r.user);
}
    }
};

module.exports = apiTools;