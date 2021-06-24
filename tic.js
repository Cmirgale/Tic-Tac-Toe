window.onload=(event)=>
{
    //alert("Hello");
    const start=(()=>
    {
    startMsg=document.getElementById("msg");
    startMsg.textContent="Player X's turn";
    })();

    const Player=(sign)=>
    {
    this.sign=sign;

    const getSign=()=>{
        return sign;
    }
        return{getSign};
    }

    const gameBoard=(()=>
    {
    const board=["","","","","","","","",""];

    const setField=(index,sign)=>
    {
        board[index]=sign;
    }

    const getField=(index)=>{
        return board[index];
    }
    const reset=()=>{
        for(let i=0;i<board.length;i++){
            board[i]=""; 
        }
        
    }

    return{setField,getField,reset};
    })();
     
    const display=(()=>{
    const field=document.querySelectorAll(".index");
    const message=document.getElementById("msg");
    const restartElement=document.getElementById("restart");

    for(let i=0;i<field.length;i++)
    {
        field[i].addEventListener('click',(e)=>
        {
            gameController.playRound(parseInt(e.target.dataset.index));
            updateBoard();
        })
    }
    

    restartElement.addEventListener('click',restart)

    const updateBoard=()=>
    {
        for(let i=0;i<field.length;i++)
        {
            field[i].textContent=gameBoard.getField(i);

        }
    }

    const setResultMessage=(winner)=>
    {
        if(winner==="Draw")
        {
            setMessageElement("It's a Draw");
        }
        else
        {
            setMessageElement(`Player ${winner} has won!`);
        }
    };

    const setMessageElement=(msg)=>
    {
        message.textContent=msg;
    };
        return{updateBoard,setResultMessage,setMessageElement};
    })();

    const gameController=(()=>
    {
    let round=1;
    let isOver=false;
    const playerX=Player('X');
    const player0=Player('O');
    
    
    const playRound=(fieldIndex)=>{
        gameBoard.setField(fieldIndex,getCurrentPlayer());

        if(checkWinner(fieldIndex)){
            display.setResultMessage(getCurrentPlayer());
            isOver=true;
            setTimeout(restart,1000);
        return;
        }

        if(round===9)
        {
            display.setResultMessage('Draw');
           
            isOver=true;
            setTimeout(restart,1000);
            return;
        }
        round++;
        console.log(getCurrentPlayer());
        display.setMessageElement(`Player ${getCurrentPlayer()}'s turn`);

    };

    const getCurrentPlayer=()=>
    {
        return round%2===1?playerX.getSign():player0.getSign();
    }

    const checkWinner=(fieldIndex)=>
    {
        const winCondtions=
        [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6],
        ];

        return winCondtions
        .filter((combination)=>combination.includes(fieldIndex))
        .some((possibleCombination)=> possibleCombination.every((index)=>
        gameBoard.getField(index)===getCurrentPlayer()
        )
    );
    };

    const gameOver=()=>{
        return isOver;
    }

    const reset=()=>{
        round=1;
        isOver=false;
    }
    return{playRound,reset,gameOver}

    })();

    function restart()
    {
    gameController.reset();
    gameBoard.reset();
    display.updateBoard();
    display.setMessageElement("Player X's Turn");
    }

}
