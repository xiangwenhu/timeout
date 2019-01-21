var timeout = require("../index");

describe("Timeout", function() {
    describe("#start()", function() {
        this.timeout(10000);
        var context = { name: "tom" };
        var t = timeout(1000, context);
        it("this should be equal context", function(done) {
            t.start(function(next) {
                if (this === context) {
                    done();
                    return;
                }
                done("this not equal context");
            });
        });

        var t1 = timeout(1000, context);
        it("should only excute one function", function(done) {
            t1.start(function(next) {
                done("should not ne excuted");
            });

            t1.start(function(next) {
                done();
            });
        });

        var t2 = timeout(1000, context);
        it("interval should be 1000ms", function(done) {
            var times = [Date.now()];
            t2.start(function(next) {
                if (times.length < 5) {
                    times.push(Date.now());
                    next();
                } else {
                    for (var i = 0; i < times.length - 1; i++) {
                        if (Math.abs(times[i + 1] - times[i] - 1000) > 50) {
                            done("interval not neay 1000 ms");
                            return;
                        }
                    }
                    done();
                }
            });
        });
    });

    describe("#cancel()", function() {
        this.timeout(10000);
        var t = timeout(1000, context);
        it("function should not be excuted", function(done) {
            t.start(function(next) {
                done("function should not be excuted");
            });
            t.cancel();
            setTimeout(() => {
                done();
            }, 2000);
        });
    });

    describe("#contiue()", function() {
        this.timeout(10000);
        var t = timeout(1000, context);
        var isDone = false;
        it("after continue function should be excuted", function(done) {
            t.start(function(next) {
                isDone = true;
                done();
            });
            t.cancel();
            setTimeout(() => {
                t.continue();
            }, 2000);
            setTimeout(() => {
                if (!isDone) {
                    done("function not be excuted");
                }
            }, 5000);
        });
    });

    describe("#setInterval()", function() {
        this.timeout(10000);
        var t = timeout(1000, context);
        it("interval should be 2000 ms", function(done) {
            t.setInterval(2000);
            var startTime = Date.now();
            t.start(function(next) {
                var endTime = Date.now();
                if (Math.abs(endTime - startTime - 2000) < 50) {
                    done();
                    return;
                }
                done("interval is not 2000 ms");
            });
        });
    });

    describe("#setContext()", function() {
        this.timeout(10000);
        var context = { name: "tom" };
        var t = timeout(1000, context);
        it("new context should take effect", function(done) {
            t.setContext({
                name: "jim"
            });

            t.start(function(next) {
                if (this.name === "jim") {
                    done();
                    return;
                }
                done("new context don't take effect");
            });
        });
    });
});
