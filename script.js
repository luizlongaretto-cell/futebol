const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const player = {
    x:100,
    y:250,
    r:20,
    speed:4
};

const ball = {
    x:450,
    y:250,
    r:12,
    vx:0,
    vy:0
};

let score = 0;
const keys = {};

document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

function update(){

    if(keys.ArrowUp) player.y -= player.speed;
    if(keys.ArrowDown) player.y += player.speed;
    if(keys.ArrowLeft) player.x -= player.speed;
    if(keys.ArrowRight) player.x += player.speed;

    let dx = ball.x - player.x;
    let dy = ball.y - player.y;
    let dist = Math.sqrt(dx*dx + dy*dy);

    if(dist < player.r + ball.r){
        let ang = Math.atan2(dy, dx);
        ball.vx = Math.cos(ang) * 6;
        ball.vy = Math.sin(ang) * 6;
    }

    ball.x += ball.vx;
    ball.y += ball.vy;

    ball.vx *= 0.98;
    ball.vy *= 0.98;

    if(ball.x < ball.r){
        ball.x = ball.r;
        ball.vx *= -1;
    }

    if(ball.y < ball.r){
        ball.y = ball.r;
        ball.vy *= -1;
    }

    if(ball.y > canvas.height - ball.r){
        ball.y = canvas.height - ball.r;
        ball.vy *= -1;
    }

    if(ball.x > canvas.width - ball.r){

        if(ball.y > 180 && ball.y < 320){
            score++;

            player.x = 100;
            player.y = 250;

            ball.x = 450;
            ball.y = 250;
            ball.vx = 0;
            ball.vy = 0;
        }else{
            ball.x = canvas.width - ball.r;
            ball.vx *= -1;
        }
    }
}

function draw(){

    ctx.fillStyle = "#2d8f3c";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.strokeStyle = "white";
    ctx.lineWidth = 4;
    ctx.strokeRect(0,0,canvas.width,canvas.height);

    ctx.beginPath();
    ctx.arc(450,250,70,0,Math.PI*2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(450,0);
    ctx.lineTo(450,500);
    ctx.stroke();

    ctx.fillStyle = "red";
    ctx.fillRect(880,180,20,140);

    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(player.x,player.y,player.r,0,Math.PI*2);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(ball.x,ball.y,ball.r,0,Math.PI*2);
    ctx.fill();

    ctx.fillStyle = "yellow";
    ctx.font = "25px Arial";
    ctx.fillText("Gols: " + score,20,30);
}

function loop(){
    update();
    draw();
    requestAnimationFrame(loop);
}

loop();
