var PubSubService = (function () {
    var self = {};
    self.events = [];
    self.subscribe = function (appName, eventName, callback) {
        if (this.events.filter(x => x.appName !== appName && x.eventName === eventName).length === 0) {
            self.events.push({ appName, eventName, callback });
        }
    }

    self.unsubscribe = function (appName, eventName) {
        var tempEvents = this.events.filter(x => x.appName !== appName && x.eventName !== eventName);
        this.events = tempEvents;
    }

    self.unsubscribeByAppName = function (appName) {
        var tempEvents = this.events.filter(x => x.appName !== appName);
        this.events = tempEvents;
    }

    self.publish = function (eventName, args) {
        this.events.filter(x => x.eventName === eventName).forEach(x => x.callback(args));
    };
    return self;
})();

addEventListener("PubSubService.subscribe", function (args) { PubSubService.subscribe(args.detail.appName, args.detail.eventName, args.detail.callback); });
addEventListener("PubSubService.publish", function (args) { PubSubService.publish(args.detail.eventName, args.detail.args); });