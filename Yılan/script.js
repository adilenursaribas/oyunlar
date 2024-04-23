// Oyun tahtası
var blockSize = 25; // Kare boyutu
var rows = 20; // Satır sayısı
var cols = 20; // Sütun sayısı
var board; // Oyun tahtası
var context; // Canvas bağlamı

// Yılan başı
var snakeX = blockSize * 5; // Yılanın X konumu
var snakeY = blockSize * 5; // Yılanın Y konumu

var velocityX = 0; // Yılanın X hızı
var velocityY = 0; // Yılanın Y hızı

var snakeBody = []; // Yılan vücudu

// Yiyecek
var foodX; // Yiyeceğin X konumu
var foodY; // Yiyeceğin Y konumu

var gameOver = false; // Oyunun bitip bitmediğini belirler

window.onload = function() {
    board = document.getElementById("board"); // Tahtayı alır
    board.height = rows * blockSize; // Tahtanın yüksekliğini ayarlar
    board.width = cols * blockSize; // Tahtanın genişliğini ayarlar
    context = board.getContext("2d"); // Tahtada çizim yapmak için kullanılır

    placeFood(); // Yiyeceği yerleştirir
    document.addEventListener("keyup", changeDirection); // Klavye olaylarını dinler
    // update();
    setInterval(update, 1000/10); // Belirli bir aralıkta oyunu günceller (100 milisaniyede bir)
}
 
function update() {
    if (gameOver) { // Oyun bitti mi kontrol edilir
        return; // Oyun bitti ise güncelleme durdurulur
    }

    // Tahtayı siyah ile doldur
    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    // Yiyeceği çiz
    context.fillStyle="red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    // Yılanın başı yiyeceği yedi mi kontrol edilir
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]); // Yılanın vücuduna yeni bir parça eklenir
        placeFood(); // Yeni bir yiyecek yerleştirilir
    }

    // Yılanın vücudu güncellenir
    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1]; // Her parça bir öncekinin konumunu alır
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY]; // Yılanın başı güncellenir
    }
}

    // Yılan rengini ayarla
    context.fillStyle="lime";

    // Yılanın hareketini güncelle
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;

    // Yılanın başını çiz
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    // Yılanın vücudunu çiz
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // Oyunu bitirme koşulları
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true; // Yılan tahtanın dışına çıkarsa oyunu bitir
        alert("Game Over"); // Oyunu bitirme mesajı göster
    }

    function changeDirection(e) {
        // Yön değiştirme fonksiyonu
        if (e.code == "ArrowUp" && velocityY != 1) { // Yukarı ok tuşuna basıldığında ve yılan aşağıya gitmiyorsa
            velocityX = 0; // Yatay hızı sıfırla
            velocityY = -1; // Dikey hızı yukarıya ayarla
        }
        else if (e.code == "ArrowDown" && velocityY != -1) { // Aşağı ok tuşuna basıldığında ve yılan yukarıya gitmiyorsa
            velocityX = 0; // Yatay hızı sıfırla
            velocityY = 1; // Dikey hızı aşağıya ayarla
        }
        else if (e.code == "ArrowLeft" && velocityX != 1) { // Sol ok tuşuna basıldığında ve yılan sağa gitmiyorsa
            velocityX = -1; // Yatay hızı sola ayarla
            velocityY = 0; // Dikey hızı sıfırla
        }
        else if (e.code == "ArrowRight" && velocityX != -1) { // Sağ ok tuşuna basıldığında ve yılan sola gitmiyorsa
            velocityX = 1; // Yatay hızı sağa ayarla
            velocityY = 0; // Dikey hızı sıfırla
        }
    }
    function placeFood() {
        // Yemek yerleştirme fonksiyonu
        foodX = Math.floor(Math.random() * cols) * blockSize; // Yemek X koordinatını rastgele belirle
        foodY = Math.floor(Math.random() * rows) * blockSize; // Yemek Y koordinatını rastgele belirle
    }
        
