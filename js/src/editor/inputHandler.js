var inputHandler = function(jQuery){

    "use strict"
    /*jslint nomen: true, browser: true, vars: true */

    var $ = jQuery;

    var workArea = $('#editor');
    var transform = new Transform(workArea);
    var shiftDown = false;

    var init = function() {
        workArea.mouseup(onMouseUp);
        workArea.mousemove(onMouseMove);
        $(document).keydown(onKeyDown);
        $(document).keyup(onKeyUp);
    }

    var destroy = function() {
        workArea.unbind("mouseup", onMouseUp);
        workArea.unbind("mousemove", onMouseMove);
    }

    var onMouseUp = function(evt) {
        transform.click(evt.target, evt.clientX, evt.clientY, evt.shiftKey);
    }

    var onMouseMove = function(evt) {
        transform.move(evt.target, evt.clientX, evt.clientY);
    }
    
    var onKeyDown = function(evt) {
        if (evt.keyCode === 16 /* shift */) {
            console.log('shiftdown');
            this.shiftDown = true;
        }
    }
    
    var onKeyUp = function(evt) {
        if (evt.keyCode === 16 /* shift */) {
            console.log('shiftup');
            this.shiftDown = false;
        }
    }
    
    init();



};