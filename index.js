const body = document.getElementsByTagName("body")[0];
const bombs = [];
let score = 0;
let gameOver=false;
const visitedDiv=[];
const resetButton=document.getElementById("reset");

resetButton.addEventListener("click",()=>{
    window.location.reload();
})
function incrementScore(){
    score++;
    const scoreElement=document.getElementById("score");
    scoreElement.innerText = score;
}

function showAllBombs(){
    //get all elements with class bomb and change background to red
    const allBombs=document.getElementsByClassName("bomb");
    for(let bomb of allBombs){
        bomb.style.background = "red";
    }
}


function createGrid(){
    //9*9 grid

    //create 9 rows
    for(let i=0;i<9;i++){
        const row=document.createElement("div");
        row.style.display="flex";
        //Each row should have 9 columns
        for(let j=0;j<9;j++){
            const column=document.createElement("div");
            //div is block level element and will come in next line
            //To each column style applying.
            column.style.width = "50px";
            column.style.height = "50px";
            column.style.background = "gray";
            column.style.border = "2px solid white";

            const currentIndex = i*9+j;

            if(bombs.includes(currentIndex)){
                column.className = "bomb";
            }
            column.addEventListener("click",()=>{

                if(!gameOver){
                    //if current Index is in bombs array.do background
                    //red,else do background green
                    if(bombs.includes(currentIndex)){
                        column.style.background = "red";
                        gameOver=true;
                        //if the current index is bomb.then show all the bombs
                    showAllBombs();
                    }else{
                        column.style.background = "green";
                        if(!visitedDiv.includes(currentIndex)){
                            incrementScore();
                            visitedDiv.push(currentIndex);
                        }
                    }
                }
            })
            row.appendChild(column);
        }
        body.appendChild(row);
    }
}

//An array of 9 numbers choosen randomly between 1-81
function generateRandomNumber(){
    //Get the number Between 1-81
    let randomNumber=Math.random();
   //Math.random gives you number between 0 to 1
    randomNumber=randomNumber.toFixed(2);
    //Multiply the number by 100
    randomNumber*=100;
    //Write logic to restrict it till 81 only
    randomNumber=randomNumber % 81;
    randomNumber=parseInt(randomNumber);
    return randomNumber;
}

//placing the bombs
function placeBombs(){
    while(bombs.length!=9){
        const randomNumber=generateRandomNumber();
        //Checks if bombs array has this number
        //includes checks if the element is present in array
        if(!bombs.includes(randomNumber)){
            bombs.push(randomNumber);
        }
    }
}

placeBombs();
createGrid();
//generateRandomNumber();
console.log(bombs);