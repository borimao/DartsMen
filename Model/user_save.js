const fs = require('fs');

const user_save = (name) => {
    if(name){
        let json = fs.readFileSync(`./json/users.json`, {encoding: "utf-8"});
        let obj = JSON.parse(json);
        obj.push({
            name:name
        })
        fs.writeFileSync('./json/users.json', JSON.stringify(obj));
        json = fs.readFileSync(`./json/users.json`, {encoding: "utf-8"});
        obj = JSON.parse(json);
        return obj;
    }else {
        const json = fs.readFileSync(`./json/users.json`, {encoding: "utf-8"});
        const obj = JSON.parse(json);
        return obj;
    }
} 

module.exports = user_save;