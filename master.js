let WIDTH,
    HEIGHT,
    c = 20;

const BG_COLOR = "black",
    LINE_COLOR = "white",
    RES = 200,
    VEL = 0.5, // curve's speed in steps added per frame
    PADDING_Y = 20,
    canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");

const requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

function init() {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    canvas.setAttribute("width", WIDTH);
    canvas.setAttribute("height", HEIGHT);

    ctx.fillStyle = BG_COLOR;
    ctx.strokeStyle = LINE_COLOR;

    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.beginPath();
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.closePath();

    ani();
}

function ani() {
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    const step = WIDTH / RES;
    // Draw the line
    ctx.beginPath();
    // Set initial points for line start
    let canvasX = 0;
    let translatedX = (((c % RES) * step) / WIDTH) * Math.PI * 2;
    let y = Math.sin(translatedX);
    ctx.moveTo(0, scale(y, -1, 1, HEIGHT - PADDING_Y, PADDING_Y));
    ctx.lineTo(
        scale(canvasX, 0, Math.PI * 2, 0, WIDTH),
        scale(y, -1, 1, HEIGHT - PADDING_Y, PADDING_Y)
    );
    for (let i = 1; i < RES; i++) {
        canvasX = ((i * step) / WIDTH) * Math.PI * 2;
        translatedX = ((((i + c) % RES) * step) / WIDTH) * Math.PI * 2;
        y = Math.sin(translatedX);
        ctx.lineTo(
            scale(canvasX, 0, Math.PI * 2, 0, WIDTH),
            scale(y, -1, 1, HEIGHT - PADDING_Y, PADDING_Y)
        );
    }
    ctx.stroke();
    ctx.closePath();
    c += VEL;
    requestAnimationFrame(ani);
}

init();
