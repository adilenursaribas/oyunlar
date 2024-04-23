//board
let board; // Oyun tahtasını temsil eden değişken
let boardWidth = 500; // Tahtanın genişliği
let boardHeight = 500; // Tahtanın yüksekliği
let context; // Tahtayı çizmek için kullanılacak 2D bağlamı

//players
let playerWidth = 80; // Oyuncunun genişliği
let playerHeight = 10; // Oyuncunun yüksekliği
let playerVelocityX = 10; // Oyuncunun hareket hızı (her adımda 10 piksel)

// Oyuncu nesnesi
let player = {
    x : boardWidth/2 - playerWidth/2, // Oyuncunun x konumu
    y : boardHeight - playerHeight - 5, // Oyuncunun y konumu
    width: playerWidth, // Oyuncunun genişliği
    height: playerHeight, // Oyuncunun yüksekliği
    velocityX : playerVelocityX // Oyuncunun x ekseni boyunca hareket hızı
}

//ball
// Toplam genişlik ve yükseklik
let ballWidth = 10;
let ballHeight = 10;

// Toplam hız değişkenleri
let ballVelocityX = 3; //15 for testing, 3 normal
let ballVelocityY = 2; //10 for testing, 2 normal

// Toplam top nesnesi
let ball = {
    x : boardWidth/2, // x koordinatı
    y : boardHeight/2, // y koordinatı
    width: ballWidth, // genişlik
    height: ballHeight, // yükseklik
    velocityX : ballVelocityX, // x ekseninde hız
    velocityY : ballVelocityY // y ekseninde hız
}

//blocks
// Blok dizisi
let blockArray = [];

// Blok genişlik ve yükseklik
let blockWidth = 50;
let blockHeight = 10;

// Blok sütun ve satır sayısı
let blockColumns = 8;
let blockRows = 3; // Oyun ilerledikçe daha fazla eklenecek
let blockMaxRows = 10; // Maksimum satır sayısı
let blockCount = 0; // Blok sayısı

// Başlangıç ​​blok köşeleri sol üst
let blockX = 15;
let blockY = 45;

// Skor ve oyun durumu
let score = 0;
let gameOver = false;

window.onload = function() {
    // Oyun tahtasını ve context'i al
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); // Tahtada çizim yapmak için kullanılır

    // Başlangıçta oyuncuyu çiz
    context.fillStyle="skyblue";
    context.fillRect(player.x, player.y, player.width, player.height);

    // Oyun döngüsünü başlat
    requestAnimationFrame(update);

    // Oyuncuyu hareket ettirmek için klavye olaylarını dinle
    document.addEventListener("keydown", movePlayer);
}

 //create blocks
 createBlocks();
function update() {
    // Oyun döngüsünü güncelle
    requestAnimationFrame(update);

    // Oyun bitti mi kontrol et
    if (gameOver) {
        return;
    }

    // Tahtayı temizle
    context.clearRect(0, 0, board.width, board.height);

    // Oyuncuyu çiz
    context.fillStyle = "lightgreen";
    context.fillRect(player.x, player.y, player.width, player.height);

    // Topu çiz
context.fillStyle = "white";
ball.x += ball.velocityX;
ball.y += ball.velocityY;
context.fillRect(ball.x, ball.y, ball.width, ball.height);

// Topu oyuncu pediyle çarp
if (topCollision(ball, player) || bottomCollision(ball, player)) {
    ball.velocityY *= -1;   // Yönü yukarı veya aşağı çevir
}
else if (leftCollision(ball, player) || rightCollision(ball, player)) {
    ball.velocityX *= -1;   // Yönü sola veya sağa çevir
}

if (ball.y <= 0) { 
    // Eğer top, canvas'ın üstüne değerse
    ball.velocityY *= -1; // Yönü tersine çevir
}
else if (ball.x <= 0 || (ball.x + ball.width >= boardWidth)) {
    // Eğer top, canvas'ın sol veya sağ kenarına değerse
    ball.velocityX *= -1; // Yönü tersine çevir
}
else if (ball.y + ball.height >= boardHeight) {
    // Eğer top, canvas'ın altına değerse
    context.font = "20px sans-serif";
    context.fillText("Game Over: Press 'Space' to Restart", 80, 400);
    gameOver = true;
}

// Blokların durumu
context.fillStyle = "skyblue";
for (let i = 0; i < blockArray.length; i++) {
    let block = blockArray[i];
    if (!block.break) {
        // Eğer top, bloğun üst veya alt kenarına değerse
        if (topCollision(ball, block) || bottomCollision(ball, block)) {
            block.break = true;     // Blok kırıldı
            ball.velocityY *= -1;   // Yönü tersine çevir (yukarı veya aşağı)
            score += 100;           // Skoru artır
            blockCount -= 1;        // Blok sayısını azalt
        }
        // Eğer top, bloğun sol veya sağ kenarına değerse
        else if (leftCollision(ball, block) || rightCollision(ball, block)) {
            block.break = true;     // Blok kırıldı
            ball.velocityX *= -1;   // Yönü tersine çevir (sağa veya sola)
            score += 100;           // Skoru artır
            blockCount -= 1;        // Blok sayısını azalt
        }
        context.fillRect(block.x, block.y, block.width, block.height);
    }
}

// Sonraki seviye
if (blockCount == 0) {
    score += 100 * blockRows * blockColumns; // Bonus puanlar
    blockRows = Math.min(blockRows + 1, blockMaxRows); // Blok satırını bir sonraki seviyeye geçir (en fazla 10)
    createBlocks(); // Yeni blokları oluştur
}

// Skor
context.font = "20px sans-serif";
context.fillText(score, 10, 25);

// Taşma kontrolü
function outOfBounds(xPosition) {
    return (xPosition < 0 || xPosition + playerWidth > boardWidth);
}

// Oyuncu hareketi
function movePlayer(e) {
    if (gameOver) {
        if (e.code == "Space") {
            resetGame(); // Oyunu sıfırla
            console.log("RESET"); // Konsola "RESET" yazdır
        }
        return;
    }
}

if (e.code == "ArrowLeft") {
    // player.x -= player.velocityX;
    let nextplayerX = player.x - player.velocityX;
    if (!outOfBounds(nextplayerX)) {
        player.x = nextplayerX;
    }
}
else if (e.code == "ArrowRight") {
    let nextplayerX = player.x + player.velocityX;
    if (!outOfBounds(nextplayerX)) {
        player.x = nextplayerX;
    }
    // player.x += player.velocityX;    
}

}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&   // a'nın sol üst köşesi b'nin sağ üst köşesine ulaşmaz
           a.x + a.width > b.x &&   // a'nın sağ üst köşesi b'nin sol üst köşesini geçer
           a.y < b.y + b.height &&  // a'nın sol üst köşesi b'nin sol alt köşesine ulaşmaz
           a.y + a.height > b.y;    // a'nın sol alt köşesi b'nin sol üst köşesini geçer
}

function topCollision(ball, block) { // a, b'nin üzerinde (top, bloğun üzerinde)
    return detectCollision(ball, block) && (ball.y + ball.height) >= block.y;
}

function bottomCollision(ball, block) { // a, b'nin altında (top, bloğun altında)
    return detectCollision(ball, block) && (block.y + block.height) >= ball.y;
}

function leftCollision(ball, block) { // a, b'nin solunda (top, bloğun solunda)
    return detectCollision(ball, block) && (ball.x + ball.width) >= block.x;
}

function rightCollision(ball, block) { // a, b'nin sağındadır (top, bloğun sağındadır)
    return detectCollision(ball, block) && (block.x + block.width) >= ball.x;
}

function createBlocks() {
    blockArray = []; // blockArray'i temizle
    for (let c = 0; c < blockColumns; c++) {
        for (let r = 0; r < blockRows; r++) {
            let block = {
                x : blockX + c * (blockWidth + 10), // c*10 10 piksel aralıklı sütunlar
                y : blockY + r * (blockHeight + 10), // r*10 10 piksel aralıklı satırlar
                width : blockWidth,
                height : blockHeight,
                break : false
            }
        }
    }

}
blockArray.push(block);


blockCount = blockArray.length; // Oyun alanındaki blok sayısını güncelle


function resetGame() {
gameOver = false; // Oyun devam ediyor
// Oyuncu özelliklerini başlangıç konumuna sıfırla
player = {
x: boardWidth / 2 - playerWidth / 2,
y: boardHeight - playerHeight - 5,
width: playerWidth,
height: playerHeight,
velocityX: playerVelocityX // Oyuncunun hızı
};
}
// Topun özellikleri
 ball = {
    x: boardWidth / 2,      // Topun x koordinatı
    y: boardHeight / 2,     // Topun y koordinatı
    width: ballWidth,       // Topun genişliği
    height: ballHeight,     // Topun yüksekliği
    velocityX: ballVelocityX, // Topun x eksenindeki hızı
    velocityY: ballVelocityY  // Topun y eksenindeki hızı
};

// Blok array'i sıfırla
 blockArray = [];

// Oyun skoru
 score = 0;

// Blok satır sayısı
 blockRows = 3;

// Oyunu sıfırla ve blokları oluştur
createBlocks();






