class Point {
    constructor (x, y, label = "") {
        this.x = x;
        this.y = y;
        this.label = label
    }

    show() {
        push();
        fill(palette.pointFill);
        stroke(palette.pointStroke);
        strokeWeight(styles.pointStrokeWeight);
        ellipse(this.x, this.y, styles.pointRadius, styles.pointRadius);
        pop();
    }

    showLabel() {
        push();
        
        translate(this.x, this.y)
        scale(1, -1);

        noStroke();
        fill(palette.labelFill);
        textSize(styles.labelTextSize);
        text(this.label, styles.labelOffsetX, styles.labelOffsetY)

        pop();
    }


}