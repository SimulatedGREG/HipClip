var clipboard = require('electron').clipboard;

var HipClip = Object.create({}),
  _Storage = Object.create({});

HipClip._init = function() {
  _Storage.clean();

  this.populate();
  this.watch();
};

HipClip.watch = function() {
  var watcher = setInterval(function() {
    if(this.readBoard) this.captureBoard();
  }, 200);
};

HipClip.readBoard = function() {
  //if new item
    //if text/image
      // return true;
    //else
      // return false;
};

HipClip.captureBoard = function() {
  //capture clipboard item
  //pass data & type to _Storage
  HipClip.populate();
};

HipClip.populate = function() {
  var items = _Storage.getAll();
  //render items to DOM
};

_Storage.new = function(data, type) {
  var id = this.genId();
  localStorage.setItem(id, JSON.stringify({
    data: data,
    type: type,
    timestamp: Date.now(),
    id: id
  }));
};

_Storage.remove = function(id) {
  localStorage.removeItem(id);
};

_Storage.get = function(id) {
  return localStorage.getItem(id);
};

_Storage.getAll = function() {
  var items = [];
  for(var i = 0; i < localStorage.length; i++) {
    try {
      items.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    } catch(err) {}
  }
  return items;
};

_Storage.getMostRecentItem = function() {
  return JSON.parse(
    localStorage.getItem(localStorage.key(localStorage.length-1))
  );
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

HipClip._init();
