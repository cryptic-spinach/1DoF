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

class Axes {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    show() {
        let xAxisStart = new Point(-this.w/2 + this.x, 0 + this.y);
        let xAxisEnd = new Point(this.w/2 + this.x, 0 + this.y);
        let xAxis = new Segment(xAxisStart, xAxisEnd);

        let yAxisStart = new Point(0 + this.x, -this.h/2 + this.y);
        let yAxisEnd = new Point(0 + this.x, this.h/2 + this.y);
        let yAxis = new Segment(yAxisStart, yAxisEnd);
            
        xAxis.showAsAxis();
        yAxis.showAsAxis();
    }
}