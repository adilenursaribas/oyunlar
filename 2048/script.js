


var board; // Oyun tahtasını temsil eden bir 2 boyutlu dizi.
var score = 0; // Oyuncunun puanını tutan değişken.
var rows = 4; // Tahtanın satır sayısı.
var columns = 4; // Tahtanın sütun sayısı.

window.onload = function() {
    setGame(); // Sayfa yüklendiğinde oyunu başlatan fonksiyonu çağır.
}

function setGame() {
    // Oyun tahtasını oluştur ve boş bir tahta ayarla.
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    // Tahta üzerindeki her bir kareyi HTML'e ekle.
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
    // Oyuna başlamak için iki adet 2 tahta üzerine yerleştir.
    setTwo();
    setTwo();
}

function updateTile(tile, num) {
    // Kareyi temizle ve sınıfları sıfırla.
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num.toString(); // Kareye numarasını ekle.
        if (num <= 4096) {
            tile.classList.add("x" + num.toString()); // Numaraya göre uygun sınıfı ekle.
        } else {
            tile.classList.add("x8192"); // 4096'dan büyükse özel bir sınıf ekle.
        }
    }
}

document.addEventListener('keyup', (e) => {
    // Klavye tuşlarına göre hareket et ve yeni bir 2 ekleyerek tahtayı güncelle.
    if (e.code == "ArrowLeft") {
        slideLeft();
        setTwo();
    }
    else if (e.code == "ArrowRight") {
        slideRight();
        setTwo();
    }
    else if (e.code == "ArrowUp") {
        slideUp();
        setTwo();
    }
    else if (e.code == "ArrowDown") {
        slideDown();
        setTwo();
    }
    document.getElementById("score").innerText = score; // Puanı güncelle.
})

function filterZero(row) {
    return row.filter(num => num != 0); // Sıfırdan farklı olan tüm sayıları içeren yeni bir dizi oluştur.
}

function slide(row) {
    // Kaydırma işlemini gerçekleştir.
    row = filterZero(row);
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] == row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i]; // Eşleşen sayıları birleştir ve puanı güncelle.
        }
    }
    row = filterZero(row);
    // Sıfırları ekleyerek diziyi tamamla.
    while (row.length < columns) {
        row.push(0);
    }
    return row;
}

function slideLeft() {
    // Tahtayı sola kaydır.
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideRight() {
    // Tahtayı sağa kaydır.
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row.reverse(); // Satırları ters çevir.
        row = slide(row);
        board[r] = row.reverse(); // Sonucu tekrar ters çevir.
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp() {
    // Tahtayı yukarı kaydır.
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown() {
    // Tahtayı aşağı kaydır.
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function setTwo() {
    // Boş bir kareye 2 ekleyin.
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    while (!found) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}

function hasEmptyTile() {
     // Boş bir kare var mı kontrol et.
    let count = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) { //at least one zero in the board
                return true;
            }
        }
    }
    return false;
}