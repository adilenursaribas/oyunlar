// Tahta değişkenleri
let board;
let boardWidth = 500;
let boardHeight = 500;
let context; 

// Oyuncular
let playerWidth = 10;
let playerHeight = 50;
let playerVelocityY = 0;

// Oyuncu 1
let player1 = {
    x : 10, // Oyuncu 1'in başlangıç x pozisyonu
    y : boardHeight/2, // Oyuncu 1'in başlangıç y pozisyonu
    width: playerWidth, // Oyuncu 1'in genişliği
    height: playerHeight, // Oyuncu 1'in yüksekliği
    velocityY : 0 // Oyuncu 1'in dikey hızı
}

// Oyuncu 2
let player2 = {
    x : boardWidth - playerWidth - 10, // Oyuncu 2'nin başlangıç x pozisyonu
    y : boardHeight/2, // Oyuncu 2'nin başlangıç y pozisyonu
    width: playerWidth, // Oyuncu 2'nin genişliği
    height: playerHeight, // Oyuncu 2'nin yüksekliği
    velocityY : 0 // Oyuncu 2'nin dikey hızı
}

// Top
let ballWidth = 10; // Topun genişliği
let ballHeight = 10; // Topun yüksekliği
let ball = {
    x : boardWidth/2, // Topun başlangıç x pozisyonu
    y : boardHeight/2, // Topun başlangıç y pozisyonu
    width: ballWidth, // Topun genişliği
    height: ballHeight, // Topun yüksekliği
    velocityX : 1, // Topun yatay hızı
    velocityY : 2 // Topun dikey hızı
}

// Oyuncu 1'in skoru
let player1Score = 0;

// Oyuncu 2'nin skoru
let player2Score = 0;

window.onload = function() {
    // Tahta elementini al
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); // Tahtada çizim yapmak için kullanılır

    // Oyuncu 1'i çiz
    context.fillStyle="skyblue";
    context.fillRect(player1.x, player1.y, playerWidth, playerHeight);

    // Oyunu güncelleme fonksiyonunu çağır
    requestAnimationFrame(update);

    // Oyuncunun hareket etmesini dinle
    document.addEventListener("keyup", movePlayer);
}

function update() {
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

    // Oyuncu 1
    context.fillStyle = "skyblue";
    let nextPlayer1Y = player1.y + player1.velocityY;
    if (!outOfBounds(nextPlayer1Y)) {
        player1.y = nextPlayer1Y;
    }
    context.fillRect(player1.x, player1.y, playerWidth, playerHeight);

    // Oyuncu 2
    let nextPlayer2Y = player2.y + player2.velocityY;
    if (!outOfBounds(nextPlayer2Y)) {
        player2.y = nextPlayer2Y;
    }
}

// Oyuncu 2'nin yeni dikey konumu hesaplanır
let nextPlayer2Y = player2.y + player2.velocityY;
// Oyuncu 2'nin yeni konumu tahta sınırlarını aşıp aşmadığı kontrol edilir
if (!outOfBounds(nextPlayer2Y)) {
    player2.y = nextPlayer2Y;
}
// Oyuncu 2'nin pozisyonu güncellenir
context.fillRect(player2.x, player2.y, playerWidth, playerHeight);

// Topun hareketi güncellenir
context.fillStyle = "white";
ball.x += ball.velocityX;
ball.y += ball.velocityY;
// Topun yeni pozisyonu çizilir
context.fillRect(ball.x, ball.y, ballWidth, ballHeight);

// Top tahtanın üstüne veya altına çarptı mı kontrol edilir
if (ball.y <= 0 || (ball.y + ballHeight >= boardHeight)) { 
    // Çarparsa, topun yönü tersine çevirilir
    ball.velocityY *= -1; // Yönü tersine çevir
}

// Topun oyuncu paddle'larına çarpıp geri dönmesi kontrol edilir
if (detectCollision(ball, player1)) { // Eğer top oyuncu 1'e çarparsa
    if (ball.x <= player1.x + player1.width) { // Topun sol tarafı, oyuncu 1'in sağ tarafına çarparsa (sol paddle)
        ball.velocityX *= -1;   // x yönü tersine çevrilir
    }
}
else if (detectCollision(ball, player2)) { // Eğer top oyuncu 2'ye çarparsa
    if (ball.x + ballWidth >= player2.x) { // Topun sağ tarafı, oyuncu 2'nin sol tarafına çarparsa (sağ paddle)
        ball.velocityX *= -1;   // x yönü tersine çevrilir
    }
}

// Oyun biter mi kontrol edilir
if (ball.x < 0) { // Eğer top tahtanın sol tarafına çarparsa
    player2Score++; // Oyuncu 2'nin skoru artırılır
    resetGame(1); // Oyun sıfırlanır, parametre 1: Oyuncu 1 kazanır
}
else if (ball.x + ballWidth > boardWidth) { // Eğer top tahtanın sağ tarafına çarparsa
    player1Score++; // Oyuncu 1'in skoru artırılır
    resetGame(-1); // Oyun sıfırlanır, parametre -1: Oyuncu 2 kazanır
}

// Skorları ekrana yazdır
context.font = "45px sans-serif";
context.fillText(player1Score, boardWidth / 5, 45); // Oyuncu 1'in skoru
context.fillText(player2Score, boardWidth * 4 / 5 - 45, 45); // Oyuncu 2'in skoru

// Ortadaki kesik çizgiyi çiz
for (let i = 10; i < board.height; i += 25) { // Her 25 pikselde bir kare çiz
    context.fillRect(board.width / 2 - 10, i, 5, 5); // (x pozisyonu = tahta genişliğinin yarısı (ortada) - 10), i = y pozisyonu, genişlik = 5, yükseklik = 5
}
 
function outOfBounds(yPosition) {
    return (yPosition < 0 || yPosition + playerHeight > boardHeight);
}

function movePlayer(e) {
    // Oyuncu 1 için kontrol
    if (e.code == "KeyW") { // "W" tuşuna basıldığında
        player1.velocityY = -3; // Yukarı doğru hızı ayarla
    } else if (e.code == "KeyS") { // "S" tuşuna basıldığında
        player1.velocityY = 3; // Aşağı doğru hızı ayarla
    }

    // Oyuncu 2 için kontrol
    if (e.code == "ArrowUp") { // Yukarı ok tuşuna basıldığında
        player2.velocityY = -3; // Yukarı doğru hızı ayarla
    } else if (e.code == "ArrowDown") { // Aşağı ok tuşuna basıldığında
        player2.velocityY = 3; // Aşağı doğru hızı ayarla
    }
}

function detectCollision(a, b) {
    // İki nesne arasındaki çarpışmayı kontrol eder
    return a.x < b.x + b.width &&   // a'nın sol üst köşesi b'nin sağ üst köşesine ulaşmaz
           a.x + a.width > b.x &&   // a'nın sağ üst köşesi b'nin sol üst köşesini geçer
           a.y < b.y + b.height &&  // a'nın sol üst köşesi b'nin sol alt köşesine ulaşmaz
           a.y + a.height > b.y;    // a'nın sol alt köşesi b'nin sol üst köşesini geçer
}

function resetGame(direction) {
    // Oyunu sıfırlar ve topu ortaya yerleştirir
    ball = {
        x: boardWidth / 2,  // x pozisyonu
        y: boardHeight / 2, // y pozisyonu
        width: ballWidth,   // genişlik
        height: ballHeight, // yükseklik
        velocityX: direction, // x ekseninde hız
        velocityY: 2          // y ekseninde hız
    }
}


