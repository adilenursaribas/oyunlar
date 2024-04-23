var board; // Oyun tahtası
var playerO = "O"; // Oyuncu O'nun sembolü
var playerX = "X"; // Oyuncu X'in sembolü
var currPlayer = playerO; // Şu anki oyuncu
var gameOver = false; // Oyunun bitip bitmediğini belirten bayrak

window.onload = function() {
    setGame(); // Sayfa yüklendiğinde oyunu başlat
}

function setGame() {
    // Oyun tahtasını oluştur
    board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];
}

for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
        let tile = document.createElement("div"); // Yeni bir div oluştur
        tile.id = r.toString() + "-" + c.toString(); // Her hücreye benzersiz bir id atama
        tile.classList.add("tile"); // "tile" sınıfını ekleyerek CSS stilini uygula
        if (r == 0 || r == 1) {
            tile.classList.add("horizontal-line"); // Yatay çizgi sınıfını ekleyerek yatay çizgi oluştur
        }
        if (c == 0 || c == 1) {
            tile.classList.add("vertical-line"); // Dikey çizgi sınıfını ekleyerek dikey çizgi oluştur
        }
        tile.innerText = ""; // Başlangıçta içeriği boşalt
        tile.addEventListener("click", setTile); // Tıklanabilir hale getir ve setTile fonksiyonunu çağır
        document.getElementById("board").appendChild(tile); // Oyun tahtasına ekle
     }
  }


  function setTile() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-");    //ex) "1-2" -> ["1", "2'"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (board[r][c] != ' ') { 
        //already taken spot
        return;
    }
    
    board[r][c] = currPlayer; //mark the board
    this.innerText = currPlayer; //mark the board on html
  // Oyuncu değişikliği
if (currPlayer == playerO) {
    currPlayer = playerX;
} else {
    currPlayer = playerO;
}

// Kazananı kontrol etme
checkWinner();
  }

  // Yatayda, 3 satırı kontrol et
for (let r = 0; r < 3; r++) {
    if (board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[r][0] != ' ') {
        // Eğer kazanan satırı bulduysak
        // o satıra kazanan stili uygula
        for (let i = 0; i < 3; i++) {
            let tile = document.getElementById(r.toString() + "-" + i.toString());
            tile.classList.add("winner");
        }
        gameOver = true;
        return;
    }
}

function checkWinner() {
// Yatayda, 3 satırı kontrol et
for (let r = 0; r < 3; r++) {
    if (board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[r][0] != ' ') {
        // Eğer kazanan satırı bulduysak
        // o satıra kazanan stili uygula
        for (let i = 0; i < 3; i++) {
            let tile = document.getElementById(r.toString() + "-" + i.toString());
            tile.classList.add("winner");
        }
        gameOver = true;
        return;
    }
  }

  // Dikeyde, 3 sütunu kontrol et
for (let c = 0; c < 3; c++) {
    if (board[0][c] == board[1][c] && board[1][c] ==  board[2][c] && board[0][c] != ' ') {
        // Eğer kazanan sütunu bulduysak
        // o sütuna kazanan stili uygula
        for (let i = 0; i < 3; i++) {
            let tile = document.getElementById(i.toString() + "-" + c.toString());                
            tile.classList.add("winner");
        }
        gameOver = true;
        return;
    }
}


// Çapraz olarak
if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ' ') {
    for (let i = 0; i < 3; i++) {
        let tile = document.getElementById(i.toString() + "-" + i.toString());                
        tile.classList.add("winner");
    }
    gameOver = true;
    return;
}

// Anti-çapraz olarak
if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ' ') {
    // 0-2
    let tile = document.getElementById("0-2");                
    tile.classList.add("winner");
}

// 1-1
tile = document.getElementById("1-1");                
tile.classList.add("winner");

// 2-0
tile = document.getElementById("2-0");                
tile.classList.add("winner");
gameOver = true;
return;
}
