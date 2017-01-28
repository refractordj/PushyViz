var audio;
var amp, fft;
var tempo, phase_shift;
var title, author;

function drawVolEllipse(x, y, size, opacity)
{
    var vol = size*sqrt(amp.getLevel());
    fft.analyze();
    var r = fft.getEnergy(20,200);
    var g = fft.getEnergy(200,2000);
    var b = fft.getEnergy(2000,20000);

    noStroke();
    fill(r,g,b, opacity);
    ellipse(x,y,vol,vol);
}

function drawTempo(x, y, size)
{
    var secs = audio.currentTime();
    var beat = (tempo*secs)/60 + phase_shift;
    beat -= floor(beat);
    

    var circ_size = .25*size+.75*size*beat;
    var opacity = 255*(1-beat*beat);

    stroke(20);
    fill(200, opacity);
    
    ellipse(x,y,circ_size,circ_size);
}

function drawText(x,y)
{
    noStroke();
    fill(255);
    
    textSize(72);
    textAlign(LEFT);
    text(title, x, y);
    textSize(50);
    text(author, x, y+60);
}

function preload()
{
    audio = loadSound("audio/halley.mp3");
    tempo = 140;
    phase_shift = 0.1;

    title = "Halley (Original Mix)";
    author= "Refractor & Garmeid";
}
function setup() {
    createCanvas(1280, 720);
    bg_setup();

    amp = new p5.Amplitude(0.8);
    audio.connect(amp);
    fft = new p5.FFT();
    
    audio.loop();
}

function draw() {
    background(0);
    bg_draw();

    //drawVolEllipse(75, 50, 75);
    drawTempo(75, 50, 100);
    
    drawText(130, 80);
}