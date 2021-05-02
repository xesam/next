# next.js

## install

```shell script
    npm install @xesam/next
```

## usage

```javascript
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
            console.log(res);// {friends: ['Java', 'Python']}
        });
```