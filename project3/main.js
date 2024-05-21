//Presley sMith main JS
"use strict";

//var
let mainCards = [];
let otherCards = [];
let players = [];
let player;
let dealer;
let delay;


//window load
window.onload = function () {
    document.querySelector("#reset").onclick = start;
    document.querySelector("#hit").onclick = move;
    document.querySelector("#stand").onclick = stand;
}




function hit(cards, total, stand, person) {
    if (total < 21 && !stand) {
        let card = randomCard();
        cards.push(otherCards[card]);

        person.div = person.div.substring(0, person.div.length - 6);
        mainCards[card].src += `id="${person.name}Card${person.cards.length - 1}">`;
        person.div += `${mainCards[card].src}</div>`;

        otherCards.splice(card, 1);
        total = addCards(cards);
        cards = aceFunc(total, cards);
        total = addCards(cards);
    }
    return total;
}



//delays hitting time
function stand() {
    player.stand = true;
    dealerHitFunc();
}



function aceFunc(total, cards) {
    for (let i = 0; i < cards.length; i++) {
        if (total < 12 && cards[i].value === 1) {
            cards[i].value = 11;
        } else if (total > 21 && cards[i].value === 11) {
            cards[i].value = 1;
        }
    }
    return cards;
}



function dealerHitFunc() {
    while (dealer.total <= 17) {
        dealer.total = hit(dealer.cards, dealer.total, dealer.stand, dealer);
    }

    document.querySelector("#main").innerHTML = dealer.cReturn + player.div;
    document.querySelector("#dealerTotal").innerHTML = "Dealer Total: " + dealer.total;
    win();
    format();
}




function start() {
    //initialize classes
    player = new Player("player");
    dealer = new Player("dealer");
    players.push(player);
    players.push(dealer);


    for (let i = 1; i <= 13; i++) {
        for (let j = 0; j < 4; j++) {
            let cValue = i > 10 ? 10 : i;
            let cSuit = ["clubs", "hearts", "diamonds", "spades"][j];
            let cardImg = `<img src="media/cards/${cSuit}-${i}.png" alt="" class="card1" `;
            mainCards.push(new Card(cValue, cSuit, "number", cardImg));
        }
    }

    otherCards = mainCards;

    //player cards
    for (let i = 0; i < 2; i++) {
        player.total = hit(player.cards, player.total, player.stand, player);
    }

    //dealer face down card
    dealer.cards.push(otherCards.splice(randomCard(), 1)[0]);
    dealer.cReturn = `<div class="hand">${mainCards[randomCard()].src}id="${dealer.name}Card1"></div>`;

    //dealer up card
    dealer.total = hit(dealer.cards, dealer.total, dealer.stand, dealer);

    document.querySelector("#main").innerHTML = dealer.cReturn + player.div;
    document.querySelector("#playerTotal").innerHTML = "Player Total: " + player.total;
    const resultElement = document.querySelector("#result");
    if (resultElement) {
        resultElement.classList.add("hidden");
    }

    //audio
    const audio = document.querySelector("#audioPlayer");
    audio.play();
}





function addCards(cards) {
    //array.prototype.reduce() to calculate card total
    return cards.reduce((total, card) => total + card.value, 0);
}



function randomCard() {
    return Math.floor(Math.random() * (otherCards.length - 1) + 1);
}



function move() {
    //player cards
    player.total = hit(player.cards, player.total, player.stand, player);


    document.querySelector("#main").innerHTML = dealer.cReturn + player.div;
    document.querySelector("#playerTotal").innerHTML = "Player Total: " + player.total;
    win();
    format();

    //bust or stand???
    if (player.total >= 21 || player.stand) {
        dealerHitFunc();
    }
}



function format() {
    for (let i = 0; i < player.cards.length; i++) {
        // Two rows
        if (i >= 3 && i < 6) {
            document.querySelector(`#playerCard${i}`).classList.remove("card1");
            document.querySelector(`#playerCard${i}`).classList.add("card2");
            let cardOffset = 35;
            let offset = i - 3;
            document.querySelector(`#playerCard${i}`).style.left = `${cardOffset + offset * 12}%`;
        }
        // Three rows
        else if (i >= 6 && i < 9) {
            document.querySelector(`#playerCard${i}`).classList.remove("card1");
            document.querySelector(`#playerCard${i}`).classList.add("card3");
            let initialOffset = 38;
            let offset = i - 6;
            document.querySelector(`#playerCard${i}`).style.left = `${initialOffset + offset * 12}%`;
        }
        // Four rows
        else if (i >= 9) {
            document.querySelector(`#playerCard${i}`).classList.remove("card1");
            document.querySelector(`#playerCard${i}`).classList.add("card4");
            let initialOffset = 41;
            let offset = i - 9;
            document.querySelector(`#playerCard${i}`).style.left = `${initialOffset + offset * 12}%`;
        }
    }

    //formats opponents cards
    for (let i = 0; i < dealer.cards.length; i++) {
        //two rows
        if (i >= 3 && i < 6) {
            document.querySelector(`#dealerCard${i}`).classList.remove("card1");
            document.querySelector(`#dealerCard${i}`).classList.add("card2");
            let initialOffset = 35;
            let offset = i - 3;
            document.querySelector(`#dealerCard${i}`).style.left = `${initialOffset + offset * 12}%`;
        }
        //three Rows
        else if (i >= 6 && i < 9) {
            document.querySelector(`#dealerCard${i}`).classList.remove("card1");
            document.querySelector(`#dealerCard${i}`).classList.add("card3");
            let initialOffset = 38;
            let offset = i - 6;
            document.querySelector(`#dealerCard${i}`).style.left = `${initialOffset + offset * 12}%`;
        }
        //four Rows
        else if (i >= 9) {
            document.querySelector(`#dealerCard${i}`).classList.remove("card1");
            document.querySelector(`#dealerCard${i}`).classList.add("card4");
            let initialOffset = 41;
            let offset = i - 9;
            document.querySelector(`#dealerCard${i}`).style.left = `${initialOffset + offset * 12}%`;
        }
    }
}




function dealerStand() {
    const dealerStandElement = document.querySelector("#dealerStand");
    if (dealerStandElement) {
        dealerStandElement.innerHTML = "Stand";
        dealerStandElement.classList.remove("hidden");
    } else {
        console.error("Dealer Stand element not found.");
    }
}




//end game message and show dealer total
function endGame(resultMessage) {
    document.querySelector("#dealerTotal").innerHTML = "Dealer Total: " + dealer.total;
    document.querySelector("#dealerTotal").classList.remove("hidden");
    const resultElement = document.querySelector("#result");
    resultElement.innerHTML = resultMessage;
    resultElement.classList.remove("hidden");
    document.querySelector("#main").innerHTML = dealer.div + player.div;
    document.querySelector("#dealerStand").classList.add("hidden");
    clearInterval(delay);
}



//win conditions
function win() {
    if (player.total > 21) {
        endGame("Loss: Player BUST");
    } else if (dealer.total > 21) {
        endGame("Win: Dealer BUST");
    } else if (player.stand) {
        if (player.total > dealer.total) {
            endGame("Win: Player HIGH");
        } else if (dealer.total > player.total) {
            endGame("Loss: Dealer HIGH");
        } else if (player.total === dealer.total) {
            endGame("TIE");
        }
    }
}




function resetGame() {
    //show/hide message
    const resultElement = document.querySelector("#result");
    if (resultElement) {
        resultElement.classList.add("hidden");
    }

    //players
    player = new Player("player");
    dealer = new Player("dealer");
    players.push(player);
    players.push(dealer);

    //cards
    mainCards = [];
    otherCards = [];
    for (let i = 1; i <= 13; i++) {
        for (let j = 0; j < 4; j++) {
            let cValue = i > 10 ? 10 : i;
            let cSuit = ["clubs", "hearts", "diamonds", "spades"][j];
            let cardImg = `<img src="media/cards/${cSuit}-${i}.png" alt="" class="card1" `;
            mainCards.push(new Card(cValue, cSuit, "number", cardImg));
        }
    }
    otherCards = mainCards;
    document.querySelector("#main").innerHTML = dealer.cReturn + player.div;
    document.querySelector("#playerTotal").innerHTML = "Player Total: " + player.total;
    document.querySelector("#dealerTotal").innerHTML = "Dealer Total: ";
}



//reset button handler
document.querySelector("#reset").addEventListener("click", resetGame);


//start game
start();






