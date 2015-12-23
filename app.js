var remote = require('electron').remote;
var BrowserWindow = remote.BrowserWindow;
var clipboard = require('electron').clipboard;
var nativeImage = require('electron').nativeImage;
var $ = require('jquery');

BrowserWindow.getAllWindows()[0].on('focus', function() {
  HipClip.populate();
  $('#list').scrollTop(0);
});

var HipClip = Object.create({
  dom: new Vue({
    el: '#list',
    data: {
      items: [],
      selectedIndex: 0
    },
    methods: {
      refresh: function() {
        this.items = _Storage.getAll();
        this.items = this.items.reverse();
        this.items[0].selected = 'selected';
        this.selectedIndex = 0;
      },
      copy: function(i) {
        HipClip.writeCopy(i);
      }
    }
  })
}),
  _Storage = Object.create({});

HipClip._init = function() {
  _Storage.clean();
  this.binders();
  this.watch();
};

// TODO: figure out this this
HipClip.watch = function() {
  var watchInterval = setInterval(function() {
    HipClip.readBoard();
  }, 200);
};

// TODO: support html format eventually
HipClip.readBoard = function() {
  if(clipboard.availableFormats().length > 0) {
    var format = clipboard.availableFormats()[0].split('/')[0],
      item = (format == 'text') ? clipboard.readText() : clipboard.readImage().toDataUrl();
    if(_Storage.getLastItem() === null || !_Storage.search(item))
      this.captureBoard(item, format);
  }
};

HipClip.captureBoard = function(data, format) {
  if(format == 'image')
    data = clipboard.readImage().toDataUrl();
  _Storage.new(data, format);
};

HipClip.writeCopy = function(i) {
  switch(this.dom.items[i].format) {
    case 'text':
      clipboard.writeText(this.dom.items[i].data);
      break;
    case 'image':
      clipboard.writeImage(nativeImage.createFromDataURL(this.dom.items[i].data));
      break;
  }
  BrowserWindow.getAllWindows()[0].hide();
};

HipClip.populate = function() {
  this.dom.refresh();
};

HipClip.binders = function() {
  // $(document).on('mouseenter', '.list-item', function() {
  //   $(this).addClass('selected');
  // });
  // $(document).on('mouseleave', '.list-item', function() {
  //   $(this).removeClass('selected');
  // });

  $(document).on('keydown', function(e) {
    var d = null;
    switch(e.which) {
      case 38: //up
        d = -1;
        break;
      case 40: //down
        d = 1;
        break;
      case 13: //enter
        HipClip.writeCopy(HipClip.dom.selectedIndex);
        break;
      case 27: //escape
        BrowserWindow.getAllWindows()[0].hide();
        break;
    }
    if(d !== null && typeof HipClip.dom.items[HipClip.dom.selectedIndex+d] !== 'undefined') {
      HipClip.dom.items[HipClip.dom.selectedIndex].selected = '';
      HipClip.dom.items[HipClip.dom.selectedIndex+d].selected = 'selected';
      HipClip.dom.selectedIndex = HipClip.dom.selectedIndex+d;
      $('#list').scrollTop($('.selected').offset().bottom);
    }


  });
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
        format: patt.test(localStorage.getItem(localStorage.key(i))) ? 'image' : 'text',
        selected: ''
      });
    } catch(err) {}
  }
  return items;
};

_Storage.getLastItem = function() {
  var len = localStorage.length;
  return (len > 0) ? localStorage.getItem(localStorage.key(len-1)) : null;
};

_Storage.search = function(data) {
  for(var i = 0, len = localStorage.length; i < len; i++) {
    if(data == localStorage.getItem(localStorage.key(i))) {
      return true;
    }
  }

  return false;
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
