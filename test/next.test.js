const next = require('../index');

describe('basic', () => {
    it('nothing', done => {
        const app = next();
        app({
            friends: []
        }).then(res => {
            expect(res).toEqual({
                friends: []
            });
            done();
        });
    });
    it('use sync function', done => {
        const app = next().use(data => {
            data.friends.push('Java');
            return data;
        });
        app({
            friends: []
        }).then(res => {
            expect(res).toEqual({
                friends: ['Java']
            });
            done();
        });
    });
    it('use async function', done => {
        const app = next().use(data => {
            return new Promise(resolve => {
                setTimeout(function () {
                    data.friends.push('Python');
                    resolve(data);
                }, 1000);
            });
        });
        app({
            friends: []
        }).then(res => {
            expect(res).toEqual({
                friends: ['Python']
            });
            done();
        });
    });
    it('use hybrid function', done => {
        const app = next().use(data => {
            data.friends.push('Java');
            return data;
        }).use(data => {
            return new Promise(resolve => {
                setTimeout(function () {
                    data.friends.push('Python');
                    resolve(data);
                }, 1000);
            });
        });
        app({
            friends: []
        }).then(res => {
            expect(res).toEqual({
                friends: ['Java', 'Python']
            });
            done();
        });
    });
});