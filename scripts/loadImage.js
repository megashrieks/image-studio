var img = "../media/t.jpg";
function loadImage(ctx, callback) {
    size = {
        x: 1300,
        y: 650
    };
    start = {
        x: can.width / 2 - size.x / 2,
        y: can.height / 2 - size.y / 2
    }
    var i = new Image();
    i.src = img;
    i.onload = () => {
        ctx.drawImage(i, start.x, start.y, size.x, size.y);
        var p = ctx.getImageData(start.x+offset, start.y+offset, size.x, size.y);
        // ctx.clearRect(start.x, start.y, size.x, size.y);
        callback(p);
    }
}