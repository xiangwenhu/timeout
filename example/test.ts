import timeout from "etimeout"

const t = timeout(1000)

let i = 0;
t.start(function (next) {
    i++;
     console.log(i);
    if (i < 5) {
        next();
    }
})