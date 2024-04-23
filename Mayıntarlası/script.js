let board = []; // Oyun tahtası
let rows = 8; // Satır sayısı
let columns = 8; // Sütun sayısı

let minesCount = 10; // Mayın sayısı
let minesLocation = []; // Mayınların konumu "2-2", "3-4", "2-1" gibi

let tilesClicked = 0; // Tüm karoları tıklama hedefi (mayın içermeyenler)
let flagEnabled = false; // Bayrak modu etkin mi?

let gameOver = false; // Oyun bitiş durumu

window.onload = function() {
    startGame(); // Oyun yüklendiğinde başlatılır
}
function setMines() {
    // Önceden belirlenmiş mayın konumlarını eklemek için kullanılan kodlar
    // minesLocation.push("2-2");
    // minesLocation.push("2-3");
    // minesLocation.push("5-6");
    // minesLocation.push("3-4");
    // minesLocation.push("1-1");

    let minesLeft = minesCount; // Koyulacak mayın sayısı
while (minesLeft > 0) { // Mayınlar koyulana kadar devam eder
    let r = Math.floor(Math.random() * rows); // Rastgele bir satır seçer
    let c = Math.floor(Math.random() * columns); // Rastgele bir sütun seçer
    let id = r.toString() + "-" + c.toString(); // Mayının ID'sini oluşturur

    if (!minesLocation.includes(id)) { // ID daha önce eklenmediyse devam eder
        minesLocation.push(id); // Mayını ekler
        minesLeft -= 1; // Koyulacak mayın sayısını azaltır
    }
  }
}

function startGame() {
    document.getElementById("mines-count").innerText = minesCount; // Mayın sayısını gösteren elementin içeriğini ayarlar
    document.getElementById("flag-button").addEventListener("click", setFlag); // Bayrak butonuna tıklamayı dinler
    setMines(); // Mayınları yerleştirir
}

// Oyun tahtasını oluşturur
for (let r = 0; r < rows; r++) { // Satırları döner
    let row = []; // Satırı temsil eden boş bir dizi oluşturur
    for (let c = 0; c < columns; c++) { // Sütunları döner
        // Yeni bir div elementi oluşturur ve özelliklerini ayarlar
        let tile = document.createElement("div");
        tile.id = r.toString() + "-" + c.toString(); // ID'sini ayarlar
        tile.addEventListener("click", clickTile); // Tıklamayı dinler
        document.getElementById("board").append(tile); // Div'i tahtaya ekler
        row.push(tile); // Div'i satır dizisine ekler
    }
    board.push(row); // Satır dizisini tahtaya ekler
}

console.log(board); // Oluşturulan oyun tahtasını konsola yazdırır

function setFlag() {
        flagEnabled = false; // Bayrak modunu devre dışı bırakır
        document.getElementById("flag-button").style.backgroundColor = "lightgray"; // Bayrak butonunun arka plan rengini değiştirir
    
}

else { // Bayrak modu etkin değilse
    flagEnabled = true; // Bayrak modunu etkinleştirir
    document.getElementById("flag-button").style.backgroundColor = "darkgray"; // Bayrak butonunun arka plan rengini değiştirir
}


function clickTile() {
if (gameOver || this.classList.contains("tile-clicked")) { // Oyun bitti veya karoya zaten tıklanmışsa
    return; // İşlemi sonlandırır
}
}

let tile = this; // Tıklanan karo

if (flagEnabled) { // Bayrak modu etkinse
    if (tile.innerText == "") { // Karo boşsa
        tile.innerText = "🚩"; // Bayrak simgesini ekler
    } else if (tile.innerText == "🚩") { // Karo bayrak simgesiyle işaretlenmişse
        tile.innerText = ""; // İşaretlemeyi kaldırır
    }
    return; // İşlemi sonlandırır
}

if (minesLocation.includes(tile.id)) { // Karo bir mayın içeriyorsa
    gameOver = true; // Oyun biter
    revealMines(); // Tüm mayınları gösterir
    return; // İşlemi sonlandırır
}

let coords = tile.id.split("-"); // Karonun satır ve sütun koordinatlarını alır
let r = parseInt(coords[0]); // Satır koordinatını alır
let c = parseInt(coords[1]); // Sütun koordinatını alır
checkMine(r, c); // Mayın kontrol fonksiyonunu çağırır



function revealMines() {
    for (let r = 0; r < rows; r++)  // Satırları döner
        for (let c = 0; c < columns; c++) { // Sütunları döner
            let tile = board[r][c]; // Karoyu alır
            if (minesLocation.includes(tile.id)) { // Karo bir mayın içeriyorsa
                tile.innerText = "💣"; // Mayın simgesini gösterir
                tile.style.backgroundColor = "red"; // Arka plan rengini kırmızı yapar


            }
        }
    }
    function checkMine(r, c) {
        if (r < 0 || r >= rows || c < 0 || c >= columns) { // Geçersiz koordinatlar ise
            return; // İşlemi sonlandırır
        }
        if (board[r][c]. classList.contains("tile-clicked")) { // Karo daha önce tıklanmışsa
            return; // İşlemi sonlandırır
        }
    
        board[r][c].classList.add("tile-clicked"); // Karoyu tıklandı olarak işaretler
        tilesClicked += 1; // Tıklanan karoların sayısını artırır
    
        let minesFound = 0; // Bulunan mayın sayısı
    }      

    // Üst 3 karoyu kontrol eder
minesFound += checkTile(r-1, c-1); // Üst sol
minesFound += checkTile(r-1, c); // Üst
minesFound += checkTile(r-1, c+1); // Üst sağ

// Sol ve sağ kenarları kontrol eder
minesFound += checkTile(r, c-1); // Sol
minesFound += checkTile(r, c+1); // Sağ

// Alt 3 karoyu kontrol eder
minesFound += checkTile(r+1, c-1); // Alt sol
minesFound += checkTile(r+1, c); // Alt
minesFound += checkTile(r+1, c+1); // Alt sağ

if (minesFound > 0) { // Etrafta mayın varsa
    board[r][c].innerText = minesFound; // Karo üzerine bulunan mayın sayısını yazdırır
    board[r][c].classList.add("x" + minesFound.toString()); // Karo sınıfına mayın sayısını ekler
} else { // Etrafta mayın yoksa
    board[r][c].innerText = ""; // Karo üzerinde metin bulunmaz

    // Üst 3 karoyu kontrol eder
checkMine(r-1, c-1); // Üst sol
checkMine(r-1, c); // Üst
checkMine(r-1, c+1); // Üst sağ

// Sol ve sağ kenarları kontrol eder
checkMine(r, c-1); // Sol
checkMine(r, c+1); // Sağ

// Alt 3 karoyu kontrol eder
checkMine(r+1, c-1); // Alt sol
checkMine(r+1, c); // Alt
checkMine(r+1, c+1); // Alt sağ
}

if (tilesClicked == rows * columns - minesCount) { // Tüm karoların tıklanıp tıklanmadığını kontrol eder
    document.getElementById("mines-count").innerText = "Cleared"; // Mayınlar temizlendiğini gösterir
    gameOver = true; // Oyunu sonlandırır
}

function checkTile(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) { // Geçersiz koordinatlar ise
        return 0; // Mayın bulunamaz
    }
    if (minesLocation.includes(r.toString() + "-" + c.toString())) { // Belirtilen koordinatlarda mayın varsa
        return 1; // Mayın bulunur
    }
    return 0; // Mayın bulunmaz
}


