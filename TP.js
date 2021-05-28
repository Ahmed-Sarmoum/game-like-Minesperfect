// Ahmed SARMOUM

let nbrCellError = 10
let rows = 8 // rows
let column = 8

let stage = [] // game stage
let hideCell = 0

function shooseCell() {
  let row = this.dataset.row
  let col = this.dataset.col;

  // Select cell
  if (stage[row][col].m) {
    this.classList.add("boom");
    let state = document.getElementById("state_game")
    state.innerHTML = "GAME OVER"
    setTimeout(function () {
      alert("Opps. You lost.");
      initialaze();
    }, 1);
  } else {
    //  wich cell should automatic show it
    let allCellShow = [], // all cell to show it
      toCheck = [], // all cell to check it
      checked = []; // Cell already checked
    for (let i = 0; i < rows; i++) {
      checked.push({});
    }
    toCheck.push([row, col]);

    
    while (toCheck.length > 0) {
      let thisRow = parseInt(toCheck[0][0])
      let thisCol = parseInt(toCheck[0][1]);
      console.log('====================================');
      console.log(thisRow, thisCol);
      console.log('====================================');

      //already show it do nothing
      if (stage[thisRow][thisCol].m || stage[thisRow][thisCol].r) {} else {
      
        if (!checked[thisRow][thisCol]) {
          allCellShow.push([thisRow, thisCol]);
        }

        // check neighbour
        if (stage[thisRow][thisCol].a == 0) {
          let lastRow = thisRow - 1
          let nextRow = thisRow + 1
          let lastCol = thisCol - 1
          let nextCol = thisCol + 1
          if (nextRow == rows) {
            nextRow = -1;
          }
          if (nextCol == column) {
            nextCol = -1;
          }

          if (lastRow != -1) {
            if (lastCol != -1 && !checked[lastRow][lastCol]) {
              toCheck.push([lastRow, lastCol]);
            }
            if (nextCol != -1 && !checked[lastRow][nextCol]) {
              toCheck.push([lastRow, nextCol]);
            }
          }

          if (nextRow != -1) {
            if (lastCol != -1 && !checked[nextRow][lastCol]) {
              toCheck.push([nextRow, lastCol]);
            }
            if (nextCol != -1 && !checked[nextRow][nextCol]) {
              toCheck.push([nextRow, nextCol]);
            }
          }
        }
      }

      // check next cell
      checked[thisRow][thisCol] = true;

      // console.log('====================================');
      // console.log(allCellShow, 
      //   toCheck + "  " +
      //   +"  "+checked);
      // console.log('====================================');

      toCheck.shift();
    }

    if (allCellShow.length > 0) {
      for (let cell of allCellShow) {
        let thisRow = parseInt(cell[0]);
        let thisCol = parseInt(cell[1]);
        stage[thisRow][thisCol].r = true;
  
        stage[thisRow][thisCol].c.classList.add("reveal");
        hideCell -= 1;
      }
    }
    if (hideCell == nbrCellError) {
      alert("YOU WIN!");
      initialaze();
    }
  }
}


function initialaze() {
  stage = [];
  hideCell = rows * column;

  let tp = document.getElementById("tp_game")
  let start = document.getElementById("state_game")
  let cssWidth = 100 / column;
  tp.innerHTML = "";
  start.innerHTML = "START GAME"

  //generate cells
  for (let row = 0; row < rows; row++) {
    stage.push([]);
    for (let col = 0; col < column; col++) {
      
      stage[row].push({
        r: false, // cell is show it?
        m: false, // cell has error 
        a: 0, // nbr of adjacent cell
        c: document.createElement("div") 
      });

      let cell = stage[row][col].c;
      cell.classList.add("cell");
      cell.id = "" + row + "-" + col;
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.addEventListener("click", shooseCell);
      cell.style.width = cssWidth + "%";
      cell.innerHTML = "&nbsp;";
      tp.appendChild(cell);
    }
  }

  // Random add cells error 
  let mRow = rows - 1
  let mCol = column - 1
  let mToLay = nbrCellError
  while (mToLay > 0) {
    let row = Math.floor(Math.random() * mRow);
    let col = Math.floor(Math.random() * mCol);
    if (!stage[row][col].m) {
      stage[row][col].m = true;
      stage[row][col].c.innerHTML = "";
      mToLay--;
    }
  }

  for (let row = 0; row < rows; row++) {
      nextRow = row + 1;
    if (nextRow == rows) {
      nextRow = -1;
    }



    
    for (let col = 0; col < column; col++) {

      let lastCol = col - 1
      let nextCol = col + 1;
      if (nextCol == column) {
        nextCol = -1;
      }

      if (lastCol != -1) {
        if (stage[row][lastCol].m) {
          stage[row][col].a++;
        }
      }
      if (nextCol != -1) {
        if (stage[row][nextCol].m) {
          stage[row][col].a++;
        }
      }

    }
  }
}


window.addEventListener("DOMContentLoaded", initialaze);