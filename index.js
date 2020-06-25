//game
var startGame = false;
var youDie = false;
//variable
const alienShipLimit = 10;
var level = 1;
//normal condition
var shipPlace = {"x": 80 , "y":600 , "w": 40, "h": 20}
var alienShipArray = [];
var alienFireSpeed = 5;
var fireArray = [];
var alienFireArray = [];
var fire = false;
let spaceCanvas = document.querySelector("#space-canvas");
let ctx = spaceCanvas.getContext("2d");
//you can call function before create it because of hoisting
var direction = [];

//document
let score = document.querySelector(".score");
let highscore = document.querySelector(".highscore");

//couting point
let scoreCount = 0;
let highscoreCount = 0;

//check sessionStorage
if(sessionStorage.getItem("highScoreInvader")){
    highscoreCount = sessionStorage.getItem("highScoreInvader");
}
highscore.textContent = "Highscore: " + highscoreCount;


//function draw
function draw(){
    ctx.clearRect(0, 0, spaceCanvas.width, spaceCanvas.height);
}

//my ship
function ship(ctx, x, y, width, height){
    ctx.fillRect(x, y, width, height);
}
//player hp
function playerHp(ctx, playerSpecialHp, playerCurrentHp){
    let percentHp = (playerCurrentHp / playerSpecialHp) * 1000;
    ctx.fillStyle = "red";
    ctx.fillRect(0,690, percentHp,10)
}
//boss hp
function bossHp(ctx, bossCurrentHP, bossSpecialHP){
    bossMaxHp = (function(){
        if(level == 1){
            return bossSpecialHP.first;
        }else if (level == 2){
            return bossSpecialHP.second;
        }else if (level == 3){
            return bossSpecialHP.third;
        }else if (level == 4){
            return bossSpecialHP.fourth;
        }else if (level == 5){s
            return bossSpecialHP.fifth;
        }
    })();
    
    let percentHp = (bossCurrentHP / bossMaxHp) * 1000;
    ctx.fillStyle = "purple";
    ctx.fillRect(0,0, percentHp, 20)
}
//bullet
function bullet(ctx, x, y, width, height){
    ctx.fillStyle = "black";
    ctx.fillRect(x, y, width, height);

}
//alien ship
function alienShip(ctx, x, y, width, height){
    ctx.fillStyle = "red";
    ctx.fillRect(x, y, width, height);
}
//alien ship bullet
function alienBullet(ctx, x, y, width, height){
    ctx.fillRect(x, y, width, height);
}

//start of the game
function pressStart(ctx, x,y, fontSize, fontName, textAlign){
    ctx.fillStyle = "grey";
    ctx.font = `${fontSize}px ${fontName}`;
    ctx.textAlign = `${textAlign}`;
    ctx.fillText("Press 'space' to start", x, y)
}

//PLAYER
/*movement detection*/
function movement(){
    window.requestAnimationFrame(movement);
    if(startGame){
        if(direction[37] == true){
            if(shipPlace.x - 9 < 0){
                shipPlace.x = 0;
            }else {
                shipPlace.x -= 9;
            }
         }else if (direction[39] == true){
             if(shipPlace.x + 9 > 950){
                 shipPlace.x = 950;
             }else {
                 shipPlace.x +=9;
             }
         }
         ctx.beginPath();
         ctx.fillStyle = "hsl(221,81%,53%)";
         ship(ctx, shipPlace.x, shipPlace.y, 50, 20);  
         ctx.closePath();
         ctx.fill();
    }
}
//if you press space, turn fire on
function detectSpaceForFire(){
    document.addEventListener("keydown", function(event){
        if(event.keyCode == 32){
           fire = true;
        }
    })
}
//if fire turn on, we detect in here and add to fire array
function detectFire(){
    if(fire == true){
        fireArray.push({"x": shipPlace.x + 20, "y": shipPlace.y-20, "w": 10, "h": 30})
        fire = false;
    }
}
//loop through fireArray and updating its height, so it can go up
function updatingFireLocation(arrayOfBullet, ctx){
    for(let i = 0; i < arrayOfBullet.length; i++){
        if(arrayOfBullet[i].y < -50){
            arrayOfBullet.splice(i, 1);
        }else {
            bullet(ctx, arrayOfBullet[i].x ,  arrayOfBullet[i].y, arrayOfBullet[i].w, arrayOfBullet[i].h )
            arrayOfBullet[i].y -= 10;
        }
    }
}
//ALIEN
//alienship Buleet create 
function alienFire(alienShipFireArray, alienShipArray){
    for(let i = 0; i< alienShipArray.length; i++){
        alienShipFireArray.push({"x": alienShipArray[i].x + 20, "y": alienShipArray[i].y + 20, "w": 10, "h": 30})
    }
}
//and updating lOcation
function updatingAlienFireLoaction(alienShipFireArray, alienFireSpeed, ctx){
    for(let i = 0; i < alienShipFireArray.length; i++){
        if(alienShipFireArray[i].y > 700){
            alienShipFireArray.splice(i, 1);
        }else {
           ctx.beginPath();
            ctx.fillStyle = "purple";
            alienBullet(ctx, alienShipFireArray[i].x ,  alienShipFireArray[i].y, alienShipFireArray[i].w, alienShipFireArray[i].h )
            ctx.closePath();
            alienShipFireArray[i].y += alienFireSpeed;
        }
    }

}
//alienfireWrapper
//speed depend on level, level depend on how many boss you can over come
//1st boss +1 level
//and so on and so forth
function alienFireWrapper(){
    window.requestAnimationFrame(alienFireWrapper);
    if(scoreCount <= 2000){
        alienFireSpeed = 10;
        updatingAlienFireLoaction(alienFireArray, alienFireSpeed, ctx);
    }else if (scoreCount <= 4000){
        alienFireSpeed = 15;
        updatingAlienFireLoaction(alienFireArray, alienFireSpeed, ctx);
    }else if (scoreCount <= 6000){
        alienFireSpeed = 20;
        updatingAlienFireLoaction(alienFireArray, alienFireSpeed, ctx);
    }else if (lscoreCount <= 8000){
        alienFireSpeed = 25;
        updatingAlienFireLoaction(alienFireArray, alienFireSpeed, ctx);
    }else if (scoreCount <= 10000){
        alienFireSpeed = 30;
        updatingAlienFireLoaction(alienFireArray, alienFireSpeed, ctx);
    }else if (scoreCount <= 12000){
        alienFireSpeed = 35;
        updatingAlienFireLoaction(alienFireArray, alienFireSpeed, ctx);
    }else if (scoreCount <= 14000){
        alienFireSpeed = 40;
        updatingAlienFireLoaction(alienFireArray, alienFireSpeed, ctx);
    }else if (scoreCount <= 16000){
        alienFireSpeed = 45;
        updatingAlienFireLoaction(alienFireArray, alienFireSpeed, ctx);
    }else if (scoreCount <= 18000){
        alienFireSpeed = 50;
        updatingAlienFireLoaction(alienFireArray, alienFireSpeed, ctx);
    }else if (scoreCount <= 20000){
        alienFireSpeed = 55;
        updatingAlienFireLoaction(alienFireArray, alienFireSpeed, ctx);
    }else{
        updatingAlienFireLoaction(alienFireArray, alienFireSpeed, ctx);
    }
}
//now we need to spawn enemy
function randomNumberX(){
    let randomX = Math.floor(Math.random()* 950);
    return randomX;
}
//spawn 10 every time
function createAlienShipToArray(alienShipLimit, alienShip){
    if(alienShip.length < 1){
        let firstLocationX = 25;
        for(let i = 0; i < alienShipLimit; i++){
            alienShip.push({"x": firstLocationX, "y": 0, "w": 50, "h": 20});
            firstLocationX += 100;
        }
    }   
}
//function draw the alienShip
function drawAlienShipAndUpdating(alienShipArray, ctx){
    for(let i = 0; i < alienShipArray.length; i++){
        alienShip(ctx, alienShipArray[i].x, alienShipArray[i].y, alienShipArray[i].w, alienShipArray[i].h);
        if(alienShipArray[i].y <= 10){
            alienShipArray[i].y += 1;
        }
    }
}
function detection(bulletArray, alienShipArray){
    for(let i = 0; i < alienShipArray.length; i++){
        for(let j = 0 ; j < bulletArray.length; j++){
            try {
                if(alienShipArray[i].x < bulletArray[j].x + bulletArray[j].w 
                	&& alienShipArray[i].x + alienShipArray[i].w > bulletArray[j].x 
                	&& alienShipArray[i].y < bulletArray[j].y + bulletArray[j].h 
                	&& alienShipArray[i].y + alienShipArray[i].h > bulletArray[j].y ){
                    //collision detected
                    scoreCount += 200;
                   alienShipArray.splice(i, 1);
                   bulletArray.splice(j, 1);
               }
            }catch(error){
                //catch
            }
        }
    }
}
//detection for alienBullet with player ship
function detectionAlienBulletWithPlayerShip(bulletArray, ourShip){
    for(let j = 0 ; j < bulletArray.length; j++){
        try {
            if(ourShip.x < bulletArray[j].x + bulletArray[j].w && ourShip.x + ourShip.w > bulletArray[j].x &&
                ourShip.y < bulletArray[j].y + bulletArray[j].h && ourShip.y + ourShip.h > bulletArray[j].y){
                    bulletArray.splice(j, 1);
                    ourShip.y -= 1000;
                    youDie = true;
                }
        }catch(error){
            //catch
        }
    }
}
//highscore update
function updateScores(scoreCount, highScore){
    if(scoreCount > highScore){
        highscore.textContent = "Highscore: " + scoreCount;
        sessionStorage.setItem("highScoreInvader", scoreCount);
    }
    score.textContent = "Score: " + scoreCount;
}
//die yet?
function youDieYet(ctx, x,y, fontSize, fontName, textAlign){
    ctx.fillStyle = "red";
    ctx.font = `${fontSize}px ${fontName}`;
    ctx.textAlign = `${textAlign}`;
    ctx.fillText("You Died!", x, y)
    ctx.font = `45px ${fontName}`;
    ctx.textAlign = `${textAlign}`;
    ctx.fillText("F5 to restart", x, y+70)
}

//interval and game update
setInterval(function(){
    draw();
    updatingFireLocation(fireArray, ctx);
    detectSpaceForFire();
    detectFire();
    if(startGame){
        //create ship like normally and keep shooting
        //move from draw
        drawAlienShipAndUpdating(alienShipArray, ctx, fireArray);
        createAlienShipToArray(alienShipLimit, alienShipArray);
        detection(fireArray, alienShipArray);
        detectionAlienBulletWithPlayerShip(alienFireArray, shipPlace)
        updateScores(scoreCount, highscoreCount);
        if(youDie == true){
            youDieYet(ctx, 500, 350, 150, "Arial", "Center")
        }
    }else {
        //show the text of press space to start
        pressStart(ctx, 500, 350, 50, "Arial", "center");
    }

}, 1)


//fire rate alien, every 1second
function fireRateDependOnStage(){
    if(scoreCount <= 2000){
        console.log("run me!")
    return 1000;  
    }else if (scoreCount <= 4000){
        return 950;
    }else if (scoreCount <= 6000){
        return 900;
    }else if (lscoreCount <= 8000){
        return 850;
    }else if (scoreCount <= 10000){
        return 800;
    }else if (scoreCount <= 12000){
        return 750;
    }else if (scoreCount <= 14000){
        return 700;
    }else if (scoreCount <= 16000){
        return 600;
    }else if (scoreCount <= 18000){
        return 500;
    }else if (scoreCount <= 20000){
        console.log("run me 400!")
        return 400;
    } 
}
setInterval(function alienFireIntervalWrapper(){
    alienFire(alienFireArray, alienShipArray)
},fireRateDependOnStage());

//update the fire speed to see
alienFireWrapper();
//call movement
movement();


//detect first space
if(!startGame){
    document.addEventListener("keydown", function(event){
        if(event.keyCode == 32){
            startGame = true;
        }
    });
}
//detect key
document.addEventListener("keydown", function(event){
    if(event.keyCode == 37 || event.keyCode == 65){
        direction[event.keyCode] = true;
    }else if (event.keyCode == 39 || event.keyCode == 68){
        direction[event.keyCode] = true;
    }
});
document.addEventListener("keyup", function(event){
    if(event.keyCode == 37 || event.keyCode == 65){
        direction[event.keyCode] = false;
    }else if (event.keyCode == 39 || event.keyCode == 68){
        direction[event.keyCode] = false;
    }
});

