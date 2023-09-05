//game constants nd variables
let inputDir={x:0,y:0};
const foodSound=new Audio('food.mp3');
const gameOverSound=new Audio('gameOver.mp3');
const moveSound=new Audio('move.mp3');
const musicSound=new Audio('music.mp3');
let speed=7;
let score=0;
let lastPaintTime=0;
let snakeArr=[
    {x:13, y:15}
];
food={x:6, y:7};//food array nh h snake khyga aur brhta jyga

//game fumnctions
function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime)
    if((ctime-lastPaintTime)/1000<1/speed){
    return;
   }
     lastPaintTime=ctime;
     gameEngine();
   
}
function isCollide(snake){
    //return false;
    //if u bump into urself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
    }
        //if u bump into wall
        if(snake[0].x>=18 ||snake[0].x<=0 || snake[0].y>=18 ||snake[0].y<=0){
            return true;
        }
       return false;
    }

function gameEngine(){
    //part1-updating snake array nd food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        alert("Game Over!! press any key to play again!");
        snakeArr=[{x:13, y:15}];
        musicSound.play();
        score=0;

    }
//if u have eaten the food,increament the score and regenarate the food
//snake khana tb khyga jb snake k mundi food s milga
if(snakeArr[0].y===food.y && snakeArr[0].x===food.x ){
    foodSound.play();
    score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }

    scoreBox.innerHTML = "Score: " + score;

    snakeArr.unshift({x:snakeArr[0].x+ inputDir.x,y:snakeArr[0].y+ inputDir.y})
    let a=2;
    let b=16;

    food={x:2+ Math.round(a+(b-a)*Math.random()),y:2+ Math.round(a+(b-a)*Math.random())}
}
  //moving the snake
for (let i = snakeArr.length-2; i >=0; i--) {
   // const element = array[i];
    snakeArr[i+1]={...snakeArr[i]};//snakek muh arr 0haith second last part ko liye phle th woh hua i ke last wla hua i+1 r bd me dno ko equal krdng
    //sb move krk aage ayga toh index 0 wla kha jyga isly nya obj bnana prega isly{...snakeArr[i]}likhe h
}
snakeArr[0].x +=inputDir.x;
snakeArr[0].y +=inputDir.y;


    //part2-display snake and food
    //display snake 
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;    //y row h
        snakeElement.style.gridColumnStart=e.x;   //x col h
        
        if(index===0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
         });
    //display food
        foodElement=document.createElement('div');
        foodElement.style.gridRowStart=food.y;    //y row h
        foodElement.style.gridColumnStart=food.x;   //x col h
        foodElement.classList.add('food')
        board.appendChild(foodElement);


}
//main logic starts here
musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}



window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
inputDir={x:0,y:1} //start the game
moveSound.play();
switch (e.key) {
    case "ArrowUp":
        console.log("ArrowUp");
       
        inputDir.x=0;
        inputDir.y=-1;

        break;

        case "ArrowDown":
        console.log("ArrowDown");
        inputDir.x=0;
        inputDir.y=1;
        break;

        case "ArrowLeft":
        console.log("ArrowLeft");
        inputDir.x=-1;
        inputDir.y=0;
        break;

        case "ArrowRight":
        console.log("ArrowRight");
        inputDir.x=1;
        inputDir.y=0;
        break;

    default:
        break;
}
});
