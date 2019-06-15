class FlowNext {
    constructor(options = { name: 'Flowable', debug: false }) {
        this._name = options.name;
        this._debug = options.debug;
        this._options = [];
        this._invokers = [];
    }

    _inspect(...logs) {
        if (this._debug) {
            console.log(...logs);
        }
    }

    next(invoker) {
        this._inspect('[next]', invoker);
        this._invokers.push(invoker);
        return this;
    }

    catch(errHandler) {
        this.errHandler = errHandler;
        return this;
    }

    invoke(index, ...options) {
        this._inspect('[invoke]', index, ...options);
        let invoker = this._invokers[index];
        if (invoker) {
            let next = this.invoke.bind(this, index + 1);
            try {
                invoker.bind(this, next, ...this._options)(...options);
            } catch (err) {
                this.errHandler && this.errHandler(next, ...this._options, err);
            }
        } else {
            this._inspect('[no next]');
        }
    }

    start(...fixedOptions) {
        this._inspect('[start]', ...fixedOptions);
        this._options = [this, ...fixedOptions];
        this.invoke(0, ...this._options);
    }

    toString() {
        return this._name;
    }
}

module.exports = FlowNext;
