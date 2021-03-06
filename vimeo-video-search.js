var Vimeo = function () {
  this.base_url = "https://api.vimeo.com";
  this.authorization_url = this.base_url + "/oauth/authorize/client";
};

Vimeo.prototype.authenticate = function (config) {
  this.client_id = config.CLIENT_ID;
  this.client_secret = config.CLIENT_SECRET;

  this.request_token();
};

Vimeo.prototype.videos = function (query, args) {
  var a = HTTP.get(this.base_url + "/videos", {
    params: _.extend({query: query, page: 1, per_page: 10}, args || {}),
    headers: {'Authorization': 'bearer ' + this.token}
  });

  return JSON.parse(a.content);
};

Vimeo.prototype.videosRelated = function (videoId, args) {
  // body...
};

Vimeo.prototype.request_token = function () {
  var a = new Buffer(this.client_id + ':' + this.client_secret).toString('base64');
  var result = HTTP.post(this.authorization_url, {
    params: {grant_type: 'client_credentials'},
    headers: {'Authorization': 'basic ' + a}
  });

  this.token = result.data.access_token;
};

VimeoApi = new Vimeo();
