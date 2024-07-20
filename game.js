let gameboxes=document.querySelectorAll(".box");
let resetbtn=document.querySelector(".reset-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector(".msg");
let newbtn=document.querySelector(".new-btn");

let turnO=true;//playerX,playerO
let count=0; //to track draw
let winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
]

gameboxes.forEach((box)=>{
        box.addEventListener("click",()=>{
            if(turnO===true){
                //playerO
                 box.innerText="O";
                 turnO=false;
                

            }
            else{
                //playerX
                box.innerText="X";
                turnO=true;
            }
            box.style.pointerEvents = "none";
           box.ariaDisabled=true;
           let winner=checkWinner();
           count++;

        if(count===9 && !winner){
            Gamedraw();
        }
        })
})
const Gamedraw=()=>{
    msg.innerText="Game Draw ! Play Next Game";
    msgContainer.classList.remove("hide");
    disableBoxes();
}
const resetgame=()=>{
    turnO=true;
    count=0;
    enableBoxes();
    msgContainer.classList.add("hide");

}
let enableBoxes=()=>{
    for(let box of gameboxes){
        box.style.pointerEvents = "";
        box.ariaDisabled=false;
        box.innerText="";
    }
} 
let disableBoxes=()=>{
    for(let box of gameboxes){
        box.style.pointerEvents="none";
        box.ariaDisabled=true;
    }
}
const showWinner=(winner)=>{
    msg.innerText=`Congratulation, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}
const checkWinner=()=>{
    for(let pattern of winPatterns){
        let pos1val=gameboxes[pattern[0]].innerText;
        let pos2val=gameboxes[pattern[1]].innerText;
        let pos3val=gameboxes[pattern[2]].innerText;

        if(pos1val!="" && pos2val!="" && pos3val!=""){
            if(pos1val === pos2val && pos2val===pos3val){
                showWinner(pos1val);
                return true;
            }
        }
    }
}

resetbtn.addEventListener("click",resetgame);
newbtn.addEventListener("click",resetgame);

