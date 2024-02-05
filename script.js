function reloadPage(){
    location.reload();
}
function initGame(){
    let growCells =[];
    let row1=[];
    let row2=[];
    let row3=[];
    let row4=[];
    let gameOver = false;
    let score = 0;
    let bestScore = 0;
    const Board = document.getElementById('board').children;
    setBestScore();
    printBestScore();
    initBoard();
    document.addEventListener('keyup', (event)=>{
        if(!gameOver){
            let direction;
            switch(event.keyCode){
                case 38:
                    direction = 'up';
                    break;
                case 40:
                    direction = 'down';
                    break;
                case 39:
                    direction = 'right';
                    break;
                case 37:
                    direction = 'left';
                    break;
            }
            copyRowsToArrays(direction);
            if(piecesCanMove(true , direction)){
                setRowsTOCorrectPosition(direction);
                setTimeout(()=>{
                    printBoard();
                    addAnotherCell();
                    if(pleyerWon()){
                        gameOver = true;
                        setTimeout(()=>{document.getElementById("win-game").style.display = "grid";},1000);
                    }
                    else if(playerLost()){
                        gameOver = true;
                        setTimeout(()=>{document.getElementById("game-over").style.display = "grid";},1000);
                    } 
                    addScore();
                },130);
            }
        }
    });
    function initBoard(){
        clearAllClasses();
        addAnotherCell();
        addAnotherCell();
    }
    function clearAllClasses(){
        for(let i =0 ; i<16 ; i++)
            Board[i].className = '';
    }
    function printBestScore(){
        document.getElementById("bestscore").innerHTML = localStorage.best;
    }
    function setBestScore(){
        if(localStorage.bestScore)
            bestScore = localStorage.bestScore;  
        else
            localStorage.bestScore = bestScore;
    }
    function addScore(){
        scoreToAdd = getNewScore();
        if(scoreToAdd > 0)
            printNewScore(scoreToAdd);
        if(score > bestScore){
            bestScore = score;
            printBestScore();
            localStorage.bestScore = bestScore;
        }
    }
    function printNewScore(scoreToAdd){
        document.getElementById("this-turn-score").innerHTML = '+' + scoreToAdd;
        document.getElementById("this-turn-score").classList.add("this-turn-score");
        setTimeout(()=>{document.getElementById("this-turn-score").innerHTML = '';
        document.getElementById("this-turn-score").classList.remove("this-turn-score");}, 2500)
    }
    function getNewScore(){
        let lastscore = document.getElementById("score").innerHTML;
        document.getElementById("score").innerHTML = score;
        return score - lastscore;
    }
    function pleyerWon(){
        for(let element of Board){
            if(element.className === 'cell2048 grow')
                return true;
        }
    }
    function playerLost(){
        let boardFull = true;
        for(let element of Board){
            if(element.className === '' || element.className === 'cell0')
                boardFull = false;
        }
        if(boardFull){
            let upCantMove = false;
            let downCantMove = false;
            let rightCantMove = false;
            let leftCantMove = false;
            copyRowsToArrays('up');
            if(!piecesCanMove(false , 'none'))
                upCantMove = true;
            copyRowsToArrays('down');
            if(!piecesCanMove(false, 'none'))
                downCantMove = true;
            copyRowsToArrays('right');
            if(!piecesCanMove(false, 'none'))
                rightCantMove = true;
            copyRowsToArrays('left');
            if(!piecesCanMove(false, 'none'))
                leftCantMove = true;
            if(upCantMove && downCantMove && rightCantMove && leftCantMove)
                return true;
            return false;
        }   
    }
    function addAnotherCell(){
        let cellAdded = false;
        do{
            const randomCellIndex = Math.floor(Math.random() * Board.length);
            if(Board[randomCellIndex].className === "" || Board[randomCellIndex].className === "cell0"){
                let randomNum1to10 = Math.floor(Math.random() * 10);
                let NumberForNewCell;
                if(randomNum1to10 < 9)
                    NumberForNewCell = 2;
                else
                    NumberForNewCell= 4;

                Board[randomCellIndex].className = "cell" + NumberForNewCell;
                Board[randomCellIndex].classList.add("expanding");
                cellAdded = true;
            }
        }while(!cellAdded)
    }
    function setRowsTOCorrectPosition(dir){
        let rows = [row1,row2,row3,row4]
        let copyRows = [[],[],[],[]]
        switch(dir){
            case 'up':
                for(let x = 0 ; x<4;x++)
                    for(let i = 0 ; i <4 ; i++)
                        copyRows[x][i] = rows[i][x];
                break;
            case 'down':
                for(let x = 0 , j=3 ; x<4; x++ , j--)
                    for(let i = 0 ; i <4 ; i++)
                        copyRows[x][i] = rows[i][j];
                break;
            case 'right':
                for(let j = 0; j<4;j++)
                    for(let i = 0, x=3 ; i <4 ; i++, x--)
                        copyRows[j][x] = rows[j][i];
                break;
            case 'left':
                for(let x = 0 ; x<4;x++)
                    for(let i = 0 ; i <4 ; i++)
                        copyRows[x][i] = rows[x][i];
                break;
        }
        row1=copyRows[0];
        row2=copyRows[1];
        row3=copyRows[2];
        row4=copyRows[3];
    }
    function printBoard(){
        clearAllClasses();
        for(let cellNumber =0 ; cellNumber<16 ; cellNumber++){
            if(cellNumber<4)//line1
                Board[cellNumber].classList.add('cell' + row1[cellNumber]);
            else if(cellNumber>3 && cellNumber<8) //line2
                Board[cellNumber].classList.add('cell' + row2[cellNumber-4]); 
            else if(cellNumber>7 && cellNumber<12) //line3
                Board[cellNumber].classList.add('cell' + row3[cellNumber-8]); 
            else if(cellNumber>11) //line4
                Board[cellNumber].classList.add('cell' + row4[cellNumber-12]);
        }
        growCellsJustConnected();
    }
    function growCellsJustConnected(){
        for(let i = growCells.length-1;i>=0;i--){
            Board[growCells[i]].classList.add("grow");
        }
        growCells = [];
    }
    function piecesCanMove(moveAndAddScore , dir){
        let row1canMove = movePiecesAndReturnSuccess(row1, moveAndAddScore ,dir ,1);
        let row2canMove = movePiecesAndReturnSuccess(row2, moveAndAddScore ,dir ,2);
        let row3canMove = movePiecesAndReturnSuccess(row3, moveAndAddScore ,dir, 3);
        let row4canMove = movePiecesAndReturnSuccess(row4, moveAndAddScore ,dir, 4);
        if(row1canMove || row2canMove || row3canMove || row4canMove)
            return true;
        return false;
    }
    function copyRowsToArrays(direction){   
        let cellNumber = 0;
        switch(direction){  
            case 'up':
                for(let arrayPartNumber = 0; arrayPartNumber<4 ;arrayPartNumber++)
                    for(let arrayRowNumber = 1; arrayRowNumber<5 ; arrayRowNumber++, cellNumber++)
                        fillArrayPart(arrayRowNumber,arrayPartNumber,cellNumber)
                break;
            case 'down':
                for(let arrayPartNumber = 3; arrayPartNumber>=0 ;arrayPartNumber--)
                    for(let arrayRowNumber = 1; arrayRowNumber<5 ; arrayRowNumber++, cellNumber++)
                       fillArrayPart(arrayRowNumber,arrayPartNumber,cellNumber)
                break;
            case 'right':
                
                for(let arrayRowNumber = 1; arrayRowNumber<5 ;arrayRowNumber++)
                    for(let arrayPartNumber = 3; arrayPartNumber>=0 ; arrayPartNumber--, cellNumber++)
                        fillArrayPart(arrayRowNumber,arrayPartNumber,cellNumber)
                break;
            case 'left':
                for(let arrayRowNumber = 1; arrayRowNumber<5 ;arrayRowNumber++)
                    for(let arrayPartNumber = 0; arrayPartNumber<4 ; arrayPartNumber++, cellNumber++)
                        fillArrayPart(arrayRowNumber,arrayPartNumber,cellNumber)
                break;      
        }    
    }
    function fillArrayPart(arrayRowNumber,arrayPartNumber,cellNumber){
        let ClassName = Board[cellNumber].className !== ""?Board[cellNumber].className:0;
        if(ClassName !== 0)
            ClassName = ClassName.slice(4);
        ClassName = parseInt(ClassName);
        switch(arrayRowNumber){
            case 1:
                row1[arrayPartNumber] = ClassName;
                break;
            case 2:
                row2[arrayPartNumber] = ClassName;
                break; 
            case 3:
                row3[arrayPartNumber] = ClassName;
                break;
            case 4:
                row4[arrayPartNumber] = ClassName;
                break; 
        }
    }
    function movePiecesAndReturnSuccess(row, moveAndAddScore,dir, rowNumber){
        let thereIsChange = false;
        let cell0cell1Connected = false;
        let cell1cell2Connected = false;
        if(howManyCells1canMove()===1){
            animateThisCell(1,'move',dir,rowNumber,1);
        }
        switch(howManyCells2canMove()){
            case 1:
                animateThisCell(2,'move',dir,rowNumber,1);
                break;
            case 2:
                animateThisCell(2,'move',dir,rowNumber,2);
                break;
        }
        switch(howManyCells3canMove()){
            case 1:
                animateThisCell(3,'move',dir,rowNumber,1);
                break;
            case 2:
                animateThisCell(3,'move',dir,rowNumber,2);
                break;
            case 3:
                animateThisCell(3,'move',dir,rowNumber,3);
                break;
        }
        return thereIsChange;
        function howManyCells1canMove(){
            if(row[0] === 0 && row[1] !== 0){
                row[0] = row[1];
                row[1] = 0;
                thereIsChange = true;
                return 1;
            }else if(row[1] !== 0 && row[0] === row[1]){
                row[0] = row[0]*2;
                animateThisCell(0, 'grow',dir,rowNumber);
                row[1] = 0;
                cell0cell1Connected = true;
                thereIsChange = true;
                if(moveAndAddScore)
                    score += row[0];
                return 1;
            }
        }
        function howManyCells2canMove(){
            if(row[1] === 0 && row[2] !== 0){
                row[1] = row[2];
                row[2] = 0;
                thereIsChange = true;
                if(!cell0cell1Connected)
                    if(howManyCells1canMove() === 1)
                        return 2;
                return 1;
            }
            else if(row[2] !== 0 && row[1] === row[2]){
                row[1] = row[2]*2;
                animateThisCell(1, 'grow',dir,rowNumber);
                row[2] = 0;
                cell1cell2Connected = true;
                thereIsChange = true;
                if(moveAndAddScore)
                    score += row[1];
                return 1;
            }
        }
        function howManyCells3canMove(){
            if(row[2] === 0 && row[3] !== 0){
                row[2] = row[3];
                row[3] = 0;
                thereIsChange = true;
                if(!cell1cell2Connected){
                    switch (howManyCells2canMove()) {
                        case 1:
                            return 2;
                            break;
                        case 2:
                            return 3;
                            break;
                        default:
                            return 1;
                    } 
                }       
            }
            else if(row[3] !== 0 && row[2] === row[3]){
                row[2] = row[3]*2;
                animateThisCell(2 ,'grow',dir,rowNumber);
                row[3] = 0;
                thereIsChange = true;
                if(moveAndAddScore)
                    score += row[2];
                return 1;
            }
        }
    }
    function animateThisCell(cell,whatAnimate,dir,rowNumber,howManyCellsToMove){
        let numberOfCells;
        const cells = ['10','11','12','13','20','21','22','23','30','31','32','33','40','41','42','43']
        const indexArrayAndIndexCell = "" + rowNumber + cell;
        switch(dir){
            case 'up': 
                numberOfCells = [0,4,8,12,1,5,9,13,2,6,10,14,3,7,11,15];
                break;
            case 'down':
                numberOfCells =[12,8,4,0,13,9,5,1,14,10,6,2,15,11,7,3];
                break;
            case 'right':
                numberOfCells =[3,2,1,0,7,6,5,4,11,10,9,8,15,14,13,12];
                break;
            case 'left':
                numberOfCells =[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
                break;
        }
        let index = cells.indexOf(indexArrayAndIndexCell);
        whatAnimate === 'grow'?growCells.push(numberOfCells[index]):Board[numberOfCells[index]].classList.add("move"+dir+howManyCellsToMove);
    }
}