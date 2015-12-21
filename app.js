var clipboard = require('electron').clipboard;

var HipClip = Object.create({}),
  _Storage = Object.create({});

HipClip._init = function() {
  //clean storage for expired items
  //load existing items
  //start watcher
};

HipClip.watch = function() {
  //watch clipboard
};

HipClip.readBoard = function() {
  //if new copy
    //if text/image
      //captureboard
};

HipClip.captureBoard = function() {
  //capture clipboard item
  //pass data & type to _Storage
};

HipClip.populate = function() {
  //get all items from localStorage
  //render items to DOM
};

_Storage.new = function(data, type) {
  //store item in localStorage {id,timestamp,data,type}
};

_Storage.remove = function(id) {
  //remove item by id
};

_Storage.get = function(id) {
  //return item by id
};

_Storage.getAll = function() {
  //return all items in localStorage
};

_Storage.getMostRecentItem = function() {
  //return most recent item
};

_Storage.clean = function() {
  //get current time
  //loop through localStorage and remove expired items
};
