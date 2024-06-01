enterMouseClickListener()

// Hier folgt der Code zu Einfügen neuer Filme

var element = document.querySelector("tbody");
console.log(element.nodeName)



// Wird aufgerufen wenn in der ersten Zeile eine Zelle mit Enter betätigt wird.
function enterPressRow(event) {
    if (event.key === "Enter" || event.keyCode === 13) {
       applyNewData()
    }
}

function enterMouseClickListener(){
    const enterButton = document.getElementById("enterButton");
    enterButton.addEventListener("click", function(){
        applyNewData();
    })
}



function applyNewData(){
    let dataArr = []
    
        dataArr[0] = document.getElementById("inputfield-title").value
        dataArr[1] = document.getElementById("inputfield-year").value
        dataArr[2] = document.getElementById("inputfield-rating").value
        
      
        //Prüft nach leeren Zellen in der ersten Zeile
        for (let i = 0; i < dataArr.length; i++) {
            
            if (isEmpty(dataArr[i])) {
               
                alert("Zellen müssen befüllt sein");
                
                return;
            }
            
        }



        //Iteriert durch die Zellen der Ersten Zeile und fügt es in eine neue Zeile ein -> append_line(data)
        let tableRow = document.createElement("tr")
        for (let i = 0; i < dataArr.length; i++) {
            append_line(dataArr[i], tableRow)
        }

        // Adds a new line a button
        addRemoveButton(tableRow)

        // Append the new row to the table body
        element.appendChild(tableRow);
        clearInputFields();

        //Cursor auf das erste EIngabefeld setzen
        document.getElementById("inputfield-title").focus();
}

//Zellen der ersten Zeilen nach der Operation löschen
function clearInputFields() {
    document.getElementById("inputfield-title").value = '';
    document.getElementById("inputfield-year").value = '';
    document.getElementById("inputfield-rating").value = '';
    

}

function append_line(data, row) {
    let tableData = document.createElement("td");
    tableData.innerText = data;
    row.appendChild(tableData);
}

function isEmpty(data) {
    if(data.length === 0){
        return true;
    }

    return false;
}
//Reihe bei ButtonClick entfernen
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
    btn.textContent = 'Remove';
    btn.className = "removeMovie";
    btn.onclick = function () { removeRow(btn); };
    removeCell.appendChild(btn);
}



/*
Bubble-Sort-Algorithmus. Title entspricht Spalte 0. Entsprechend der angeklickten Spalte wird die jeweilige Spalte sortiert.
Die Zeilen werden durch iteriert, während der Iteration wird eine Zelle mit der Nachbars-Zelle verglichen.
Durch ein Callback wird die Methode solange aufgerufen bis die Liste komplett durchsortiert ist.
Zur Verdeutlichung rows[i].children[col] entspricht [Zeile][Spalte]
*/
function sortColumn(col) {
    let sorted = false
    let rows = document.querySelectorAll("tr")
    // Fängt bei der zweiten Zeile an
    for (let i = 2; i < rows.length - 1; i++) {
        // Spalten mit Zahlen
        if (col > 1) {
            if (Number(rows[i].children[col].innerHTML) > Number(rows[i + 1].children[col].innerHTML)) {
                element.insertBefore(rows[i + 1], rows[i]);
                sorted = true
            }
        }
        // Spalten mit Strings
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


