function generateGaussian(dimension,sigma) {
    var y_len = dimension.y;
    var x_len = dimension.x;
    var matrix = [];
    var precalc = (1 / (2 * Math.PI * sigma * sigma));
    for (var i = 0; i < x_len; ++i){
        matrix.push([]);
        for (var j = 0; j < y_len; ++j){
            var value = precalc * Math.pow(Math.E, -(i * i + j * j) / (2 * sigma * sigma));
            matrix[i].push(value);
        }
    }
    return matrix;
}