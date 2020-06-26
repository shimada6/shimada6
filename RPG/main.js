//mapArray : 決定地圖中每個格子的元素
//ctx : HTML5 Canvas使用
//currentImgMainX, currentImgMainY : 決定主角所在處
//imgMountain, imgMain, imgEnemy : 障礙物、主角、敵人的圖片物件

let mapArray, ctx, currentImgMainX, currentImgMainY;
let imgMountain, imgMain, imgEnemy;

//當網頁元件載入完成要做的事情
$(document).ready(function () {
    //遊戲地圖
    //0:可走、1:障礙、2:終點、3:敵人
    mapArray = [0, 1, 1, 0, 0, 0, 3, 1, 2];
    ctx = $("#myCanvas")[0].getContext("2d");

    //擺主角
    imgMain = new Image();
    imgMain.src = "RPG/images/spriteSheet.png";
    currentImgMainX = 0;
    currentImgMainY = 0;
    imgMain.onload = function () {
        ctx.drawImage(imgMain, 0, 0, 80, 130, currentImgMainX, currentImgMainY, 200, 200);
    };

    //擺障礙物和敵人
    imgMountain = new Image();
    imgMountain.src = "RPG/images/material.png";
    imgEnemy = new Image();
    imgEnemy.src = "RPG/images/Enemy.png";
    imgMountain.onload = function () {
        imgEnemy.onload = function () {
            for (let x in mapArray) {
                if (mapArray[x] == 1) {
                    ctx.drawImage(imgMountain, 32, 65, 32, 32, x % 3 * 200, Math.floor(x / 3) * 200, 200, 200);
                }
                else if (mapArray[x] == 3) {
                    ctx.drawImage(imgEnemy, 7, 40, 104, 135, x % 3 * 200, Math.floor(x / 3) * 200, 200, 200);
                }
            }
        }
    };
});

//當有人按下按鍵後需做
$(document).keydown(function (event) {
    let targetImgMainX, targetImgMainY, targetBlock, cutImagePositionX;
    //主角即將要移動過去的目標位置，主角即將要移動過去的那一格編號 依據主角朝向什麼方向而決定的圖片
    event.preventDefault();
    //避免點擊鍵盤出現瀏覽器的其他行為
    //根據使用者按鍵指示，對應計算目標位置，主角新的方向圖片
    switch (event.originalEvent.code) {
        case "ArrowLeft":
            targetImgMainX = currentImgMainX - 200;
            targetImgMainY = currentImgMainY;
            cutImagePositionX = 175;
            break;
        case "ArrowUp":
            targetImgMainX = currentImgMainX;
            targetImgMainY = currentImgMainY - 200;
            cutImagePositionX = 355;
            break;
        case "ArrowRight":
            targetImgMainX = currentImgMainX + 200;
            targetImgMainY = currentImgMainY;
            cutImagePositionX = 540;
            break;
        case "ArrowDown":
            targetImgMainX = currentImgMainX;
            targetImgMainY = currentImgMainY + 200;
            cutImagePositionX = 0;
            break;
        default:
            return;
    }
    //在邊界內
    if (targetImgMainX <= 400 && targetImgMainX >= 0 && targetImgMainY <= 400 && targetImgMainY >= 0) {
        targetBlock = targetImgMainX / 200 + targetImgMainY / 200 * 3;
    }
    else {//超邊界
        targetBlock = -1;
    }
    //清除主角原所在處
    ctx.clearRect(currentImgMainX, currentImgMainY, 200, 200);
    if (targetBlock == -1 || mapArray[targetBlock] == 1 || mapArray[targetBlock] == 3) {
        alert('!')
        //所有異常(出界，遇敵，遇障礙物均不動)
    }
    else {//正常情況就設定新的位置
        $("#talkBox").empty();
        currentImgMainX = targetImgMainX;
        currentImgMainY = targetImgMainY;
    }
    //在新的位置上畫主角
    ctx.drawImage(imgMain, cutImagePositionX, 0, 80, 130, currentImgMainX, currentImgMainY, 200, 200);
    //對應用文字顯示狀態
    switch (mapArray[targetBlock]) {
        case undefined:
            $("#talkBox").text("邊界");
            break;
        case 1:
            $("#talkBox").text("有山");
            break;
        case 2:
            $("#talkBox").text("終點");
            break;
        case 3:
            $("#talkBox").text("哈摟");
            break;
    }
});