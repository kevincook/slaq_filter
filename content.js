// ==UserScript==
// @name        SLAQ Filter
// @namespace   kevin_cook
// @description Filter's the SLAQ report
// @include     https://bugzilla.corp.nai.org/bugzilla/apps/SLA/product/*

// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     1
// @grant       none
// ==/UserScript==


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle ( 
    '.greenBg { background: green; } ' +
    '.fixedPendingRelease {	display: none; }' +
    '.notFixedPendingRelease { background: red; }' +
    '.buttonPanel {	top: 0px;	right: 0px; }' +
    '.buttonOn { background: black; color: white; }' +
    '#visibleRowCount {	margin-left: 3px; }'
);

var zNode       = document.createElement ('div');
zNode.innerHTML = '<button id="btn_all" type="button">All</button>'
                + '<button id="btn_fixedPendingRelease" type="button">FPR</button>'
                + '<button id="btn_waitingOnCustomer" type="button">WoC</button>'
                + '<button id="btn_pendingConfirmation" type="button">PC</button>'
                + '<button id="btn_waitingOnSupport" type="button">WoS</button>'
                + '<button id="btn_waitingOnComponent" type="button">WoCo</button>'
                + '<button id="btn_engineeringUnassigned" type="button">EU</button>'
                + '<button id="btn_engineeringAssigned" type="button">EA</button>'
                + '<button id="btn_initial" type="button">Init</button>'
                + '<button id="btn_released" type="buggon">Released</button>'
                + '<span id="visibleRowCount"></span>'
                ;
zNode.setAttribute ('id', 'myContainer');
zNode.setAttribute ('class', 'buttonPanel');

document.getElementById("pagehead").appendChild(zNode);

//document.body.appendChild (zNode);

//--- Activate the newly added button.

document.getElementById ('btn_all').addEventListener(
    "click", ALLClickAction, false
);

document.getElementById ("btn_fixedPendingRelease").addEventListener (
    "click", FPRClickAction, false
);

document.getElementById ("btn_waitingOnCustomer").addEventListener (
    "click", WOCClickAction, false
);

document.getElementById ("btn_pendingConfirmation").addEventListener (
    "click", PCClickAction, false
);

document.getElementById ("btn_waitingOnSupport").addEventListener (
    "click", WOSClickAction, false
);

document.getElementById ("btn_waitingOnComponent").addEventListener (
    "click", WOCOClickAction, false
);

document.getElementById ("btn_engineeringUnassigned").addEventListener (
    "click", EUClickAction, false
);

document.getElementById ("btn_engineeringAssigned").addEventListener (
    "click", EAClickAction, false
);

document.getElementById ("btn_initial").addEventListener (
    "click", InitClickAction, false
);

document.getElementById ("btn_released").addEventListener (
    "click", ReleasedClickAction, false
);

function UpdateVisibleRowsCount()
{
	  var numOfVisibleRows = $('table.buglist tr:visible').length - 1;
    console.log('Number of Visible Rows: ' + numOfVisibleRows);

    x = $('table.buglist tr:visible td:nth-child(6)').filter(function(index) {
        return parseInt($(this).text(), 10) > 100;
    });
    
   console.log(x.length);
   
    $(visibleRowCount).text('Visible defect count: ' + numOfVisibleRows + "/" + x.length);
}

UpdateVisibleRowsCount();

function ToggleButton(buttonName, cellValue) {
	queryStr = 'table.buglist td:contains('+ cellValue + ')'; 
	if( $(buttonName).hasClass("buttonOn") ) {
		console.log('Turning off button:' + buttonName);
		$(queryStr).parent().removeClass("fixedPendingRelease");
		$(buttonName).removeClass("buttonOn");
	}else {
		console.log('Turning on button:' + buttonName);
		$(queryStr).parent().addClass("fixedPendingRelease");
		$(buttonName).addClass("buttonOn");
	}

	UpdateVisibleRowsCount();
}

function ALLClickAction (zEvent) {
	ToggleButton('#btn_fixedPendingRelease', 'Fixed Pending Release');
	ToggleButton('#btn_waitingOnCustomer', 'Waiting on Customer');
	ToggleButton('#btn_pendingConfirmation', 'Pending Confirmation');
	ToggleButton('#btn_waitingOnSupport', 'Waiting on Support');
	ToggleButton('#btn_waitingOnComponent', 'Waiting on Component');
	ToggleButton('#btn_engineeringUnassigned', 'Engineering Unassigned');
	ToggleButton('#btn_engineeringAssigned', 'Engineering Assigned');
	ToggleButton('#btn_initial', 'Initial');
  ToggleButton('#btn_released', 'Released');  
}

function FPRClickAction (zEvent) {
	ToggleButton('#btn_fixedPendingRelease', 'Fixed Pending Release');
}

function WOCClickAction (zEvent) {
	ToggleButton('#btn_waitingOnCustomer', 'Waiting on Customer');
}

function PCClickAction (zEvent) {
	ToggleButton('#btn_pendingConfirmation', 'Pending Confirmation');
}

function WOSClickAction (zEvent) {
	ToggleButton('#btn_waitingOnSupport', 'Waiting on Support');
}

function WOCOClickAction (zEvent) {
	ToggleButton('#btn_waitingOnComponent', 'Waiting on Component');
}

function EUClickAction (zEvent) {
	ToggleButton('#btn_engineeringUnassigned', 'Engineering Unassigned');
}

function EAClickAction (zEvent) {
	ToggleButton('#btn_engineeringAssigned', 'Engineering Assigned');
}

function InitClickAction (zEvent) {
	ToggleButton('#btn_initial', 'Initial');
}

function ReleasedClickAction (zEvent) {
    ToggleButton('#btn_released', 'Released');
}
