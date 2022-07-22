import { palette, styles, projectionVecPalette, projectionVecStyles, axisConfig, axisPalette, squaresConfig} from "./configs.js";
import { showValues } from "./helpers.js";

export class Point {
    constructor (x, y, label = "") {
        this.x = x;
        this.y = y;
        this.label = label
    }

    show(myp5) {
        let colorWithOpacity = myp5.color(palette.pointStroke);
        colorWithOpacity.setAlpha(styles.pointOpacity);

        myp5.push();
        myp5.fill(palette.pointFill);
        myp5.stroke(colorWithOpacity);
        myp5.strokeWeight(styles.pointStrokeWeight);
        myp5.ellipse(this.x, this.y, styles.pointRadius, styles.pointRadius);
        myp5.pop();
    }

    showLabel(myp5, myColor = palette.labelFill, myOpacity = styles.labelOpacity, xOffset = styles.labelOffsetX, yOffset = styles.labelOffsetY) {
        let colorWithOpacity = myp5.color(myColor);
        colorWithOpacity.setAlpha(myOpacity)

        myp5.push();
        
        myp5.translate(this.x, this.y)
        myp5.scale(1, -1);

        myp5.stroke(myColor);
        myp5.fill(colorWithOpacity);
        myp5.textSize(styles.labelTextSize);
        myp5.text(this.label, xOffset, yOffset)

        myp5.pop();
    }
}

export class Segment {
    constructor (point_1, point_2, label = "") {
        this.point_1 = point_1;
        this.point_2 = point_2;
    }

    getSlopeVec(myp5) {
        return myp5.createVector(this.point_2.x - this.point_1.x, this.point_2.y - this.point_1.y);
    }

    getProjection(myp5, u, v) {
        return v.copy().mult(u.copy().dot(v) / v.copy().dot(v));
    }


    // Displays perpendicular distance from line l to point m
    getPerpendicularDistance(myp5, m) {
        // Choose the origin along l.
        // Create a vector u with tip at m.
        let u = myp5.createVector(m.x - this.point_1.x, m.y - this.point_1.y); 

        // Create unit vector v pointing along l.
        let v = this.getSlopeVec(myp5).normalize();

        // Calculate the projection of u onto v. Call it w.
        let w = this.getProjection(myp5, u, v);
        
        // Draw a line connecting m and the tip of w.
        let perpDistStart = new Point(this.point_1.x + w.x, this.point_1.y + w.y);
        let perpDistEnd = new Point(this.point_1.x + u.x, this.point_1.y + u.y);
        let perpDist = new Segment(perpDistEnd, perpDistStart);
        return perpDist;
    }

    getVerticalDistance(myp5, m) {
        let perpDist = this.getPerpendicularDistance(myp5, m).getSlopeVec(myp5);
        let vertDist;

        if (perpDist.y > 0) {
            vertDist = perpDist.copy().setHeading(myp5.PI/2);
        }
        else {
            vertDist = perpDist.copy().setHeading(-myp5.PI/2);
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

    showAsVector(myp5, myColor = palette.segmentFill, myWeight = styles.segmentWeight, myOpacity = styles.segmentOpacity) {
        let slopeVec = this.getSlopeVec(myp5);
        this.showVec(myp5, this.point_1, slopeVec, myColor, myWeight, myOpacity, true);
    }
    
    showAsSegment(myp5, myColor = palette.segmentFill, myWeight = styles.segmentWeight, myOpacity = styles.segmentOpacity) {
        let slopeVec = this.getSlopeVec(myp5);
        this.showVec(myp5, this.point_1, slopeVec, myColor, myWeight, myOpacity, false);
    }

    showAsAxis(myp5, myColor = palette.segmentFill, myWeight = styles.segmentWeight, myOpacity = axisConfig.axisOpacity) {
        let slopeVec = this.getSlopeVec(myp5);
        this.showVec(myp5, this.point_1, slopeVec, myColor, myWeight, myOpacity, true);
        this.showVec(myp5, this.point_2, slopeVec.mult(-1), myColor, myWeight, myOpacity, true);
    }

    showVec(myp5, base, vec, myColor, myWeight, myOpacity, showArrowTip) {
        let colorWithOpacity = myp5.color(myColor);
        colorWithOpacity.setAlpha(myOpacity)
        myp5.push();
        myp5.stroke(colorWithOpacity);
        myp5.strokeWeight(myWeight);
        myp5.fill(colorWithOpacity);
        myp5.translate(base.x, base.y);
        myp5.line(0, 0, vec.x, vec.y);
        if(showArrowTip) {
            myp5.rotate(vec.heading());
            myp5.translate(vec.mag() - styles.segmentArrowSize, 0);
            myp5.triangle(0, styles.segmentArrowSize / 2, 0, -styles.segmentArrowSize / 2, styles.segmentArrowSize, 0);
        }
        myp5.pop();
    }

    showPerpendicularDistance(myp5, m) {
        this.getPerpendicularDistance(myp5, m).showAsSegment(myp5, projectionVecPalette.distFill, projectionVecStyles.weight, projectionVecStyles.opacity);
    }

    showVerticalDistance(myp5, m) {
        let vertDist = this.getVerticalDistance(myp5, m);
        if (vertDist != null) {
            this.showVec(myp5, m, vertDist, projectionVecPalette.distFill, projectionVecStyles.weight, projectionVecStyles.opacity, false);
        }
    }

    showSquaredError(myp5, m) {
        let vertDist = this.getVerticalDistance(myp5, m);
        let myColor = myp5.color(squaresConfig.fill);
        myColor.setAlpha(squaresConfig.opacity);
        if (vertDist != null) {
            myp5.push();
            myp5.noStroke();
            myp5.fill(myColor);
            myp5.rect(m.x, m.y, vertDist.y, vertDist.y);
            myp5.pop();
        }
    }


    rotateSegment(myp5, theta, rotateAboutPoint) {
        let vec1 = myp5.createVector(this.point_1.x - rotateAboutPoint.x, this.point_1.y - rotateAboutPoint.y)
        let transVec1 = vec1.copy().rotate(theta);

        let vec2 = myp5.createVector(this.point_2.x - rotateAboutPoint.x, this.point_2.y - rotateAboutPoint.y)
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

    show(myp5) {
        let xAxisStart = new Point(-this.w/2 + this.x, 0 + this.y);
        let xAxisEnd = new Point(this.w/2 + this.x, 0 + this.y, this.xLabel);
        let xAxis = new Segment(xAxisStart, xAxisEnd);

        let yAxisStart = new Point(0 + this.x, -this.h/2 + this.y);
        let yAxisEnd = new Point(0 + this.x, this.h/2 + this.y, this.yLabel);
        let yAxis = new Segment(yAxisStart, yAxisEnd);
            
        xAxis.showAsAxis(myp5);
        yAxis.showAsAxis(myp5);

        xAxisEnd.showLabel(myp5, axisPalette.fill, styles.labelOpacity, axisConfig.horizontalLabelXOffset, axisConfig.horizontalLabelYOffset);
        yAxisEnd.showLabel(myp5, axisPalette.fill, styles.labelOpacity, axisConfig.verticalLabelXOffset, axisConfig.verticalLabelYOffset);
    }
}

export class PointCloud {
    constructor(points, xOffset, yOffset) {
        this.points = points;
        this.xOffset = xOffset;
        this.yOffset = yOffset;
    }

    getCurve(myp5) {
        myp5.noFill()
        myp5.stroke(255);
      
        myp5.beginShape();
        for (let v of this.points) {
          myp5.vertex(v.x + this.xOffset, v.y + this.yOffset);
        }
        myp5.endShape();
    }
}