function Ball() {
    this.id = "ball";
    this.x = 100;
    this.y = 100;
    this.vx = 2;
    this.vy = 3;
    this.width = 0;
    this.height = 0;
}

function Buttons(){
    this.p1_up = false;
    this.p1_down = false;
    this.p2_up = false;
    this.p2_down = false;
}

function Paddle(){
    this.id;
    this.x;
    this.y;
    this.vx;
    this.vy;
    this.width;
    this.height;
}

function place_objects(objects) {
    for(let object of objects) {
        let element = document.getElementById(object.id);
        element.style.left = object.x + "px";
        element.style.top = object.y + "px";
    }
}

function update() { 
    if(isBallToBeBounced(paddle1) || isBallToBeBounced(paddle2)) bounceBall();
    
    if(ball.x<=0 || ball.x>=(body.width+ball.width)){
        if(ball.x<=0) p2_scoring();
        if(ball.x>=(body.width-ball.width)) p1_scoring();
        resetBallPosition();
    }
    
    if(ball.y<=0 || ball.y>(body.height+ball.height)) ball.vy *= -1;

    ball.x += ball.vx;
    ball.y += ball.vy;
    place_objects([ball,paddle1,paddle2]);
    scores.innerHTML = p1_score+' : '+p2_score;
}

let ball;
let _ball;
let paddle1;
let paddle2;
let body = document.body.getBoundingClientRect();
let buttons = new Buttons();
let p1_score = 0;
let p2_score = 0;
let scores = document.getElementById("scores");
scores.style.fontSize = 3+"em";

function init() {
    ball = new Ball();

    _ball = document.getElementById("ball").getBoundingClientRect();

    ball.height = _ball.height;
    ball.width = _ball.width;

    initPaddles();
    
    setInterval(update, 10);
}

function track_player_input(event) {
    if(event.type == "keydown") {
        switch(event.key) {
            case "a": {
                buttons.p1_up = true;
                moveUpPaddle(paddle1);
                break;
            }

            case "q": {
                buttons.p1_down = true;
                moveDownPaddle(paddle1);
                break;
            }

            case "p": {
                buttons.p2_up = true;
                moveUpPaddle(paddle2);
                break;
            }

            case "m": {
                buttons.p2_down = true;
                moveDownPaddle(paddle2);
                break;
            }

        }
    }
    else if(event.type == "keyup") {
        switch(event.key) {
            case "a": buttons.p1_up = false; break;
            case "q": buttons.p1_down = false; break;
            case "p": buttons.p2_up = false; break;
            case "m": buttons.p2_down = false; break;
        }
    }
}
document.addEventListener("keydown", track_player_input);
document.addEventListener("keyup", track_player_input);

function moveUpPaddle(paddle){
    if(paddle.y > 0){
        paddle.y -= paddle.vy;
    }
}

function moveDownPaddle(paddle){
    if(paddle.y < (body.height-paddle.height)){
        paddle.y += paddle.vy;
    }
}

function initPaddles(){
    let _paddle1 = document.getElementById("paddle1").getBoundingClientRect();
    let _paddle2 = document.getElementById("paddle2").getBoundingClientRect();
    
    paddle1 = new Paddle();
        paddle1.id = "paddle1";
        paddle1.x = 0;
        paddle1.y = 0;
        paddle1.vx = 0;
        paddle1.vy = 10;
        paddle1.width = _paddle1.width;
        paddle1.height = _paddle1.height;

    paddle2 = new Paddle();
        paddle2.id = "paddle2";
        paddle2.x = body.width - _paddle2.width;
        paddle2.y = _paddle2.top;
        paddle2.vx = 0;
        paddle2.vy = 10;
        paddle2.width = _paddle2.width;
        paddle2.height = _paddle2.height;
}

function bounceBall(){
    ball.vx *= -1;
}

function reverseBallVX(){
    ball.vx *= -1;
}

function reverseBallVY(){
    ball.vy *= -1;
}

function isBallToBeBounced(paddle){

    if((ball.x <= paddle.width)||(ball.x >= (body.width-paddle.width-ball.width))){
        if(((ball.y+(ball.height/2)) >= paddle.y)&&((ball.y+(ball.height/2))<=(paddle.y+paddle.height))) return true;
        else return false;
    }
    else return false;
}

function p1_scoring(){
    p1_score ++;
}

function p2_scoring(){
    p2_score ++;
}

function resetBallPosition(){
    ball.x = body.width/2;
    ball.y = body.height/2;
    let angle = randomAngle(0,2*Math.PI);
    cumputeBallComponent(angle);
}

function randomAngle(x,y){
    let angle = Math.random()*(y-x) + x;
    if(Math.floor(Math.random()*10)%2 == 0) angle *= -1;
    return angle;
}

function cumputeBallComponent(angle){
    ball.vx = 2*Math.cos(angle);
    ball.vy = 5*Math.sin(angle);
}

console.log("hey");
init();