function add() {
  var regex = document.getElementById("regex").value;
  chrome.storage.local.get(null, (items) => {
    var key = Object.keys(items).length;
    if (!isStored(regex, items)) {
      document.getElementById("regex").value = '';
      var id = getIdFrom(key);
      var obj = {};
      obj[id] = regex;
      chrome.storage.local.set(obj, createList);
    }
  });
}

function edit(key) {
  chrome.storage.local.get(key, (items) => {
    var regex = items[key];
    document.getElementById("regex").value = regex;
  });
}

function getIdFrom(key) {
  return 'RI_' + key;
}

function isStored(regex, items) {
  for (var id in items) {
    var sRegex = items[id];
    if (sRegex == regex) {
      return true;
    }
  }
  return false;
}

function removeEntry(key) {
  chrome.storage.local.remove(key, () => {
    chrome.storage.local.get(null, (items) => {
      var newItems = {};
      var i = 0;
      for (var id in items) {
        var regex = items[id];
        newItems[getIdFrom(i)] = regex;
        i++;
      }
      chrome.storage.local.clear(() => {
        chrome.storage.local.set(newItems, createList);
      });
    });
  });
}

function createRow(key, id, regex, evenOdd) {
  var row = document.createElement('div');
  row.className = evenOdd;
  row.id = id;
  var html = regex;
  html += '<a href="#" class="delete" title="delete regex"></a>';
  html += '<a href="#" class="edit" title="edit regex"></a>';
  html += '<div style="clear:both;"></div>';
  row.innerHTML = html;
  return row;
}

function applyEvents(id, key) {
  $("#" + id + " .delete").click(function () {
    removeEntry(key);
  });
  $("#" + id + " .edit").click(function () {
    edit(key);
  });
}

function emptyRow() {
  var row = document.createElement('div');
  row.className = "even";
  var html = "None";
  row.innerHTML = html;
  return row;
}

function createList() {
  var table = document.getElementById('list');
  table.innerHTML = '';

  var evenOdd = "even";

  chrome.storage.local.get(null, (items) => {
    var i = 0;
    for (var id in items) {
      var item = items[id];
      if (!item) continue;

      var row = createRow(i, id, item, evenOdd);
      table.appendChild(row);
      applyEvents(id, id);
      evenOdd = (evenOdd == "even") ? "odd" : "even";
      i++;
    }

    if (i == 0) {
      table.appendChild(emptyRow());
    }
  });
}

function init() {
  createList();
  $('#add').click(function () {
    add();
  });
}

init();