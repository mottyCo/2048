let isGameOver = false;
let score = 0;
let bestScore = 0;
if(localStorage.best)
    bestScore = localStorage.best;
else
    localStorage.best = bestScore;
 
function play(){
    document.getElementById("bestscore").innerHTML = localStorage.best;
    if(isGameOver){
        document.getElementById("game-over").style.display = "none";
        isGameOver = false;
    }
    resetBoard();
    function resetBoard(){
        const all_the_cells = document.getElementById('board').children;
        for(let i =0 ; i<16 ; i++)
            all_the_cells[i].className = '';
        addNumberInRandomLocation();
        addNumberInRandomLocation();
    }
    let cellToPop =[];
    let cellTomove =[];
    let row1=[];
    let row2=[];
    let row3=[];
    let row4=[];
    document.addEventListener('keyup', (event)=>{
        if(!isGameOver && event.keyCode === 38){
            setarrays('up');
            if(moveAllPieces(true , 'up')){
                rotaterDirectionOfArrays('up');
                setTimeout(()=>{
                    setBoard();
                    addNumberInRandomLocation();
                    endGameIfNeedTo();
                    addScore();
                },130);
            }
        }else if(!isGameOver && event.keyCode === 40){
            setarrays('down');
            if(moveAllPieces(true , 'down')){
                rotaterDirectionOfArrays('down');
                setTimeout(()=>{
                    setBoard();
                    addNumberInRandomLocation();
                    endGameIfNeedTo();
                    addScore();
                },130);
            }
        }else if(!isGameOver && event.keyCode === 39){
            setarrays('right');
            if(moveAllPieces(true , 'right')){
                rotaterDirectionOfArrays('right');
                setTimeout(()=>{
                    setBoard();
                    addNumberInRandomLocation();
                    endGameIfNeedTo();
                    addScore();
                },130);
            }
        }else if(!isGameOver && event.keyCode === 37){
            setarrays('left');
            if(moveAllPieces(true ,'left')){
                rotaterDirectionOfArrays('left');
                setTimeout(()=>{
                    setBoard();
                    addNumberInRandomLocation();
                    endGameIfNeedTo();
                    addScore();
                },130);
            }
        }
    });
    function addScore(){
        let lastscore = document.getElementById("score").innerHTML;
        document.getElementById("score").innerHTML = score;
        lastscore = score - lastscore;
        if(lastscore > 0)
            document.getElementById("this-turn-score").innerHTML = '+' + lastscore;
            document.getElementById("this-turn-score").classList.add("this-turn-score");
        setTimeout(()=>{document.getElementById("this-turn-score").innerHTML = '';
        document.getElementById("this-turn-score").classList.remove("this-turn-score");}, 2500)
        if(score > bestScore){
            bestScore = score;
            document.getElementById("bestscore").innerHTML = bestScore;
            localStorage.best = bestScore;
        }
    }
    function endGameIfNeedTo(){
        const all_the_cells = document.getElementById('board').children;
        if(pleyerWin()){
            isGameOver = true;
            setTimeout(()=>{document.getElementById("win-game").style.display = "grid";},1000);
        }
        else if(playerLose()){
            console.log('here');
            isGameOver = true;
            setTimeout(()=>{document.getElementById("game-over").style.display = "grid";},1000);
        }
        function pleyerWin(){
            for(let element of all_the_cells){
                if(element.className === 'cell2048 popmeout')
                    return true;
            }
        }
        function playerLose(){
            let boardFull = true;
            for(let element of all_the_cells){
                if(element.className === '' || element.className === 'cell0')
                    boardFull = false;
            }
            if(boardFull){
                let upCantMove = false;
                let downCantMove = false;
                let rightCantMove = false;
                let leftCantMove = false;
                setarrays('up');
                if(!moveAllPieces(false , 'none'))
                    upCantMove = true;
                setarrays('down');
                if(!moveAllPieces(false, 'none'))
                    downCantMove = true;
                setarrays('right');
                if(!moveAllPieces(false, 'none'))
                    rightCantMove = true;
                setarrays('left');
                if(!moveAllPieces(false, 'none'))
                    leftCantMove = true;
                if(upCantMove && downCantMove && rightCantMove && leftCantMove)
                    return true;
                return false;
            }   
        }
    }
    function addNumberInRandomLocation(){
        const all_the_cells = document.getElementById('board').children;
        let stoper = false;
        do{
            const randomIndex = Math.floor(Math.random() * all_the_cells.length);
            if(all_the_cells[randomIndex].className === "" || all_the_cells[randomIndex].className === "cell0"){
                let randomNum = Math.floor(Math.random() * 6);
                let numToAdd
                if(randomNum < 5)
                    numToAdd = 2;
                else
                    numToAdd = 4;

                all_the_cells[randomIndex].className = "cell" + numToAdd;
                all_the_cells[randomIndex].classList.add("pop");
                stoper = true;
            }
        }while(!stoper)
    }
    function rotaterDirectionOfArrays(dir){
        let entireRows = [row1,row2,row3,row4]
        let newrow1=[];
        let newrow2=[];
        let newrow3=[];
        let newrow4=[];
        switch(dir){
            case 'up':
                for(let i = 0 ; i <4 ; i++){
                    newrow1[i] = entireRows[i][0];
                }
                for(let i = 0 ; i <4 ; i++){
                    newrow2[i] = entireRows[i][1];
                }
                for(let i = 0 ; i <4 ; i++){
                    newrow3[i] = entireRows[i][2];
                }
                for(let i = 0 ; i <4 ; i++){
                    newrow4[i] = entireRows[i][3];
                }
                break;
            case 'down':
                for(let i = 0 ; i <4 ; i++){
                    newrow1[i] = entireRows[i][3];
                }
                for(let i = 0 ; i <4 ; i++){
                    newrow2[i] = entireRows[i][2];
                }
                for(let i = 0 ; i <4 ; i++){
                    newrow3[i] = entireRows[i][1];
                }
                for(let i = 0 ; i <4 ; i++){
                    newrow4[i] = entireRows[i][0];
                }
                break;
            case 'right':
                for(let i = 0, x=3 ; i <4 ; i++, x--){
                    newrow1[i] = entireRows[0][x];
                }
                for(let i = 0, x=3 ; i <4 ; i++, x--){
                    newrow2[i] = entireRows[1][x];
                }
                for(let i = 0, x=3 ; i <4 ; i++, x--){
                    newrow3[i] = entireRows[2][x];
                }
                for(let i = 0, x=3 ; i <4 ; i++, x--){
                    newrow4[i] = entireRows[3][x];
                }
                break;
            case 'left':
                newrow1 = row1;
                newrow2 = row2;
                newrow3 = row3;
                newrow4 = row4; 
                break;
        }
        row1=newrow1;
        row2=newrow2;
        row3=newrow3;
        row4=newrow4;
        
    }
    function setBoard(){
        const all_the_cells = document.getElementById('board').children;
        for(let i =0 ; i<16 ; i++){
            all_the_cells[i].className = '';
            if(i<4)
                all_the_cells[i].classList.add('cell' + row1[i]);
            else if(i>3 && i<8) 
                all_the_cells[i].classList.add('cell' + row2[i-4]); 
            else if(i>7 && i<12) 
                all_the_cells[i].classList.add('cell' + row3[i-8]); 
            else if(i>11) 
                all_the_cells[i].classList.add('cell' + row4[i-12]);
        }
        for(let cell of cellToPop){
            all_the_cells[cell].classList.add("popmeout");
        }
        cellToPop = [];
    }
    function moveAllPieces(addscore , dir){
        let arr1 = movePieces(row1, addscore ,dir ,1);
        let arr2 = movePieces(row2, addscore ,dir ,2);
        let arr3 = movePieces(row3, addscore ,dir,3);
        let arr4 = movePieces(row4, addscore ,dir, 4);
        if(arr1 || arr2 || arr3 || arr4)
            return true;
        return false;
    }
    function setarrays(direction){
        
        const all_the_cells = document.getElementById('board').children;
        let index = 0;
        switch(direction){  
            case 'up':
                for(let x = 0; x<4 ;x++)
                    for(let i = 1; i<5 ; i++, index++)
                        fillArrays(i,x)
                break;
            case 'down':
                for(let x = 3; x>=0 ;x--)
                    for(let i = 1; i<5 ; i++, index++)
                        fillArrays(i,x)
                break;
            case 'right':
                
                for(let i = 1; i<5 ;i++)
                    for(let x = 3; x>=0 ; x--, index++)
                        fillArrays(i,x)
                break;
            case 'left':
                for(let i = 1; i<5 ;i++)
                    for(let x = 0; x<4 ; x++, index++)
                        fillArrays(i,x)
                break;      
        }
        function fillArrays(i,x){
            let number = all_the_cells[index].className !== ""?all_the_cells[index].className:0;
            if(number !== 0)
                number = number.slice(4);
            number = parseInt(number);
            switch(i){
                case 1:
                    row1[x] = number;
                    break;
                case 2:
                    row2[x] = number;
                    break; 
                case 3:
                    row3[x] = number;
                    break;
                case 4:
                    row4[x] = number;
                    break; 
            }
        }
        
        
         
    }
    function movePieces(array, addscore,dir, indexOfArray){
        let thereIsAnyChange = false;
        let dontChangeMe1 = false;
        let dontChangeMe2 = false;
        if(moveIndexArr1()===1){
            popNewNumber(1,false,1);
        }
        switch(moveIndexArr2()){
            case 1:
                popNewNumber(2,false,1);
                break;
            case 2:
                popNewNumber(2,false,2);
                break;
        }
        switch(moveIndexArr3()){
            case 1:
                popNewNumber(3,false,1);
                break;
            case 2:
                popNewNumber(3,false,2);
                break;
            case 3:
                popNewNumber(3,false,3);
                break;
        }

        return thereIsAnyChange;
        function moveIndexArr1(){
            if(array[0] === 0 && array[1] !== 0){
                array[0] = array[1];
                array[1] = 0;
                thereIsAnyChange = true;
                return 1;
            }else if(array[1] !== 0 && array[0] === array[1]){
                array[0] = array[0]*2;
                popNewNumber(0, true);
                array[1] = 0;
                dontChangeMe1 = true;
                thereIsAnyChange = true;
                if(addscore)
                    score += array[0];
                return 1;
            }
        }
        function moveIndexArr2(){
            if(array[1] === 0 && array[2] !== 0){
                array[1] = array[2];
                array[2] = 0;
                thereIsAnyChange = true;
                if(!dontChangeMe1)
                    if(moveIndexArr1() === 1)
                        return 2;
                return 1;
            }
            else if(array[2] !== 0 && array[1] === array[2]){
                array[1] = array[2]*2;
                popNewNumber(1, true);
                array[2] = 0;
                dontChangeMe2 = true;
                thereIsAnyChange = true;
                if(addscore)
                    score += array[1];
                return 1;
            }
        }
        function moveIndexArr3(){
            if(array[2] === 0 && array[3] !== 0){
                array[2] = array[3];
                array[3] = 0;
                thereIsAnyChange = true;
                if(!dontChangeMe2){
                    switch (moveIndexArr2()) {
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
            else if(array[3] !== 0 && array[2] === array[3]){
                array[2] = array[3]*2;
                popNewNumber(2 ,true);
                array[3] = 0;
                thereIsAnyChange = true;
                if(addscore)
                    score += array[2];
                return 1;
            }
        }
        function popNewNumber(cell,trueToPopFalseToMove,howManyCellsToMove){
            const all_the_cells = document.getElementById('board').children;
            const indexArrayAndIndexCell = "" + indexOfArray + cell;

            switch(indexArrayAndIndexCell){
                case '10':
                    switch(dir){
                        case 'up': 
                            trueToPopFalseToMove?cellToPop.push(0):all_the_cells[0].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'down':
                            trueToPopFalseToMove?cellToPop.push(12):all_the_cells[12].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'right':
                            trueToPopFalseToMove?cellToPop.push(3):all_the_cells[3].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'left':
                            trueToPopFalseToMove?cellToPop.push(0):all_the_cells[0].classList.add("move"+dir+howManyCellsToMove);
                            break;
                    }
                    break;
                case '11':
                    switch(dir){
                        case 'up': 
                            trueToPopFalseToMove?cellToPop.push(4):all_the_cells[4].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'down':
                            trueToPopFalseToMove?cellToPop.push(8):all_the_cells[8].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'right':
                            trueToPopFalseToMove?cellToPop.push(2):all_the_cells[2].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'left':
                            trueToPopFalseToMove?cellToPop.push(1):all_the_cells[1].classList.add("move"+dir+howManyCellsToMove);
                            break;
                    }
                    break;
                case '12':
                    switch(dir){
                        case 'up': 
                            trueToPopFalseToMove?cellToPop.push(8):all_the_cells[8].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'down':
                            trueToPopFalseToMove?cellToPop.push(4):all_the_cells[4].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'right':
                            trueToPopFalseToMove?cellToPop.push(1):all_the_cells[1].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'left':
                            trueToPopFalseToMove?cellToPop.push(2):all_the_cells[2].classList.add("move"+dir+howManyCellsToMove);
                            break;
                    }
                    break;
                case '13':
                    switch(dir){
                        case 'up': 
                            trueToPopFalseToMove?cellToPop.push(12):all_the_cells[12].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'down':
                            trueToPopFalseToMove?cellToPop.push(0):all_the_cells[0].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'right':
                            trueToPopFalseToMove?cellToPop.push(0):all_the_cells[0].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'left':
                            trueToPopFalseToMove?cellToPop.push(3):all_the_cells[3].classList.add("move"+dir+howManyCellsToMove);
                            break;
                    }
                    break;
                case '20':
                    switch(dir){
                        case 'up': 
                            trueToPopFalseToMove?cellToPop.push(1):all_the_cells[1].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'down':
                            trueToPopFalseToMove?cellToPop.push(13):all_the_cells[13].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'right':
                            trueToPopFalseToMove?cellToPop.push(7):all_the_cells[7].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'left':
                            trueToPopFalseToMove?cellToPop.push(4):all_the_cells[4].classList.add("move"+dir+howManyCellsToMove);
                            break;
                    }
                    break;
                case '21':
                    switch(dir){
                        case 'up': 
                            trueToPopFalseToMove?cellToPop.push(5):all_the_cells[5].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'down':
                            trueToPopFalseToMove?cellToPop.push(9):all_the_cells[9].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'right':
                            trueToPopFalseToMove?cellToPop.push(6):all_the_cells[6].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'left':
                            trueToPopFalseToMove?cellToPop.push(5):all_the_cells[5].classList.add("move"+dir+howManyCellsToMove);
                            break;
                    }
                    break;
                case '22':
                    switch(dir){
                        case 'up': 
                            trueToPopFalseToMove?cellToPop.push(9):all_the_cells[9].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'down':
                            trueToPopFalseToMove?cellToPop.push(5):all_the_cells[5].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'right':
                            trueToPopFalseToMove?cellToPop.push(5):all_the_cells[5].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'left':
                            trueToPopFalseToMove?cellToPop.push(6):all_the_cells[6].classList.add("move"+dir+howManyCellsToMove);
                            break;
                    }
                    break;
                case '23':
                    switch(dir){
                        case 'up': 
                            trueToPopFalseToMove?cellToPop.push(13):all_the_cells[13].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'down':
                            trueToPopFalseToMove?cellToPop.push(1):all_the_cells[1].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'right':
                            trueToPopFalseToMove?cellToPop.push(4):all_the_cells[4].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'left':
                            trueToPopFalseToMove?cellToPop.push(7):all_the_cells[7].classList.add("move"+dir+howManyCellsToMove);
                            break;
                    }
                    break;
                case '30':
                    switch(dir){
                        case 'up': 
                            trueToPopFalseToMove?cellToPop.push(2):all_the_cells[2].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'down':
                            trueToPopFalseToMove?cellToPop.push(14):all_the_cells[14].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'right':
                            trueToPopFalseToMove?cellToPop.push(11):all_the_cells[11].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'left':
                            trueToPopFalseToMove?cellToPop.push(8):all_the_cells[8].classList.add("move"+dir+howManyCellsToMove);
                            break;
                    }
                    break;
                case '31':
                    switch(dir){
                        case 'up': 
                            trueToPopFalseToMove?cellToPop.push(6):all_the_cells[6].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'down':
                            trueToPopFalseToMove?cellToPop.push(10):all_the_cells[10].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'right':
                            trueToPopFalseToMove?cellToPop.push(10):all_the_cells[10].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'left':
                            trueToPopFalseToMove?cellToPop.push(9):all_the_cells[9].classList.add("move"+dir+howManyCellsToMove);
                            break;
                    }
                    break;
                case '32':
                    switch(dir){
                        case 'up': 
                            trueToPopFalseToMove?cellToPop.push(10):all_the_cells[10].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'down':
                            trueToPopFalseToMove?cellToPop.push(6):all_the_cells[6].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'right':
                            trueToPopFalseToMove?cellToPop.push(9):all_the_cells[9].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'left':
                            trueToPopFalseToMove?cellToPop.push(10):all_the_cells[10].classList.add("move"+dir+howManyCellsToMove);
                            break;
                    }
                    break;
                case '33':
                    switch(dir){
                        case 'up': 
                            trueToPopFalseToMove?cellToPop.push(14):all_the_cells[14].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'down':
                            trueToPopFalseToMove?cellToPop.push(2):all_the_cells[2].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'right':
                            trueToPopFalseToMove?cellToPop.push(8):all_the_cells[8].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'left':
                            trueToPopFalseToMove?cellToPop.push(11):all_the_cells[11].classList.add("move"+dir+howManyCellsToMove);
                            break;
                    }
                    break;
                case '40':
                    switch(dir){
                        case 'up': 
                            trueToPopFalseToMove?cellToPop.push(3):all_the_cells[3].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'down':
                            trueToPopFalseToMove?cellToPop.push(15):all_the_cells[15].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'right':
                            trueToPopFalseToMove?cellToPop.push(15):all_the_cells[15].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'left':
                            trueToPopFalseToMove?cellToPop.push(12):all_the_cells[12].classList.add("move"+dir+howManyCellsToMove);
                            break;
                    }
                    break;
                case '41':
                    switch(dir){
                        case 'up': 
                            trueToPopFalseToMove?cellToPop.push(7):all_the_cells[7].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'down':
                            trueToPopFalseToMove?cellToPop.push(11):all_the_cells[11].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'right':
                            trueToPopFalseToMove?cellToPop.push(14):all_the_cells[14].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'left':
                            trueToPopFalseToMove?cellToPop.push(13):all_the_cells[13].classList.add("move"+dir+howManyCellsToMove);
                            break;
                    }
                    break;
                case '42':
                    switch(dir){
                        case 'up': 
                            trueToPopFalseToMove?cellToPop.push(11):all_the_cells[11].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'down':
                            trueToPopFalseToMove?cellToPop.push(7):all_the_cells[7].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'right':
                            trueToPopFalseToMove?cellToPop.push(13):all_the_cells[13].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'left':
                            trueToPopFalseToMove?cellToPop.push(14):all_the_cells[14].classList.add("move"+dir+howManyCellsToMove);
                            break;
                    }
                    break;
                case '43':
                    switch(dir){
                        case 'up': 
                            trueToPopFalseToMove?cellToPop.push(15):all_the_cells[15].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'down':
                            trueToPopFalseToMove?cellToPop.push(3):all_the_cells[3].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'right':
                            trueToPopFalseToMove?cellToPop.push(12):all_the_cells[12].classList.add("move"+dir+howManyCellsToMove);
                            break;
                        case 'left':
                            trueToPopFalseToMove?cellToPop.push(15):all_the_cells[15].classList.add("move"+dir+howManyCellsToMove);
                            break;
                    }
                    break;
  
            }
        }
    }
}
function reloadThePage(){
    location.reload();
}





