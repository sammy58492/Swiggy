/**
 * Created by liorsion on 8/15/14.
 */
'use strict';

function BringgClient(options) {
  this.accessToken = options.accessToken;
  this.secretKey = options.secretKey;
  this.url = options.url || 'http://api.bringg.com';
  this.CryptoJS = options.CryptoJS;
  this.debug = options.debug || true;
}

BringgClient.prototype.createTask = function(task_details) {
  var uri =this.url + 'partner_api/tasks'
    , request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
    } else {
    }
  };

  var params = this.sign_request(task_details);

  request.open( 'POST', uri, true );
  request.setRequestHeader('Content-type', 'application/json');
  request.send( JSON.stringify(params) );
};

BringgClient.prototype.sign_request = function(params) {
  if (!params.timestamp) {
    params.timestamp = Date.now();
  }
  if (!params.access_token) {
    params.access_token = this.accessToken;
  }

  var query_params = '';

  for (var paramIdx in params) {
    var param = params[paramIdx];
    if (query_params.length > 0) {
      query_params += '&';
    }
    query_params += paramIdx+'='+encodeURIComponent(param);
  }

  if (this.debug) {
    var targetDiv = document.getElementById('query');
    targetDiv.appendChild(document.createTextNode(query_params));
  }

  var signature = CryptoJS.HmacSHA1(query_params, this.secretKey).toString();
  params.signature = signature;
  if (query_params.length > 0) {
    query_params += '&';
  }
  query_params += "signature="+signature;
  if (this.debug) {
    var targetDiv = document.getElementById('signature');
    targetDiv.appendChild(document.createTextNode(signature));
    targetDiv = document.getElementById('final');
    targetDiv.appendChild(document.createTextNode(query_params));
  }
  return params;
};

module.exports = BringgClient;
