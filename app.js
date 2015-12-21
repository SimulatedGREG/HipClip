var clipboard = require('electron').clipboard;

var HipClip = Object.create({}),
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
  var items = _Storage.getAll();
  //render items to DOM
};

_Storage.new = function(data, format) {
  var t = Date.now();
  localStorage.setItem(t, data);
};

_Storage.remove = function(id) {
  localStorage.removeItem(id);
};

_Storage.get = function(id) {
  return localStorage.getItem(id);
};

_Storage.getAll = function() {
  var items = [];
  for(var i = 0, len = localStorage.length; i < len; i++) {
    try {
      items.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
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

_Storage.genId = function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4();
};

_Storage.removeAll = function() {
  localStorage.clear();
};

HipClip._init();
