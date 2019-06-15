const FlowNext = require('../src/FlowNext');

const taskResolve = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(100);
    }, 1000);
});

const taskReject = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(100);
    }, 1000);
});

const app = { name: 'xesam' };
const flow = new FlowNext({ name: 'onLoad' })
    .next((next, flow, app) => {
        console.log(`next 1#${flow}#${JSON.stringify(app)}`);
        taskResolve.then(() => {
            next(1, 2);
        });
    }).next((next, flow, app, p1_1, p1_2) => {
        console.log(`next 2#${flow}#p1_1 = ${p1_1},p1_2 = ${p1_2}`);
        taskReject.catch(next);
    }).next((next, flow, app) => {
        console.log(`next 3#${flow}#${JSON.stringify(app)}`);
        throw Error('err:404');
    }).next((next, flow, app, msg) => {
        console.log(`next 4#${flow}#${JSON.stringify(app)}#${msg}`);
    }).catch((next, flow, app, err) => {
        console.log(err.message);
        next('no err');
    }).start(app);