// Write your code here!
let bookName = [ 'Book1', 'Book2', 'Book3', 'Book4', 'Book5', 'Book6' ];
let author = [ 'Author1', 'Author2', 'Author3', 'Author4', 'Author5', 'Author6' ];
let user = [ 'UserA', 'UserB', 'UserC', 'UserD' ];
let lender = [ 'UserC', 'UserC', 'UserD', 'UserA', 'UserA', 'UserB' ];
let borrower = [ 'UserB', '-', 'UserC', '-', '-', 'UserA' ];
let action = '-';

let buildTable = document.getElementById("info-table");

const tableData = () => {
    for (var i = 0; i < 6; i++) {
        var row = buildTable.insertRow(-1);
        row.innerHTML = `<tr>
            <td>${i+1}</td>
            <td>${bookName[i]}</td>
            <td>${author[i]}</td>
            <td>${lender[i]}</td>
            <td>${borrower[i]}</td>
            <td>${action}</td>
        </tr>`;
    }
}

tableData();

let userlogin = 0;
let userId;
let userHeader = document.getElementById('logged-in-user-name'); 
let loginInput = document.getElementById('logged-user'); 
userHeader.innerHTML = "No user logged in";

const changeLoggedInUser = () => {
    if (userId === loginInput.value && user.indexOf(userId) !== -1) {
        alert("Already logged in!");
    } 
    else {
        userId = loginInput.value;
        if (user.indexOf(userId) === -1) {
            userHeader.innerHTML = "No user logged in";

            if (userlogin === 1){
                let count = buildTable.rows.length;
                buildTable.deleteRow(count - 1);
                userlogin = 0;
            }
            
            for (var i = 1; i < buildTable.rows.length; i++) {
                buildTable.rows[i].cells[5].innerHTML = "-";
            }
        } 
        else{
            userHeader.innerHTML = ` <span>Logged in user: ${userId} </span>`;

            if (userlogin === 0) {
                addBookTableRow(userId);
                userlogin = 1;
            }

            if (userlogin === 1) {
                let count = buildTable.rows.length;
                buildTable.deleteRow(count - 1);
                addBookTableRow(userId);
            }
            
            for (var i = 1; i < buildTable.rows.length - 1; i++){
                if(buildTable.rows[i].cells[4].textContent === userId && buildTable.rows[i].cells[5].textContent === "-"){
                    buildTable.rows[i].cells[5].innerHTML = `<button id="return" onclick="returnBtn(${i})">Return</button>`;
                } 
                else if(buildTable.rows[i].cells[4].textContent === "-" && buildTable.rows[i].cells[3].textContent !== userId){
                    buildTable.rows[i].cells[5].innerHTML = `<button id="borrow" onclick="borrowBtn(${i})">Borrow</button>`;
                } 
                else{
                    buildTable.rows[i].cells[5].innerHTML = "-";
                }
            }
        }
    }
}

const newBook = () => {
    let bookTitle = document.getElementById("book-name").value;
    let authorName = document.getElementById("author-name").value;
    if (bookTitle.length > 0 && authorName.length > 0 && bookName.indexOf(bookTitle) === -1) {
        bookName.push(bookTitle);
        let count = buildTable.rows.length;
        buildTable.deleteRow(count - 1);
        buildTable.insertRow(-1).innerHTML = `<tr>
            <td>${buildTable.rows.length-1}</td>
            <td>${bookTitle}</td>
            <td>${authorName}</td>
            <td>${userId}</td>
            <td>-</td>
            <td>-</td>
        </tr>`;
        addBookTableRow(userId);
    } else if (bookName.indexOf(bookTitle) !== -1) {
        alert("Book already exists!");
    } else {
        if (bookTitle.length === 0 && authorName.length === 0){
            alert("Enter The Required field!");
        }
        else if (authorName.length === 0){
            alert("Enter The Author Name!");
        }
        else if (bookTitle.length === 0){
            alert("Enter The Book Title!");
        }
    }
}

const addBookTableRow = (userId) =>  {
    buildTable.insertRow(-1).innerHTML =`<tr>
        <td>${buildTable.rows.length-1}</td>
        <td><input type="text" id="book-name" placeholder="Title" ></td>
        <td><input type="text" id="author-name" placeholder="Author" ></td>
        <td id="lender-name" >${userId}</td>
        <td>-</td>
        <td><button onclick="newBook()" >Add Book</button></td> 
    </tr>`;
}

const returnBtn = (click) => {
    buildTable.rows[click].cells[5].innerHTML = `<button id="borrow" onclick="borrowBtn(${click})" >Borrow</button>`;
    buildTable.rows[click].cells[4].innerHTML = "-";
}

const borrowBtn = (click) => {
    buildTable.rows[click].cells[5].innerHTML = `<button id="return" onclick="returnBtn(${click})" >Return</button>`;
    buildTable.rows[click].cells[4].innerHTML = userId;
}