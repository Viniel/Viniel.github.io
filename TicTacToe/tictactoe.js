const boxes = Array.from(document.getElementsByClassName('box'));
const playText = document.getElementById('playText');
const restart = document.getElementById('restart');
const spaces = [];
const player1 = "X";
const player2 = "O";

const drawBoard = () => {
    boxes.forEach((box,index) => {
        let styleString = '';
        if (index < 3) {
            styleString += `border-bottom: 3px solid purple;`;
        }
        if (index % 3 === 0) {
            styleString += `border-right: 3px solid purple;`;
        }
        if (index % 3 === 2) {
            styleString += `border-left: 3px solid purple;`;
        }
        if (index > 5) {
            styleString += `border-top: 3px solid purple;`;
        }
        box.style = styleString;
        box.addEventListener('click', boxClicked)
    });
};

const boxClicked = (e) => {
    if (gameStatus) {
        const id = e.target.id;
        if(!spaces[id]) {
            spaces[id] = currentPlayer;
            e.target.innerText = currentPlayer;
            count++;
            console.log(count);
            if(count === 9){
                playText.innerText = 'DRAW'
                return gameStatus = false;
            }
            if(winCondition()){
                playText.innerText = `${currentPlayer} WINS`
                return gameStatus = false;
            }
            currentPlayer = currentPlayer === player1 ? player2: player1;
        }
    }
};

const winCondition = () => {
    if(spaces[0] === currentPlayer) {
        if(spaces[1] === currentPlayer && spaces[2] === currentPlayer) {
            console.log(`${currentPlayer} wins up top.`)
            for (i = 0; i < 3; i++) {
                boxes[i].classList.add('winner')
            }
            return true;
        }
        if(spaces[3] === currentPlayer && spaces[6] === currentPlayer) {
            console.log(`${currentPlayer} wins left side.`)
            for (i = 0; i < 7; i += 3) {
                boxes[i].classList.add('winner')
            }
            return true;
        }
    } 
    if(spaces[8] === currentPlayer) {
        if(spaces[6] === currentPlayer && spaces[7] === currentPlayer) {
            console.log(`${currentPlayer} wins on bottom.`)
            for (i = 6; i < 9; i++) {
                boxes[i].classList.add('winner')
            }
            return true;
        }
        if(spaces[2] === currentPlayer && spaces[5] === currentPlayer) {
            console.log(`${currentPlayer} wins right side.`)
            for (i = 2; i < 9; i += 3) {
                boxes[i].classList.add('winner')
            }
            return true;
        }
    } 
    if(spaces[4] === currentPlayer) {
        if(spaces[3] === currentPlayer && spaces[5] === currentPlayer) {
            console.log(`${currentPlayer} wins in the middle row.`)
            for (i = 3; i < 6; i++) {
                boxes[i].classList.add('winner')
            }
            return true;
        }
        if(spaces[1] === currentPlayer && spaces[7] === currentPlayer) {
            console.log(`${currentPlayer} wins in the middle column.`)
            for (i = 1; i < 8; i += 3) {
                boxes[i].classList.add('winner')
            }
            return true;
        }
        if(spaces[0] === currentPlayer && spaces[8] === currentPlayer) {
            console.log(`${currentPlayer} wins in diagonal.`)
            for (i = 0; i < 9; i += 4) {
                boxes[i].classList.add('winner')
            }
            return true;
        }
        if(spaces[2] === currentPlayer && spaces[6] === currentPlayer) {
            console.log(`${currentPlayer} wins in diagonal.`)
            for (i = 2; i < 7; i += 2) {
                boxes[i].classList.add('winner')
            }
            return true;
        }
    } 
};

const restarts = () => {
    spaces.forEach((space, index) => {
        spaces[index] = null;
    })
    boxes.forEach((box) => {
        box.innerText = '';
    });
    playText.innerText = `Let's Play!`;
    gameStatus = true;
    count = 0;
    currentPlayer = player1;
    for (i = 0; i < 9; i++) {
        boxes[i].classList.remove('winner');
    }
};

restart.addEventListener('click', restarts);

restarts();
drawBoard();

