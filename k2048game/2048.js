var board;
var score = 0;
var rows = 4;
var columns = 4;

window.onload = function(){
    setGame();
    document.addEventListener('keydown', handleKeyPress);
}

function setGame(){
    board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ];

    score = 0;
    document.getElementById('score').innerText = score;

    generateTile();
    generateTile();
    updateBoard();
}

function generateTile(){
    let emptyCells = [];
    for(let r = 0; r < rows; r++){
        for(let c = 0; c < columns; c++){
            if(board[r][c] === 0){
                emptyCells.push({r, c});
            }
        }
    }

    if(emptyCells.length > 0){
        let randomIndex = Math.floor(Math.random() * emptyCells.length);
        let {r, c} = emptyCells[randomIndex];
        board[r][c] = Math.random() < 0.9 ? 2 : 4;
    }
}

function updateBoard(){
    let boardDiv = document.getElementById("board");
    boardDiv.innerHTML = '';

    for(let r = 0; r < rows; r++){
        for(let c = 0; c < columns; c++){
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            boardDiv.appendChild(tile);
        }
    }
}

function updateTile(tile, num){
    tile.innerText = "";
    tile.className = "tile";

    if(num > 0){
        tile.innerText = num;
        if(num <= 4096){
            tile.classList.add("x"+num.toString());
        }
        else{
            tile.classList.add("x8192");
        }
    }
}

function handleKeyPress(e){
    let moved = false;
    switch(e.key){
        case 'ArrowUp':
            moved = moveUp();
            break;
        case 'ArrowDown':
            moved = moveDown();
            break;
        case 'ArrowLeft':
            moved = moveLeft();
            break;
        case 'ArrowRight':
            moved = moveRight();
            break;
    }

    if(moved){
        generateTile();
        updateBoard();
    }
}

function moveUp(){
    let moved = false;

    for(let c = 0; c < columns; c++){
        let stack = [];
        for(let r = 0; r < rows; r++){
            if(board[r][c] !== 0){
                stack.push(board[r][c]);
            }
        }

        let newStack = [];
        while(stack.length > 0){
            let value = stack.shift();
            if(stack.length > 0 && stack[0] === value){
                newStack.push(value * 2);
                score += value * 2;
                stack.shift();
            } else {
                newStack.push(value);
            }
        }

        while(newStack.length < rows){
            newStack.push(0);
        }

        for(let r = 0; r < rows; r++){
            if(board[r][c] !== newStack[r]){
                moved = true;
            }
            board[r][c] = newStack[r];
        }
    }

    document.getElementById('score').innerText = score;
    return moved;
}

function moveDown(){
    let moved = false;

    for(let c = 0; c < columns; c++){
        let stack = [];
        for(let r = rows - 1; r >= 0; r--){
            if(board[r][c] !== 0){
                stack.push(board[r][c]);
            }
        }

        let newStack = [];
        while(stack.length > 0){
            let value = stack.shift();
            if(stack.length > 0 && stack[0] === value){
                newStack.push(value * 2);
                score += value * 2;
                stack.shift();
            } else {
                newStack.push(value);
            }
        }

        while(newStack.length < rows){
            newStack.push(0);
        }

        for(let r = rows - 1; r >= 0; r--){
            if(board[r][c] !== newStack[rows - 1 - r]){
                moved = true;
            }
            board[r][c] = newStack[rows - 1 - r];
        }
    }

    document.getElementById('score').innerText = score;
    return moved;
}

function moveLeft(){
    let moved = false;

    for(let r = 0; r < rows; r++){
        let stack = [];
        for(let c = 0; c < columns; c++){
            if(board[r][c] !== 0){
                stack.push(board[r][c]);
            }
        }

        let newStack = [];
        while(stack.length > 0){
            let value = stack.shift();
            if(stack.length > 0 && stack[0] === value){
                newStack.push(value * 2);
                score += value * 2;
                stack.shift();
            } else {
                newStack.push(value);
            }
        }

        while(newStack.length < columns){
            newStack.push(0);
        }

        for(let c = 0; c < columns; c++){
            if(board[r][c] !== newStack[c]){
                moved = true;
            }
            board[r][c] = newStack[c];
        }
    }

    document.getElementById('score').innerText = score;
    return moved;
}

function moveRight(){
    let moved = false;

    for(let r = 0; r < rows; r++){
        let stack = [];
        for(let c = columns - 1; c >= 0; c--){
            if(board[r][c] !== 0){
                stack.push(board[r][c]);
            }
        }

        let newStack = [];
        while(stack.length > 0){
            let value = stack.shift();
            if(stack.length > 0 && stack[0] === value){
                newStack.push(value * 2);
                score += value * 2;
                stack.shift();
            } else {
                newStack.push(value);
            }
        }

        while(newStack.length < columns){
            newStack.push(0);
        }

        for(let c = columns - 1; c >= 0; c--){
            if(board[r][c] !== newStack[columns - 1 - c]){
                moved = true;
            }
            board[r][c] = newStack[columns - 1 - c];
        }
    }

    document.getElementById('score').innerText = score;
    return moved;
}
