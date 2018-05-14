var img = "../media/t.jpg";
function loadImage(ctx, callback) {
    size = {
        x: can.width,
        y: can.height
    };
    start = {
        x: 0,
        y: 0
    }
    var i = new Image();
    i.src = img;
    i.onload = () => {
        ctx.drawImage(i, start.x, start.y, size.x, size.y);
        var p = ctx.getImageData(start.x, start.y, size.x, size.y);
        ctx.clearRect(start.x, start.y, size.x, size.y);
        callback(p);
    }
}