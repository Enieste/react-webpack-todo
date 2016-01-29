'use strict';

const networkTools = {
    del(url, cb) {
        var xhr = new XMLHttpRequest();
        xhr.open('DELETE', url, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send();
        xhr.onreadystatechange = function() {
            if (this.readyState != 4) return;
            if (this.status != 200) {
                console.error('error: ' + (this.status ? this.statusText : 'request failed'));
            }
            cb();
        };
    },
    post(url, payload, cb) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(payload));
        xhr.onreadystatechange = function() {
            if (this.readyState != 4) return;
            if (this.status != 200) {
                console.error('error: ' + (this.status ? this.statusText : 'request failed'));
            } else {
                cb(JSON.parse(this.responseText));
            }
        };
    },
    get(url, cb) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.send();
        xhr.onreadystatechange = function() {
            if (this.readyState != 4) return;
            if (this.status != 200) {
                console.error('error: ' + (this.status ? this.statusText : 'request failed'));
            } else {
                cb(JSON.parse(this.responseText));
            }
        };
    }

};

module.exports = networkTools;