class Circle {

    constructor(x, y, r) {

        this.x = x;
        this.y = y;
        this.r = r;
    }

    display() {
        fill("red");
        ellipse(this.x, this.y, this.r);
    }
}
