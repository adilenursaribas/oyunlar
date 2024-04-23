// Mole ve bitki karesinin o anki durumunu tutacak değişkenler
let currMoleTile;
let currPlantTile;

// Oyuncunun puanını tutacak değişken
let score = 0;

// Oyunun bitip bitmediğini kontrol eden değişken
let gameOver = false;

// Sayfa yüklendiğinde oyunu başlatan fonksiyon
window.onload = function() {
    setGame();
}

// Oyun tahtasını oluşturan fonksiyon
function setGame() {
    // HTML'de grid oluştur
    for (let i = 0; i < 9; i++) { // i 0'dan 8'e kadar gider, 9'da durur
        // <div id="0-8"></div> gibi bir yapı oluştur
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }
}
// Mole ve bitki ayarlamaları için aralıkları belirle
setInterval(setMole, 1000); // 1000 milisaniye = 1 saniye, her 1 saniyede bir setMole fonksiyonunu çağır
setInterval(setPlant, 2000); // 2000 milisaniye = 2 saniye, her 2 saniyede bir setPlant fonksiyonunu çağır

// Rastgele bir tile id'si almak için fonksiyon
function getRandomTile() {
    // Math.random --> 0-1 --> (0-1) * 9 = (0-9) --> aşağıya yuvarla (0-8) tam sayılar
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

// Moleyı ayarlamak için fonksiyon
function setMole() {
    if (gameOver) {
        return;
    }
}

    // Mole ve bitki ayarlamaları için aralıkları belirle
setInterval(setMole, 1000); // 1000 milisaniye = 1 saniye, her 1 saniyede bir setMole fonksiyonunu çağır
setInterval(setPlant, 2000); // 2000 milisaniye = 2 saniye, her 2 saniyede bir setPlant fonksiyonunu çağır

// Rastgele bir tile id'si almak için fonksiyon
function getRandomTile() {
    // Math.random --> 0-1 --> (0-1) * 9 = (0-9) --> aşağıya yuvarla (0-8) tam sayılar
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

// Moleyı ayarlamak için fonksiyon
function setMole() {
    if (gameOver) {
        return;
    }

// Oyun bitti mi kontrol et
if (gameOver) {
    return;
}
}

if (currPlantTile) {
    // Eğer mevcut bitki karesi varsa, içeriğini temizle
    currPlantTile.innerHTML = "";
}

// Yeni bir bitki elemanı oluştur
let plant = document.createElement("img");
plant.src = "./piranha-plant.png";

// Rastgele bir kare numarası al
let num = getRandomTile();

// Eğer mevcut mole karesi varsa ve mevcut mole karesinin id'si rastgele numaraya eşitse, fonksiyondan çık
if (currMoleTile && currMoleTile.id == num) {
    return;
}

// Mevcut bitki karesini belirle
currPlantTile = document.getElementById(num);

// Mevcut bitki karesine bitki elemanını ekle
currPlantTile.appendChild(plant);

function selectTile() {
    // Oyun bittiğinde fonksiyondan çık
    if (gameOver) {
        return;
    }
    
    // Eğer seçilen kare mevcut mole karesiyle aynıysa
    if (this == currMoleTile) {
        // Puanı 10 artır
        score += 10;
        // Puanı güncelle
        document.getElementById("score").innerText = score.toString(); // skoru güncelle html
    }
    // Eğer seçilen kare mevcut bitki karesiyle aynıysa
    else if (this == currPlantTile) {
        // Oyunu bitir ve skoru göster
        document.getElementById("score").innerText = "GAME OVER: " + score.toString(); // skoru güncelle html
        gameOver = true;
    }
}

