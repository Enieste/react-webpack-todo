'use strict';

const networkTools = {
    del(url) {
        return new Promise((success, fail) => {
            var xhr = new XMLHttpRequest();
            xhr.open('DELETE', url, true);
            xhr.withCredentials = true;
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.send();
            xhr.onreadystatechange = function() {
                if (this.readyState != 4) return;
                if (this.status != 200) {
                    fail();
                    console.error('error: ' + (this.status ? this.statusText : 'request failed'));
                }
                success();
            };
        })

    },
    post(url, payload) {
        return new Promise((success, fail) => {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.withCredentials = true;
            xhr.send(JSON.stringify(payload));
            xhr.onreadystatechange = function() {
                if (this.readyState != 4) return;
                if (this.status != 200) {
                    fail(JSON.parse(this.responseText));
                    console.error('error: ' + (this.status ? this.statusText : 'request failed'));
                } else {
                    success(JSON.parse(this.responseText));
                }
            };
        })

    },
    get(url) {
        return new Promise((success, fail) => {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.withCredentials = true;
            xhr.send();
            xhr.onreadystatechange = function() {
                if (this.readyState != 4) return;
                if (this.status != 200) {
                    fail(JSON.parse(this.responseText));
                    console.error('error: ' + (this.status ? this.statusText : 'request failed'));
                } else {
                    success(JSON.parse(this.responseText));
                }
            };
        })

    }

};

module.exports = networkTools;