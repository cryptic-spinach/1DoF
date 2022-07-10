function windowResized() {
    resizeCanvas(windowWidth - canvasConfig.trimX, windowHeight - canvasConfig.trimY);
    slider.position((windowWidth - canvasConfig.trimX)/2 + sliderOffset.x, (windowHeight - canvasConfig.trimY)/2 + sliderOffset.y);
}

