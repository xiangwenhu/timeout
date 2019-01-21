## 增强的 timeout

## 用法

```js
var timeout = require("etimeout");

var context = { name: "我的名字" };
const t = timeout(1000, context);

t.start(async function(next) {
    console.log(this.name);
    context.name = "我的名字-" + Date.now();
    next();
});

timeout(5500).start(function() {
    t.cancel();
});
```

## 方法

### start(fn)
fn如下，调用next即可进入下一个timeout周期
```js
function(next){
    ......
    next()
}
```

### cancel
取消

### continue
继续

### setInterval
设置周期

### setContext
设置上下文

## License
MIT
