var playerRed = "R"; // Kırmızı oyuncunun sembolü
var playerYellow = "Y"; // Sarı oyuncunun sembolü
var currPlayer = playerRed; // Şu anki oyuncu, başlangıçta kırmızı oyuncu

var gameOver = false; // Oyunun bitip bitmediğini belirten bayrak
var board; // Oyun tahtası

var rows = 6; // Tahtanın satır sayısı
var columns = 7; // Tahtanın sütun sayısı
var currColumns = []; // Her sütunun hangi satırda olduğunu tutan dizi

window.onload = function() {
    setGame();
}
function setGame() {
    board = []; // Oyun tahtasını temsil eden dizi
    currColumns = [5, 5, 5, 5, 5, 5, 5]; // Her sütunun başlangıçta dolu olmadığını gösteren dizi

    for (let r = 0; r < rows; r++) {
        let row = []; // Her satırı temsil eden dizi
        for (let c = 0; c < columns; c++) {
            // JS
            row.push(' '); // Tahtayı boşluklarla doldur

            // HTML
            let tile = document.createElement("div"); // Yeni bir taş (div) oluştur
            tile.id = r.toString() + "-" + c.toString(); // Taşın ID'sini ayarla
            tile.classList.add("tile"); // Taşa "tile" sınıfını ekle
            tile.addEventListener("click", setPiece); // Tıklanma olayını belirle
            document.getElementById("board").append(tile); // Taşı tahtaya ekle
        }
        board.push(row); // Oluşturulan satırı tahtaya ekle
    }
}

function setPiece() {
    if (gameOver) {
        return;
    }

    // Tıklanan taşın koordinatlarını al
    let coords = this.id.split("-");
    let r = parseInt(coords[0]); // Satır indeksi
    let c = parseInt(coords[1]); // Sütun indeksi

    // Sütunun hangi satırda olduğunu belirle
    r = currColumns[c]; 

    if (r < 0) { // Dolu sütuna taş yerleştirilemez
        return;
    }

    board[r][c] = currPlayer; // JS oyun tahtasını güncelle
    let tile = document.getElementById(r.toString() + "-" + c.toString()); // Taşı HTML'de bul
    if (currPlayer == playerRed) { // Sıradaki oyuncu kırmızı ise
        tile.classList.add("red-piece"); // Taşı kırmızı yap
        currPlayer = playerYellow; // Sırayı sarı oyuncuya geçir
    } else {
        tile.classList.add("yellow-piece"); // Taşı sarı yap
        currPlayer = playerRed; // Sırayı kırmızı oyuncuya geçir
    }

    currColumns[c]--; // Sütunun bir üst satırına taşı indir
}

// Dikey kontrol
for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 3; r++) {
        if (board[r][c] != ' ') { // Boş olmayan bir hücreyi kontrol et
            if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                setWinner(r, c); // Kazananı belirle
                return;
            }
        }
    }
}

// Diagonale karşı kontrol
for (let r = 0; r < rows - 3; r++) {
    for (let c = 0; c < columns - 3; c++) {
        if (board[r][c] != ' ') { // Boş olmayan bir hücreyi kontrol et
            if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                setWinner(r, c); // Kazananı belirle
                return;
            }
        }
    }
}

// Diagonal kontrol
for (let r = 3; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
        if (board[r][c] != ' ') { // Boş olmayan bir hücreyi kontrol et
            if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                setWinner(r, c); // Kazananı belirle
                return;
            }
        }
    }
}


function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == playerRed) {
        winner.innerText = "Kirmizi Kazandi";             
    } else {
        winner.innerText = "Sari Kazandi";
    }
    gameOver = true;
}

