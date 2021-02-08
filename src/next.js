function create({thisArg}) {
    let app = function () {
        return app.handle(...arguments);
    };
    app.stack = [];
    app.use = function (handle) {
        this.stack.push(handle);
        return this;
    };
    app.handle = function () {
        const args = Array.from(arguments);
        const stack = this.stack;
        let index = 0;
        const next = function (err) {
            const layer = stack[index++];
            if (!layer) {
                console.log('done');
            }
            layer.call(thisArg, next, ...args);
        };
        next();
    };
    return app;
}

module.exports = create;