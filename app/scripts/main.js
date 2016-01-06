/* jshint devel:true */

var safariPush = (function () {
  'use strict';

  var $log = $('.log');

  function onLoad() {
    if ('safari' in window && 'pushNotification' in window.safari) {
      $log.append('<p>' + timeStamp() + 'Browser is safari and has support for push notifications</p>');
      var permissionData = window.safari.pushNotification.permission('web.be.vrt.deredactie');
      checkRemotePermission(permissionData);
    } else {
      $log.append('<p>' + timeStamp() + 'Browser is not safari, use safari to proceed. If you are using safari you might not have support for push notifications enabled.</p>');
    }
  }

  function checkRemotePermission(permissionData) {
    $log.append('<p>' + timeStamp() + 'Checking permission for push notification');

    if (permissionData.permission === 'default') {
      $log.append('<p>' + timeStamp() + 'Permission is <strong>default</strong> (first time)</p>');
      $log.append('<p>' + timeStamp() + 'Validating push package before showing request popup...</p>');

      window.safari.pushNotification.requestPermission(
        'https://wingsafariendpoint.herokuapp.com', // The web service URL.
        'web.be.vrt.deredactie',                    // The Website Push ID.
        {},                                         // Data that you choose to send to your server to help you identify the user.
        checkRemotePermission                       // The callback function.
      );
    }
    else if (permissionData.permission === 'denied') {
      $log.append('<p>' + timeStamp() + 'Permission is <strong>denied</strong></p>');
    }
    else if (permissionData.permission === 'granted') {
      $log.append('<p>' + timeStamp() + 'Permission is <strong>granted</strong></p>');
      $log.append('<p>' + timeStamp() + 'User device token is: <strong>' + permissionData.deviceToken + '</strong></p>');
    }
  }

  function timeStamp() {
    var now = new Date(),
      time = [now.getHours(), now.getMinutes(), now.getSeconds()];

    for (var i = 1; i < 3; i++) {
      if (time[i] < 10) {
        time[i] = '0' + time[i];
      }
    }

    return '<i>' + time.join(':') + '</i> ';
  }

  return {
    onLoad: onLoad
  };
}());


(function () {
  'use strict';
  document.body.onload = safariPush.onLoad();
})();
