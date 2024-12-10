function add() {
	var regex = document.getElementById("regex").value;
	var key = localStorage.length;
	if (!isStored(regex)) {
		document.getElementById("regex").value = '';
		console.log(regex);
		localStorage.setItem(getIdFrom(key), regex);
		createList();
	}
}
function edit(key){
	var id = localStorage.key(key);
	var regex = localStorage.getItem(id);
	document.getElementById("regex").value = regex;
}
function getIdFrom(key)
{
	return 'RI_'+key;
}

function isStored(regex)
{
	for (i = 0; i < localStorage.length; i++) {
		var id = localStorage.key(i);
		var sRegex = localStorage.getItem(id);
		if (sRegex == regex) {
			return true;
		}
	}
	return false;
}
function removeEntry(key)
{
	var id = localStorage.key(key);
	localStorage.removeItem(id);
	if (key != localStorage.length){
		// reorder the list
		for (i = key; i < localStorage.length; i++) {
			var id = localStorage.key(i);
			var regex = localStorage.getItem(id);
			localStorage.removeItem(id);
			localStorage.setItem('RI_'+i, regex);
		}
	}

	createList();
}
function createRow(key, id, regex, evenOdd){
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

function applyEvents(id, key){
	$("#"+id+" .delete").click(function(){
		removeEntry(key);
	});
	$("#"+id+" .edit").click(function(){
		edit(key);
	});
}

function emptyRow(){
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
	
	for (i = 0; i < localStorage.length; i++) {
		var id = localStorage.key(i);
		var item = localStorage.getItem(id);
		if (!item) continue;
		
		var row = createRow(i, id, item, evenOdd);
		table.appendChild(row);
		applyEvents(id, i);
		evenOdd = (evenOdd == "even") ? "odd" : "even";
	}
	
	if(i == 0){
		table.appendChild(emptyRow());
	}
}

init();

function init()
{
	createList();
	$('#add').click(function(){
		add();
	});
}