import { palette, styles } from "./configs.js";

export class Point {
    constructor (x, y, label = "") {
        this.x = x;
        this.y = y;
        this.label = label
    }

    show(p5) {
        p5.push();
        p5.fill(palette.pointFill);
        p5.stroke(palette.pointStroke);
        p5.strokeWeight(styles.pointStrokeWeight);
        p5.ellipse(this.x, this.y, styles.pointRadius, styles.pointRadius);
        p5.pop();
    }

    showLabel(p5, myColor = palette.labelFill) {
        p5.push();
        
        p5.translate(this.x, this.y)
        p5.scale(1, -1);

        p5.noStroke();
        p5.fill(myColor);
        p5.textSize(styles.labelTextSize);
        p5.text(this.label, styles.labelOffsetX, styles.labelOffsetY)

        p5.pop();
    }
}

export class Segment {
    constructor (point_1, point_2, label = "") {
        this.point_1 = point_1;
        this.point_2 = point_2;
    }

    getSlopeVec(p5) {
        return p5.createVector(this.point_2.x - this.point_1.x, this.point_2.y - this.point_1.y);
    }

    getNumericSlope(p5, theta) {
        let slopeVec = this.getSlopeVec(p5);
        slopeVec.rotate(theta);
        if (slopeVec.x == 0) {
            return;
        }
        else {
            return slopeVec.y/slopeVec.x;
        }
        
    }

    showAsVector(p5, myColor = palette.segmentFill, myWeight = styles.segmentWeight) {
        let slopeVec = this.getSlopeVec(p5);
        this.showVec(p5, this.point_1, slopeVec, myColor, myWeight, true);
    }
    
    showAsSegment(p5, myColor = palette.segmentFill, myWeight = styles.segmentWeight) {
        let slopeVec = this.getSlopeVec(p5);
        this.showVec(p5, this.point_1, slopeVec, myColor, myWeight, false);
    }

    showAsAxis(p5, myColor = palette.segmentFill, myWeight = styles.segmentWeight) {
        let slopeVec = this.getSlopeVec(p5);
        this.showVec(p5, this.point_1, slopeVec, myColor, myWeight, true);
        this.showVec(p5, this.point_2, slopeVec.mult(-1), myColor, myWeight, true);
    }

    showVec(p5, base, vec, myColor, myWeight, showArrowTip) {
        p5.push();
        p5.stroke(myColor);
        p5.strokeWeight(myWeight);
        p5.fill(myColor);
        p5.translate(base.x, base.y);
        p5.line(0, 0, vec.x, vec.y);
        if(showArrowTip) {
            p5.rotate(vec.heading());
            p5.translate(vec.mag() - styles.segmentArrowSize, 0);
            p5.triangle(0, styles.segmentArrowSize / 2, 0, -styles.segmentArrowSize / 2, styles.segmentArrowSize, 0);
        }
        p5.pop();
    }

    showAsRotatedSegment(p5, theta, rotateAboutPoint) {
        p5.push();
        p5.angleMode(p5.RADIANS)
        p5.translate(rotateAboutPoint.x, rotateAboutPoint.y);
        p5.rotate(theta);
        this.showAsSegment(p5, "#ffffff", 1);
        p5.pop();
    }
}

export class Axes {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    show(p5) {
        let xAxisStart = new Point(-this.w/2 + this.x, 0 + this.y);
        let xAxisEnd = new Point(this.w/2 + this.x, 0 + this.y);
        let xAxis = new Segment(xAxisStart, xAxisEnd);

        let yAxisStart = new Point(0 + this.x, -this.h/2 + this.y);
        let yAxisEnd = new Point(0 + this.x, this.h/2 + this.y);
        let yAxis = new Segment(yAxisStart, yAxisEnd);
            
        xAxis.showAsAxis(p5);
        yAxis.showAsAxis(p5);
    }
}