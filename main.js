var el = document.getElementById('canvas');
var ctx = el.getContext('2d');
ctx.lineJoin = ctx.lineCap = 'round';

var isDrawing, lastPoint;

initCanvas();

function initCanvas(){
  canvas.style.width='100%';
  canvas.style.height='100%';
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

$("body").mousedown(function(e) {
  isDrawing = true;
  lastPoint = { x: e.clientX - $("canvas").offset().left, y: e.clientY - $("canvas").offset().top };
});

$("body").mousemove(function(e) {
  if (!isDrawing) return;

  var currentPoint = { x: e.clientX - $("canvas").offset().left, y: e.clientY - $("canvas").offset().top };
  var dist = distanceBetween(lastPoint, currentPoint);
  var angle = angleBetween(lastPoint, currentPoint);

  for (var i = 0; i < dist; i+=5) {

    x = lastPoint.x + (Math.sin(angle) * i);
    y = lastPoint.y + (Math.cos(angle) * i);

    var radgrad = ctx.createRadialGradient(x,y,10,x,y,20);
    var color = hexToRgb($("#color_button").val());

    radgrad.addColorStop(0, $("#color_button").val());
    radgrad.addColorStop(0.5, 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',0.5)');
    radgrad.addColorStop(1, 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',0)');

    ctx.fillStyle = radgrad;
    ctx.fillRect(x-20, y-20, 40, 40);
  }

  lastPoint = currentPoint;
});

function hexToRgb(hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function distanceBetween(point1, point2) {
  return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}
function angleBetween(point1, point2) {
  return Math.atan2( point2.x - point1.x, point2.y - point1.y );
}

$("body").mouseup(function() {
  isDrawing = false;
});

$('#clear_button').click(function(){
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
});
