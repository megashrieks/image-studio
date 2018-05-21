/*global constants*/
var can = document.getElementById("can");
var ctx = can.getContext("2d");
var start = {};
var size = {};
var offset = 0  ;


/*functional unit*/

function resize() {
    can.width = window.innerWidth;
    can.height = window.innerHeight;
}

function blur(imgcontext) {
    var data = imgcontext.data;
    var convolutionMatrix = [
        [-1, -1, -1],
        [-1, 8, -1],
        [-1, -1,-1]
    ];
    
    var convolutionMatrix = [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
    ];
    
    var convolutionMatrix = generateGaussian({
        x: 13,
        y: 13
    }, 200000000000000000000);
    applyConvolution(data, convolutionMatrix);
    imgcontext.data = data;
    // edgedetect(imgcontext)
    ctx.putImageData(imgcontext, start.x,start.y);
}
function edgedetect(imgcontext) {
    var data = imgcontext.data;
    var convolutionMatrix = [
        [-1,-1,-1],
        [-1, 8, -1],
        [-1,-1, -1]
    ];
    applyConvolution(data, convolutionMatrix);
    imgcontext.data = data;
    ctx.putImageData(imgcontext, start.x+offset,start.y+offset);
}

function applyConvolution(data, convolution) {
    var r = resolveColor(data, 0);
    var g = resolveColor(data, 1);
    var b = resolveColor(data, 2);
    var a = resolveColor(data, 3);
    convolutionToColor(r, convolution);
    convolutionToColor(g, convolution);
    convolutionToColor(b, convolution);
    combineColor(data, r, 0);
    combineColor(data, g, 1);
    combineColor(data, b, 2);
}

function resolveColor(data, offset) {
    var arr = [];
    for (var i = 0; i < size.x; ++i){
        arr.push([]);
        for (var j = 0; j < size.x; ++j){
            arr[i].push(0);
        }
    }
    for (var i = 0; i < data.length; i += 4){
        var x = (i / 4) % size.x;
        var y = ~~((i / 4) / size.x);
        arr[x][y] = data[i+offset];
    }
    return arr;
}
function convolutionToColor(arr, convolution) {
    var len = convolution.length;
    var convolutionSum = 0;
    for (var i = 0; i < len; ++i){
        for (var j = 0; j < len; ++j){
            convolutionSum += convolution[i][j];
        }
    }
    var arr2 = [];
    for (var i = 0; i < size.x; ++i){
        arr2.push([]);
        for (var j = 0; j < size.x; ++j){
            arr2[i].push(0);
        }
    }
    convolutionSum = convolutionSum <= 0 ? 1 : convolutionSum;
    for (var i = ~~(len / 2)+!(len&1); i < arr.length - ~~(len/2); ++i){
        for (var j = ~~(len / 2)+!(len & 1); j < arr[i].length - ~~(len / 2); ++j) {
            var sum = 0;
            for (var p = i - ~~(len / 2); p <= i + ~~(len / 2) - !(len & 1); ++p){
                for (var q = j - ~~(len / 2); q <= j + ~~(len / 2) - !(len & 1); ++q) {
                    sum += arr[p][q] * convolution[p + ~~(len / 2) - i][q + ~~(len / 2) - j];
                }
            }
            arr2[i][j] =  Math.min(Math.abs(sum / convolutionSum),255);
        }
    }
    for (var i = 0; i < size.x; ++i){
        for (var j = 0; j < size.x; ++j){
            arr[i][j] = arr2[i][j];
        }
    }
}
function combineColor(arr, grid, offset) {
    for (var i = 0; i < grid.length; ++i){
        for (var j = 0; j < grid[i].length; ++j){
            var index = i * 4 + j * 4 * size.x + offset;
            arr[index] = grid[i][j];
        }
    }
}
/*calling*/

window.onresize = resize;
resize();
loadImage(ctx, blur); 