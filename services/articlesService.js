'use strict';

const fs = require('fs');

class ArticlesService {
    getData() {
        return new Promise((resolve,reject) => {
            fs.readFile('./data/items.json', (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                
                try {
                    let json = JSON.parse(data);
                    resolve(json);
                } catch (ex) {
                    reject(ex);
                }
            });
        });
    }
}

module.exports = new ArticlesService();