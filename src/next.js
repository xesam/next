function create() {
    let app = function () {
        return app.handle(...arguments);
    };
    app.stack = [];
    app.use = function (handle) {
        this.stack.push(handle);
        return this;
    };
    app.handle = function (data) {
        const stack = this.stack;
        let index = 0;
        const next = function (res) {
            const layer = stack[index++];
            if (!layer) {
                return Promise.resolve(res);
            }
            const ret = layer.call(layer, res);
            if (ret && ret.then) {
                return ret.then(next);
            } else {
                return next.call(next, ret);
            }
        };
        return next.call(next, data);
    };
    return app;
}

module.exports = create;