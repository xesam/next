const next = require('../src/index');

const app = next();
app.use(function (next, option) {
    option.friends.push('a');
    next();
}).use(function (next, option) {
    option.friends.push('b');
    next();
}).use(function (next, option) {
    option.friends.push('c');
    next();
}).use(function (next, option) {
    option.friends.push('d');
    next();
}).use(function (next, option) {
    option.friends.push('e');
    console.log(option);
}).catch(function (err) {
    console.error('error!', err);
});

const opts = {
    name: 'xesam',
    age: 18,
    friends: []
};

app(opts);