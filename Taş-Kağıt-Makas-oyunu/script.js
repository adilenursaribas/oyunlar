// Kullanıcı ve bilgisayarın skorları
let userScore = 0;
let computerScore = 0;

// HTML'deki skorları gösteren elementlerin referansları
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("comp-score");

// Skor tablosunun bulunduğu div
const scoreBoard_div = document.querySelector(".score-board");

// Sonucu gösteren paragraf elementi
const result_p = document.querySelector(".result > p");

// Kullanıcının seçeneklerine ait div elementleri
const rock_div = document.getElementById("r"); // Taş seçeneği
const paper_div = document.getElementById("p"); // Kağıt seçeneği
const scissors_div = document.getElementById("s"); // Makas seçeneği

// Bilgisayarın seçimini döndüren fonksiyon
function getComputerChoice() {
    const choices = ['r', 'p', 's']; // r: Taş, p: Kağıt, s: Makas
    const randomNumber = Math.floor(Math.random() * 3); // Rastgele sayı oluştur
    return choices[randomNumber]; // Seçimi döndür
}

// Seçilen harfi kelimeye dönüştüren fonksiyon
function convertToWord(letter) {
    if (letter === "r") return "Taş";
    if (letter === "p") return "Kağit";
    return "Makas";
}

// Kullanıcının kazandığı durumu işleyen fonksiyon
function win(userChoice, computerChoice) {
    const smallUserWord = "user".fontsize(3).sub(); // Küçük yazı stilinde "user" kelimesi
    const smallCompWord = "comp".fontsize(3).sub(); // Küçük yazı stilinde "comp" kelimesi
    const userChoice_div = document.getElementById(userChoice); // Kullanıcının seçimini temsil eden div elementi
    userScore++; // Kullanıcının skorunu arttır
    userScore_span.innerHTML = userScore; // Kullanıcı skorunu güncelle
    computerScore_span.innerHTML = computerScore; // Bilgisayar skorunu güncelle
    // Sonucu ekrana yaz
    result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} kazanir ${convertToWord(computerChoice)}${smallCompWord} [Kazandin! 🔥 ]`;
    // Kullanıcının seçimini vurgula
    userChoice_div.classList.add('green-glow');
    // Vurgulamayı 0.3 saniye sonra kaldır
    setTimeout(() => 
        userChoice_div.classList.remove('green-glow')
    , 300);
}

// Kullanıcının kaybettiği durumu işleyen fonksiyon
function lose(userChoice, computerChoice) {
    const smallUserWord = "user".fontsize(3).sub(); // Küçük yazı stilinde "user" kelimesi
    const smallCompWord = "comp".fontsize(3).sub(); // Küçük yazı stilinde "comp" kelimesi
    const userChoice_div = document.getElementById(userChoice); // Kullanıcının seçimini temsil eden div elementi
    computerScore++; // Bilgisayarın skorunu arttır
    userScore_span.innerHTML = userScore; // Kullanıcı skorunu güncelle
    computerScore_span.innerHTML = computerScore; // Bilgisayar skorunu güncelle
    // Sonucu ekrana yaz
    result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} kaybeder ${convertToWord(computerChoice)}${smallCompWord} [Kaybettin... ☠ ]`;
    // Kullanıcının seçimini vurgula
    userChoice_div.classList.add('red-glow');
    // Vurgulamayı 0.3 saniye sonra kaldır
    setTimeout(() => 
        userChoice_div.classList.remove('red-glow'), 300);
}

// Beraberlik durumunu işleyen fonksiyon
function draw(userChoice, computerChoice) {
    const smallUserWord = "user".fontsize(3).sub(); // Küçük yazı stilinde "user" kelimesi
    const smallCompWord = "comp".fontsize(3).sub(); // Küçük yazı stilinde "comp" kelimesi
    const userChoice_div = document.getElementById(userChoice); // Kullanıcının seçimini temsil eden div elementi
    // Sonucu ekrana yaz
    result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} eşittir ${convertToWord(computerChoice)}${smallCompWord} [Berabere... 🏁 ]`;
    // Kullanıcının seçimini vurgula
    userChoice_div.classList.add('gray-glow');
    // Vurgulamayı 0.3 saniye sonra kaldır
    setTimeout(() =>
        userChoice_div.classList.remove('gray-glow')
    , 300);
}

// Oyunu işleyen fonksiyon
function game(userChoice) {
    // Bilgisayarın rastgele seçtiği hamle
    const computerChoice = getComputerChoice();
    // Kullanıcının seçimi ve bilgisayarın seçimi arasındaki durumları kontrol et
    switch (userChoice + computerChoice) {
        // Kullanıcı kazandığı durumlar
        case "rs":
        case "pr":
        case "sp":
            win(userChoice, computerChoice);
            break;
        // Kullanıcı kaybettiği durumlar
        case "rp":
        case "ps":
        case "sr":
            lose(userChoice, computerChoice);
            break;
        // Berabere durum
        case "rr":
        case "pp":
        case "ss":
            draw(userChoice, computerChoice);
            break;
    }
}

// Ana fonksiyon
function main() {
    // Taş, kağıt, makas seçeneklerine tıklama olayları
    rock_div.addEventListener('click', () => game("r"));
    paper_div.addEventListener('click', () => game("p"));
    scissors_div.addEventListener('click', () => game("s"));
}

// Ana fonksiyonu çağır
main();

