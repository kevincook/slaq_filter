// alert("hello");

var zNode       = document.createElement ('div');
zNode.innerHTML = '<button id="btn_fixedPendingRelease" type="button">FPR</button>'
                + '<button id="btn_waitingOnCustomer" type="button">WoC</button>'
                + '<button id="btn_pendingConfirmation" type="button">PC</button>'
                + '<button id="btn_waitingOnSupport" type="button">WoS</button>'
                + '<button id="btn_waitingOnComponent" type="button">WoCo</button>'
                + '<button id="btn_engineeringUnassigned" type="button">EU</button>'
                + '<button id="btn_engineeringAssigned" type="button">EA</button>'
                + '<button id="btn_initial" type="button">Init</button>'
                + '<span id="visibleRowCount"></span>'
                ;
zNode.setAttribute ('id', 'myContainer');
zNode.setAttribute ('class', 'buttonPanel');

document.getElementById("pagehead").appendChild(zNode);

//document.body.appendChild (zNode);

//--- Activate the newly added button.
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

function UpdateVisibleRowsCount()
{
	var numOfVisibleRows = $('table.buglist tr:visible').length - 1;
	console.log('Number of Visible Rows: ' + numOfVisibleRows);
	$(visibleRowCount).text('Visible defect count: ' + numOfVisibleRows);
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
