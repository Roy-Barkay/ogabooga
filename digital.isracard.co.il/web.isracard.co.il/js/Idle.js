var Idle = (function () {
  var self = {};

  let idleTimeLocalStorageKey = "idleTime";

  let idleTimerId = null;
  let keepAliveTimerId = null;

  //self.startPreLoginIdler = function () {
  //  self.stop();
  //  // every 30 seconds call increment time func, to check idle.
  //  idleTimerId = setInterval(function () {
  //    timerIncrement("preLogin");
  //  }, 30000);
  //};

  self.startPostLoginIdler = function () {
    self.stop();
    // every 30 seconds call increment time func, to check idle.
    idleTimerId = setInterval(function () {
      timerIncrement("postLogin");
    }, 30000);
    // Call keep alive every 5 minutes.
      keepAliveTimerId = setInterval(keepAlive, 300000 );
  };

  // Reset all intervals and localstorage.
  self.stop = function () {
    localStorage.setItem(idleTimeLocalStorageKey, 0);
    clearInterval(idleTimerId);
    clearInterval(keepAliveTimerId);
  };

  //TODO: Add debounce so localstraoge won't be on every mouse move..
  function resetIdleTime() {
    localStorage.setItem(idleTimeLocalStorageKey, 0);
    dispatchEvent(new Event("idleAppWarningEventHide"));
  }

  function timerIncrement(type) {
    let idleTime;
    // Create localstorage key in case if it doesn't already exists.
    if (!localStorage.getItem(idleTimeLocalStorageKey)) {
      localStorage.setItem(idleTimeLocalStorageKey, 0);
      idleTime = 0;
    } else {
      idleTime = parseInt(localStorage.getItem(idleTimeLocalStorageKey));
    }

    // Increment time.
    idleTime = idleTime + 1;
    // Set idle time in localstorage.
    localStorage.setItem(idleTimeLocalStorageKey, idleTime);

    switch (type) {
      //case "preLogin":
      //  // 9 iterations, 30 secons each equals 270 seconds  = 4.5 minutes
      //  // if it's over 9 iterations, than we must be idle for over 5 minutes, we refresh the page.
      //  if (idleTime > 9) {
      //    window.location.reload();
      //    return;
      //  }
      //  break;
      case "postLogin":
        // 19 iterations, 30 seconds each equals 570 seconds = 9.5 minutes
        // if it's over 19 iterations than we must been idle for 10 minutes or more, we initiate logout sequence.
        if (idleTime > 19) {
          self.stop();
          dispatchEvent(new Event("LogoutEvent"));
          return;
        }
        // 18 iterations, 30 seconds each equals 540 seconds = 9 minutes
        // if it's over 18 iterations than we must been idle for 9.5 minutes, we display idle warrning.
        if (idleTime > 18) {
          dispatchEvent(new Event("idleAppWarningEventShow"));
          return;
        }

        break;
    }
    // Idle time measured in seconds.
    //debugConsole.log(type, 'idleTime', idleTime * 30, 'seconds it is ', new Date());
  }

    function keepAlive() {
        fetch('/keepAlive', {
            method: 'post',
            credentials: 'include'
        })
            .then(
                function (response) {
                    if (response.status === 400) {
                        window.dispatchEvent(new Event('LogoutEvent'));
                    }
                    else if (response.status !== 204) {
                        self.stop();
                        window.dispatchEvent(new CustomEvent('navigationEvent', { detail: { 'url': '' } }));
                    }
                }
            ).catch(function (err) {
                console.log(err);
                window.dispatchEvent(new Event('LogoutEvent'));
            });
    }

  // Throtle func. taken form the following article https://codeburst.io/throttling-and-debouncing-in-javascript-646d076d0a44
  function throttled(delay, fn) {
    let lastCall = 0;
    return function (...args) {
      const now = new Date().getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      return fn(...args);
    };
  }

  // Reset idle time on mouse move, mouse scroll and keyboard press, with 100ms throtle
  // that way event can propagate only 10 times a second, which is good for performance,
  // user won't notice anything which is lower than 100ms, or 100ms..
  const dHandlerInput = throttled(100, resetIdleTime);
  window.addEventListener("keypress", dHandlerInput);

  const dHandlerMousemove = throttled(100, resetIdleTime);
  window.addEventListener("mousemove", dHandlerMousemove);

  const dHandlerWheel = throttled(100, resetIdleTime);
  window.addEventListener("wheel", dHandlerWheel);

  return self;
})();
