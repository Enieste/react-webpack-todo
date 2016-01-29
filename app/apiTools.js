'use strict';

import networkTools from './networkTools';

const root = 'http://192.168.0.103:8000';

const apiTools = {
    todos: {
        list(cb) {
            networkTools.get(`${root}/todos`, cb);
        },
        add(todo, cb) {
            networkTools.post(`${root}/todos`, todo, cb);
        },
        remove(id, cb) {
            networkTools.del(`${root}/todos/${id}`, cb);
        },
        removeAll(cb) {
            networkTools.del(`${root}/todos`, cb);
        }
    }
};

module.exports = apiTools;