//blackjack classes




// Player class
class Player {
    constructor(name = "", total = 0, cards = [], stand = false) {
        this.name = name;
        this.total = total;
        this.cards = cards;
        this.stand = stand;
        this.div = "<div class=\"hand\"></div>";
        this.cReturn = "<div class=\"hand\"></div>";
    }
}





// Card class
class Card {
    constructor(value = 0, suit = "spade", id = "number", src = "<img src=\"media/images/cards/card-back.png\" alt=\"\" class=\"card1\" ") {
        this.value = value;
        this.suit = suit;
        this.id = id;
        this.src = src;
    }
}
