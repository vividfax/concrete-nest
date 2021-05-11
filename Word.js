class Word {

    constructor(word, x, y, fontSize) {

        this.word = word;
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.color = colors.black;
        this.bold = false;
        this.drag = false;
    }

    display() {
        textSize(this.fontSize);
        if (this.bold) {
            textStyle(BOLD);
        } else {
            textStyle(NORMAL);
        }
        fill(this.color);
        text(this.word, this.x, this.y);
    }

    highlight() {

        this.bold = true;
    }

    lowlight() {

        this.bold = false;
    }

    intersect(x, y) {
        let radius = 3;

        let xIntersect = x > this.x - textWidth(this.word)/2 - radius && x < this.x + textWidth(this.word)/2 + radius;
        let yIntersect = y > this.y - textSize(this.word)/2 - radius && y < this.y + textSize(this.word)/2 + radius;

        if (xIntersect && yIntersect) {
            return true;
        }
    }
}
