var Transform  = function(workArea){
    this.target = {iniX:0, iniY:0, el:null, currX:0, currY:0};
    this.workArea = workArea;
    this.workAreaEl = workArea[0];
    this.group = [];
};

Transform.prototype.click = function(el, mouseX, mouseY, selectMode) {
        console.log(selectMode);
    if (selectMode) {
        this.addToGroup(el);
        return;
    }
    
    this.group = [];
    
    if (this.target.el == null && el != this.workAreaEl) {
        this.pickup(el, mouseX, mouseY);
    }
    else {
        this.release(el);
    }
    
}

Transform.prototype.addToGroup = function(el) {
    this.group.push(el);
    el.style.fill="rgba(124,240,10,0.5)";
}

Transform.prototype.pickup = function(el, mouseX, mouseY) {
    this.target.el = el;

    // moves the element to the top
    //this.target.el.parentNode.appendChild(this.target.el);

    var trueCoords = this.getTrueCoords(el, mouseX, mouseY);
    var transMatrix = this.target.el.getCTM();
    this.target.iniX = trueCoords.x - Number(transMatrix.e);
    this.target.iniY = trueCoords.y - Number(transMatrix.f);

    // removes pointer for text elements
    this.target.el.setAttributeNS(null, 'pointer-events', 'none');   
}

Transform.prototype.release = function(el) {

    if (!this.target.el) return;

    // turn the pointer-events back on, so we can grab this item later
    this.target.el.setAttributeNS(null, 'pointer-events', 'all');
    this.target.el = null;
    this.target.iniX = 0;
    this.target.iniY = 0;
    this.target.currX = 0;
    this.target.currY = 0;
}

Transform.prototype.move = function(el, mouseX, mouseY) {
    if (!this.target.el) this.mouseOverItem(el, mouseX, mouseY);
    else this.moveItem(el, mouseX, mouseY);
}

Transform.prototype.mouseOverItem = function(mouseX, mouseY) {
    var nodeList = this.workAreaEl.getIntersectionList({x: mouseX, y: mouseY, width: 1, height: 1}, null);
    console.log(nodeList);
}

Transform.prototype.moveItem = function(el, mouseX, mouseY) {
    var trueCoords = this.getTrueCoords(el, mouseX, mouseY);

    this.target.currX = trueCoords.x - this.target.iniX;
    this.target.currY = trueCoords.y - this.target.iniY;
    this.target.el.setAttributeNS(null, 'transform', 'translate(' + this.target.currX + ',' + this.target.currY + ')');
}

Transform.prototype.getTrueCoords = function(el, mouseX, mouseY) {
    // find the current zoom level and pan setting, and adjust the reported
    //    mouse position accordingly
    var newScale = this.workAreaEl.currentScale;
    var translation = this.workAreaEl.currentTranslate;
    var coords = {};
    coords.x = (mouseX - translation.x)/newScale;
    coords.y = (mouseY - translation.y)/newScale;
    return coords;
}
