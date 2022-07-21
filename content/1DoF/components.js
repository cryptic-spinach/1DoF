import { palette, styles, projectionVecPalette, projectionVecStyles, axisConfig, axisPalette, squaresConfig} from "./configs.js";
import { showValues } from "./helpers.js";

export class Point {
    constructor (x, y, label = "") {
        this.x = x;
        this.y = y;
        this.label = label
    }

    show(p5) {
        let colorWithOpacity = p5.color(palette.pointStroke);
        colorWithOpacity.setAlpha(styles.pointOpacity);

        p5.push();
        p5.fill(palette.pointFill);
        p5.stroke(colorWithOpacity);
        p5.strokeWeight(styles.pointStrokeWeight);
        p5.ellipse(this.x, this.y, styles.pointRadius, styles.pointRadius);
        p5.pop();
    }

    showLabel(p5, myColor = palette.labelFill, myOpacity = styles.labelOpacity, xOffset = styles.labelOffsetX, yOffset = styles.labelOffsetY) {
        let colorWithOpacity = p5.color(myColor);
        colorWithOpacity.setAlpha(myOpacity)

        p5.push();
        
        p5.translate(this.x, this.y)
        p5.scale(1, -1);

        p5.stroke(myColor);
        p5.fill(colorWithOpacity);
        p5.textSize(styles.labelTextSize);
        p5.text(this.label, xOffset, yOffset)

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

    getProjection(p5, u, v) {
        return v.copy().mult(u.copy().dot(v) / v.copy().dot(v));
    }


    // Displays perpendicular distance from line l to point m
    getPerpendicularDistance(p5, m) {
        // Choose the origin along l.
        // Create a vector u with tip at m.
        let u = p5.createVector(m.x - this.point_1.x, m.y - this.point_1.y); 

        // Create unit vector v pointing along l.
        let v = this.getSlopeVec(p5).normalize();

        // Calculate the projection of u onto v. Call it w.
        let w = this.getProjection(p5, u, v);
        
        // Draw a line connecting m and the tip of w.
        let perpDistStart = new Point(this.point_1.x + w.x, this.point_1.y + w.y);
        let perpDistEnd = new Point(this.point_1.x + u.x, this.point_1.y + u.y);
        let perpDist = new Segment(perpDistEnd, perpDistStart);
        return perpDist;
    }

    getVerticalDistance(p5, m) {
        let perpDist = this.getPerpendicularDistance(p5, m).getSlopeVec(p5);
        let vertDist;

        if (perpDist.y > 0) {
            vertDist = perpDist.copy().setHeading(p5.PI/2);
        }
        else {
            vertDist = perpDist.copy().setHeading(-p5.PI/2);
        }

        let angle = perpDist.angleBetween(vertDist)

        if (Math.cos(angle) != 0) {
            vertDist.setMag(perpDist.mag() / Math.cos(angle));
            return vertDist;
        }
        else {
            return;
        }
    }

    showAsVector(p5, myColor = palette.segmentFill, myWeight = styles.segmentWeight, myOpacity = styles.segmentOpacity) {
        let slopeVec = this.getSlopeVec(p5);
        this.showVec(p5, this.point_1, slopeVec, myColor, myWeight, myOpacity, true);
    }
    
    showAsSegment(p5, myColor = palette.segmentFill, myWeight = styles.segmentWeight, myOpacity = styles.segmentOpacity) {
        let slopeVec = this.getSlopeVec(p5);
        this.showVec(p5, this.point_1, slopeVec, myColor, myWeight, myOpacity, false);
    }

    showAsAxis(p5, myColor = palette.segmentFill, myWeight = styles.segmentWeight, myOpacity = axisConfig.axisOpacity) {
        let slopeVec = this.getSlopeVec(p5);
        this.showVec(p5, this.point_1, slopeVec, myColor, myWeight, myOpacity, true);
        this.showVec(p5, this.point_2, slopeVec.mult(-1), myColor, myWeight, myOpacity, true);
    }

    showVec(p5, base, vec, myColor, myWeight, myOpacity, showArrowTip) {
        let colorWithOpacity = p5.color(myColor);
        colorWithOpacity.setAlpha(myOpacity)
        p5.push();
        p5.stroke(colorWithOpacity);
        p5.strokeWeight(myWeight);
        p5.fill(colorWithOpacity);
        p5.translate(base.x, base.y);
        p5.line(0, 0, vec.x, vec.y);
        if(showArrowTip) {
            p5.rotate(vec.heading());
            p5.translate(vec.mag() - styles.segmentArrowSize, 0);
            p5.triangle(0, styles.segmentArrowSize / 2, 0, -styles.segmentArrowSize / 2, styles.segmentArrowSize, 0);
        }
        p5.pop();
    }

    showPerpendicularDistance(p5, m) {
        this.getPerpendicularDistance(p5, m).showAsVector(p5, projectionVecPalette.distFill, projectionVecStyles.weight, projectionVecStyles.opacity);
    }

    showVerticalDistance(p5, m) {
        let vertDist = this.getVerticalDistance(p5, m);
        if (vertDist != null) {
            this.showVec(p5, m, vertDist, projectionVecPalette.distFill, projectionVecStyles.weight, projectionVecStyles.opacity, projectionVecStyles.opacity, false);
        }
    }

    showSquaredError(p5, m) {
        let vertDist = this.getVerticalDistance(p5, m);
        let myColor = p5.color(squaresConfig.fill);
        myColor.setAlpha(squaresConfig.opacity);
        if (vertDist != null) {
            p5.push();
            p5.noStroke();
            p5.fill(myColor);
            p5.rect(m.x, m.y, vertDist.y, vertDist.y);
            p5.pop();
        }
    }


    rotateSegment(p5, theta, rotateAboutPoint) {
        let vec1 = p5.createVector(this.point_1.x - rotateAboutPoint.x, this.point_1.y - rotateAboutPoint.y)
        let transVec1 = vec1.copy().rotate(theta);

        let vec2 = p5.createVector(this.point_2.x - rotateAboutPoint.x, this.point_2.y - rotateAboutPoint.y)
        let transVec2 = vec2.copy().rotate(theta);

        this.updatePoint1(transVec1, rotateAboutPoint);
        this.updatePoint2(transVec2, rotateAboutPoint);
    }

    updatePoint1(vec, point) {
        this.point_1.x = vec.x + point.x;
        this.point_1.y = vec.y + point.y;
    }

    updatePoint2(vec, point) {
        this.point_2.x = vec.x + point.x;
        this.point_2.y = vec.y + point.y;
    }
}

export class Axes {
    constructor(x, y, w, h, xLabel = "", yLabel = "") {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.xLabel = xLabel;
        this.yLabel = yLabel;
    }

    show(p5) {
        let xAxisStart = new Point(-this.w/2 + this.x, 0 + this.y);
        let xAxisEnd = new Point(this.w/2 + this.x, 0 + this.y, this.xLabel);
        let xAxis = new Segment(xAxisStart, xAxisEnd);

        let yAxisStart = new Point(0 + this.x, -this.h/2 + this.y);
        let yAxisEnd = new Point(0 + this.x, this.h/2 + this.y, this.yLabel);
        let yAxis = new Segment(yAxisStart, yAxisEnd);
            
        xAxis.showAsAxis(p5);
        yAxis.showAsAxis(p5);

        xAxisEnd.showLabel(p5, axisPalette.fill, styles.labelOpacity, axisConfig.horizontalLabelXOffset, axisConfig.horizontalLabelYOffset);
        yAxisEnd.showLabel(p5, axisPalette.fill, styles.labelOpacity, axisConfig.verticalLabelXOffset, axisConfig.verticalLabelYOffset);
    }
}