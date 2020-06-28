// const express=require("express");
// const app=express();
// app.use(express.static("public"));
// app.listen(3000,function(req,res){
//   res.sendfile(__dirname+"index.html");
// });
var buttonColors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;
$(document).keydown(function(){
  if(started===false)
  {
    $("#level-title").text("level: "+level);
    nextSequence();
    started=true;
  }
});


$(".btn").click(function()
{
  var userChosenColor=$(this).attr("id");
  userClickedPattern.push(userChosenColor);
  sound(userChosenColor);
  animatePress(userChosenColor);
   checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel)
{
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
  if(userClickedPattern.length===gamePattern.length)
  {
    setTimeout(function () {
        nextSequence();
    }, 1000);}}
    else{
    sound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    gameover();
    }
}

function nextSequence()
{
  userClickedPattern=[];
  level++;
    $("#level-title").text("Level " + level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChoosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChoosenColor);
  $("#"+randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
 sound(randomChoosenColor);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
function sound(play)
{
  var audio=new Audio("sounds/"+play+".mp3");
  audio.play();
}
function gameover()
{
  gamePattern=[];
  started=false;
  level=0;
}
