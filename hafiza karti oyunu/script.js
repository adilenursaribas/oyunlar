const cards = document.querySelectorAll(".card");

let matched = 0; // Eşleşen kart sayısını takip eder
let cardOne, cardTwo; // İlk ve ikinci tıklanan kartları temsil eder
let disableDeck = false; // Kartların tıklanabilirliğini kontrol eder

function flipCard({target: clickedCard}) {
    if (cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add("flip");
        if (!cardOne) {
            return cardOne = clickedCard; // İlk kartı kaydeder
        }
        cardTwo = clickedCard; // İkinci kartı kaydeder
        disableDeck = true; // Kartların tıklanabilirliğini kapatır
        let cardOneImg = cardOne.querySelector(".back-view img").src,
            cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg); // Kartları eşleştirir
    }
}

function matchCards(img1, img2) {
    if (img1 === img2) { // Eğer kartlar eşleşiyorsa
        matched++;
        if (matched == 8) { // Tüm kartlar eşleştiyse
            setTimeout(() => {
                return shuffleCard(); // Kartları karıştırır
            }, 1000);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = ""; // İlk ve ikinci kartı sıfırlar
        return disableDeck = false; // Kartların tıklanabilirliğini açar
    }
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400)

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = ""; // İlk ve ikinci kartı sıfırlar
        disableDeck = false; // Kartların tıklanabilirliğini açar
    }, 1200)
}

function shuffleCard() {
    matched = 0; // Eşleşen kart sayısını sıfırlar
    disableDeck = false; // Kartların tıklanabilirliğini açar
    cardOne = cardTwo = ""; // İlk ve ikinci kartı sıfırlar
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1); // Kartların sıralamasını karıştırır
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let gifTag = card.querySelector(".back-view img");
        gifTag.src = `img/img-${arr[i]}.gif`; // Kartlara rastgele gif ekler
        card.addEventListener("click", flipCard);
    });
}

shuffleCard(); // Sayfa yüklendiğinde kartları karıştırır

cards.forEach(card => {
    card.addEventListener("click", flipCard); // Her karta tıklanma olayı ekler
});
