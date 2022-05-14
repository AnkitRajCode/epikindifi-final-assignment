var title = ["Book1", "Book2", "Book3", "Book4", "Book5", "Book6"];
var author = ["Author1", "Author2", "Author3", "Author4", "Author5", "Author6"];
var lender = ["UserC", "UserC", "UserD", "UserA", "UserA", "UserB"];
var borrower = ["UserB", "-", "UserC", "-", "-", "UserA"];
var action = "-";
var user = ["UserA", "UserB", "UserC", "UserD"];
var loginflag = 0;
var username;
var message = document.getElementById("logged-in-user-name");
message.innerHTML = "No user logged in";

function addDataRow(i) {
    var tableRef = document.getElementById("info-table");
    var newRow = tableRef.insertRow(-1);
    for (var j = 0; j < 6; j++) {
        var newCell = newRow.insertCell(j);
        if (j === 0)
            newCell.innerHTML = i + 1;
        if (j === 1)
            newCell.innerHTML = title[i];
        if (j === 2)
            newCell.innerHTML = author[i];
        if (j === 3)
            newCell.innerHTML = lender[i];
        if (j === 4)
            newCell.innerHTML = borrower[i];
        if (j === 5)
            newCell.innerHTML = action;
    }
}
for (var i = 0; i < 6; i++) {
    addDataRow(i);
}



function changeLoggedInUser() {
    if (username === document.getElementById("logged-user").value && user.indexOf(username) !== -1) {
        alert("User has already logged in!!!");
    } else {
        username = document.getElementById("logged-user").value;
        var message = document.getElementById("logged-in-user-name");
        if (user.indexOf(username) === -1) {
            message.innerHTML = "No user logged in";
            if (loginflag === 1) {
                var tableRef = document.getElementById("info-table");
                var rowCount = tableRef.rows.length;
                tableRef.deleteRow(rowCount - 1);
                loginflag = 0;
            }
            var tableRef = document.getElementById("info-table");
            for (var i = 1; i < tableRef.rows.length; i++) {
                tableRef.rows[i].cells[5].innerHTML = "-";
            }
        } else {
            message.innerHTML = ` <b>Logged in user: ${username} </b>`;
            if (loginflag === 0) {
                addBookRow(username);
                loginflag = 1;
            }
            if (loginflag === 1) {
                var tableRef = document.getElementById("info-table");
                var rowCount = tableRef.rows.length;
                tableRef.deleteRow(rowCount - 1);
                addBookRow(username);
            }
            var tableRef = document.getElementById("info-table");
            for (var i = 1; i < tableRef.rows.length - 1; i++) {
                if (tableRef.rows[i].cells[4].textContent === username && tableRef.rows[i].cells[5].textContent === "-") {
                    tableRef.rows[i].cells[5].innerHTML = `<button id="return" onclick="returnClick(${i})">Return</button>`;
                } else if (tableRef.rows[i].cells[4].textContent === "-" && tableRef.rows[i].cells[3].textContent !== username) {
                    tableRef.rows[i].cells[5].innerHTML = `<button id="borrow" onclick="borrowClick(${i})">Borrow</button>`;
                } else {
                    tableRef.rows[i].cells[5].innerHTML = "-";
                }
            }
        }
    }
}

function addNewBook() {
    console.log("daskhcahd");
    var titleName = document.getElementById("titleId").value;

    var authorName = document.getElementById("authorId").value;
    if (titleName.length > 0 && authorName.length > 0 && title.indexOf(titleName) === -1) {
        title.push(titleName);
        var tableRef = document.getElementById("info-table");
        var rowCount = tableRef.rows.length;
        tableRef.deleteRow(rowCount - 1);
        tableRef.insertRow(-1).innerHTML = `<tr><td>${tableRef.rows.length-1}</td>
            <td>${titleName}</td>
    <td>${authorName}</td>
    <td>${username}</td>
    <td>-</td>
    <td>-</td>
        </tr>`;
        addBookRow(username);
    } else if (title.indexOf(titleName) !== -1) {
        alert("Book already available!!!");
    } else {
        if (titleName.length === 0 && authorName.length === 0)

            alert("Enter the author and book name!!!");
        else if (authorName.length === 0)
            alert("Enter the author name of the book!!!");
        else
            alert("Enter the title of Book!!!");
    }
}

function addBookRow(username) {
    var tableRef = document.getElementById("info-table");
    tableRef.insertRow(-1).innerHTML =
        `<tr><td>${tableRef.rows.length-1}</td>
        <td><input type="text" id="titleId"  placeholder="title"></td>
<td><input type="text" id="authorId"  placeholder="author"></td>
<td>${username}</td>
<td>-</td>
<td><button id="addbook" onclick="addNewBook()">Add book</button></td> 
</tr>`;
}

function returnClick(i) {
    document.getElementById("info-table").rows[i].cells[5].innerHTML = `<button id="borrow" onclick="borrowClick(${i})">Borrow</button>`;
    document.getElementById("info-table").rows[i].cells[4].innerHTML = "-";
}

function borrowClick(i) {
    document.getElementById("info-table").rows[i].cells[5].innerHTML = `<button id="return" onclick="returnClick(${i})">Return</button>`;
    document.getElementById("info-table").rows[i].cells[4].innerHTML = username;
}
