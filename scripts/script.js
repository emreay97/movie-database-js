// Don't mind the code its still needs refactoring


var element = document.querySelector("tbody");
console.log(element.nodeName)


// Is called when a cell in the first row is pressed with Enter.
function enterPressRow(event) {
    if (event.key === "Enter" || event.keyCode === 13) {
        applyNewData()
    }
}

let ulNode = null
let hamburgerButton = null;

clickedAtHamburger()
function clickedAtHamburger() {
    let hamburgerButton = document.getElementById("hamburger");

    hamburgerButton.addEventListener("mouseover", function () {



        let navContainer = document.getElementById("menubox");
        let ulNode = document.createElement("ul");

        let liNodeMovies = document.createElement("li");
        let aMovies = document.createElement("a")
        aMovies.href = "moviewatchlist.html"
        aMovies.innerHTML = "Movie-Watchlist"
        aMovies.style.textDecoration = "none"
        aMovies.style.color = "white"

        liNodeMovies.appendChild(aMovies)

        let liNodeBooks = document.createElement("li");
        let aBooks = document.createElement("a")
        aBooks.href = "bookswatchlist.html"
        aBooks.innerHTML = "Book-Readlist"
        aBooks.style.textDecoration = "none"
        aBooks.style.color = "white"
        liNodeBooks.appendChild(aBooks)



        let liNodeSeries = document.createElement("li");
        let aSeries = document.createElement("a")
        aSeries.href = "serieswatchlist.html"
        aSeries.innerHTML = "Series-Watchlist"
        aSeries.style.textDecoration = "none"
        aSeries.style.color = "white"
        liNodeSeries.appendChild(aSeries)

        ulNode.appendChild(liNodeMovies);
        ulNode.appendChild(liNodeBooks);
        ulNode.appendChild(liNodeSeries);

        ulNode.id = "ulID";

        ulNode.style.position = "absolute";
        ulNode.style.right = "0em";
        ulNode.style.top = "1em";
        ulNode.style.listStyle = "none";
        ulNode.style.padding = "0";
        ulNode.style.backgroundColor = "rgba(24, 196, 164, 0.733)";

        ulNode.style.opacity = "100%";
        ulNode.style.width = "auto";
        ulNode.style.borderRadius = "4px";
        ulNode.style.fontSize = "2em"

        navContainer.appendChild(ulNode);

        // Event-Listener für das Menü, um das Entfernen zu verhindern, wenn sich die Maus darüber befindet
        ulNode.addEventListener("mouseover", function () {
            clearTimeout(ulNode.hideTimeout);
        });

        ulNode.addEventListener("mouseout", function () {
            ulNode.hideTimeout = setTimeout(function () {
                ulNode.remove();
            }, 100);
        });
    });

    hamburgerButton.addEventListener("mouseout", function () {
        let ulNode = document.getElementById("ulID");
        if (ulNode) {
            // Timeout setzen, um sicherzustellen, dass das Menü nicht sofort verschwindet
            ulNode.hideTimeout = setTimeout(function () {
                ulNode.remove();
            }, 100);
        }
    });
}





function applyNewData() {
    let dataArr = []

    dataArr[0] = document.getElementById("inputfield-title").value
    dataArr[1] = document.getElementById("inputfield-year").value
    dataArr[2] = document.getElementById("inputfield-rating").value


    // Checks for empty cells in the first row
    for (let i = 0; i < dataArr.length; i++) {

        if (isEmpty(dataArr[i])) {

            alert("Cells must be filled");

            return;
        }


    }
    if (!isInputValid()) {
        return;
    }

    // Iterates through the cells of the first row and adds them to a new row -> append_line(data)
    let tableRow = document.createElement("tr")
    for (let i = 0; i < dataArr.length; i++) {
        append_line(dataArr[i], tableRow)
    }

    // Adds a new line a button
    addRemoveButton(tableRow)

    // Append the new row to the table body
    element.appendChild(tableRow);
    clearInputFields();

    // Set cursor to the first input field
    document.getElementById("inputfield-title").focus();
}

// Clear cells of the first row after the operation
function clearInputFields() {
    document.getElementById("inputfield-title").value = '';
    document.getElementById("inputfield-year").value = '';
    document.getElementById("inputfield-rating").value = '';


}

// checks for invalid input
function isInputValid() {

    let dataArr = []

    dataArr[0] = document.getElementById("inputfield-title").value
    dataArr[1] = document.getElementById("inputfield-year").value
    dataArr[2] = document.getElementById("inputfield-rating").value

    // local time should change with a more reliable api
    if (dataArr[1] < 1888 || dataArr[1] > new Date().getFullYear()) {
        alert("Invalid year");
        return false;
    }

    if (dataArr[2] < 0 || dataArr[2] > 10) {
        alert("Invalid rating range");
        return false;
    }
    return true;

}

function isEmpty(data) {
    if (data.length === 0) {
        return true;
    }

    return false;
}

function append_line(data, row) {
    let tableData = document.createElement("td");
    tableData.innerText = data;
    row.appendChild(tableData);
}


// Remove row on button click
function removeRow(btn) {
    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

// Add Button
function addRemoveButton(row) {
    // Add the 'Remove' button
    let removeCell = row.insertCell();
    let btn = document.createElement('button');
    btn.type = "button";
    btn.textContent = 'X';
    btn.className = "removeButton";
    
    btn.onclick = function () { removeRow(btn); };
    removeCell.appendChild(btn);
}



/*
Bubble sort algorithm. Title corresponds to column 0. The respective column is sorted according to the clicked column.
The rows are iterated through, during the iteration a cell is compared with the neighboring cell.
Through a callback, the method is called until the list is completely sorted.
To illustrate rows[i].children[col] corresponds to [row][column]
*/
function sortColumn(col) {
    let sorted = false
    let rows = document.querySelectorAll("tr")
    // Starts at the second row
    for (let i = 2; i < rows.length - 1; i++) {
        // Columns with numbers
        if (col > 1) {
            if (Number(rows[i].children[col].innerHTML) > Number(rows[i + 1].children[col].innerHTML)) {
                element.insertBefore(rows[i + 1], rows[i]);
                sorted = true
            }
        }
        // Columns with strings
        else if (col < 2) {

            if ((String(rows[i].children[col].innerText).localeCompare(String(rows[i + 1].children[col].innerText))) > 0) {

                element.insertBefore(rows[i + 1], rows[i]);
                sorted = true
            }
        }
    }

    if (sorted) {
        setTimeout(sortColumn(col), 1000)
    } else {
        return;
    }
}
