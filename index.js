var slice = Array.prototype.slice;

function Timeout(interval, context) {
    this.context = context || undefined;
    this.ticketId = null;
    this.interval = interval;
}
Timeout.prototype.cancel = function() {
    this.interval && clearTimeout(this.ticketId);
};

Timeout.prototype.innerStart = function() {
    var that = this;
    var next = function() {
        that.next(function() {
            that.excute.apply(that, [next.bind(that)]);
        });
    };
    next.apply(this);
};

Timeout.prototype.excute = function() {
    var params = slice.call(arguments);
    this.fn.apply(this.context, params);
};

Timeout.prototype.next = function(cb) {
    this.ticketId = setTimeout(cb, this.interval);
};

function timeout(interval, context) {
    var instance = new Timeout(interval, context);
    return {
        start: function(callback) {
            instance.cancel();
            instance.fn = null;
            if (typeof callback !== "function") {
                throw new Error("callback should be a function");
            }
            instance.fn = callback;
            instance.innerStart.apply(instance);
        },
        cancel: instance.cancel.bind(instance),
        continue: function() {
            if (instance.fn) {
                instance.innerStart.apply(instance);
            }
        },
        setInterval: function(interval) {
            instance.cancel();
            instance.interval = interval;
            instance.innerStart.apply(instance);
        },
        setContext: function(context) {
            instance.context = context;
        }
    };
}

module.exports = timeout;
module.exports.default = timeout;
