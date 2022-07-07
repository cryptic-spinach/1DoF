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

class Segment {
    constructor (point_1, point_2, label = "") {
        this.point_1 = point_1;
        this.point_2 = point_2;
    }

    getSlopeVec() {
        return createVector(this.point_2.x - this.point_1.x, this.point_2.y - this.point_1.y);
    }

    showAsVector(color = palette.segmentFill) {
        let slopeVec = this.getSlopeVec();
        this.showVec(this.point_1, slopeVec, color, true);
    }
    
    showAsSegment(color = palette.segmentFill) {
        let slopeVec = this.getSlopeVec();
        this.showVec(this.point_1, slopeVec, color, false);
    }

    showAsAxis(color = palette.segmentFill) {
        let slopeVec = this.getSlopeVec();
        this.showVec(this.point_1, slopeVec, color, true);
        this.showVec(this.point_2, slopeVec.mult(-1), color, true);
    }

    showVec(base, vec, color, showArrowTip) {
        push();
        stroke(color);
        strokeWeight(3);
        fill(color);
        translate(base.x, base.y);
        line(0, 0, vec.x, vec.y);
        if(showArrowTip) {
            rotate(vec.heading());
            translate(vec.mag() - styles.segmentArrowSize, 0);
            triangle(0, styles.segmentArrowSize / 2, 0, -styles.segmentArrowSize / 2, styles.segmentArrowSize, 0);
        }
        pop();
    }
}