var clipboard = require('electron').clipboard;
var $ = require('jquery');

var HipClip = Object.create({
  dom: new Vue({
    el: '#list',
    items: [],
    methods: {
      refresh: function() {
        this.items = _Storage.getAll();
      }
    }
  })
}),
  _Storage = Object.create({});

HipClip._init = function() {
  _Storage.clean();

  this.populate();
  this.watch();
};


// TODO: figure out this this
HipClip.watch = function() {
  var watcher = setInterval(function() {
    HipClip.readBoard();
  }, 200);
};

// TODO: support html format eventually
HipClip.readBoard = function() {
  if(clipboard.availableFormats().length > 0) {
    var format = clipboard.availableFormats()[0].split('/')[0],
      item = (format == 'text') ? clipboard.readText() : clipboard.readImage().toDataUrl();
    if(_Storage.getLastItem() === null || item != _Storage.getLastItem())
      this.captureBoard(item, format);
  }
};

HipClip.captureBoard = function(data, format) {
  if(format == 'image')
    data = clipboard.readImage().toDataUrl();
  _Storage.new(data, format);
  HipClip.populate();
};

HipClip.populate = function() {
  this.dom.refresh();
};

_Storage.new = function(data, format) {
  localStorage.setItem(Date.now(), data);
};

_Storage.remove = function(id) {
  localStorage.removeItem(id);
};

_Storage.get = function(id) {
  return localStorage.getItem(id);
};

_Storage.getAll = function() {
  var items = [];
  var patt = new RegExp(/^\s*data:([a-z]+\/[a-z0-9\-]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i);
  for(var i = 0, len = localStorage.length; i < len; i++) {
    try {
      items.push({
        data: localStorage.getItem(localStorage.key(i)),
        format: patt.test(localStorage.getItem(localStorage.key(i))) ? 'image' : 'text'
      });
    } catch(err) {}
  }
  return items;
};

_Storage.getLastItem = function() {
  var len = localStorage.length;
  return (len > 0) ? localStorage.getItem(localStorage.key(len-1)) : null;
};

_Storage.clean = function() {
  //get current time
  //loop through localStorage and remove expired items
};

_Storage.removeAll = function() {
  localStorage.clear();
  HipClip.populate();
};

HipClip._init();
