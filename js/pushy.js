new p5();

var array_size = 64;
var gravity = -2;

class Dot {
    
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.speed_x = random(-25, 25);
        this.speed_y = random(-25, 25);
        this.col = color(random(127, 255), random(127, 255), random(127, 255));
        this.energyLevel = random(1,4);
        this.energy = function() {
            fft.analyze();
            return fft.getEnergy(2*pow(10, this.energyLevel-1), 2*pow(10, this.energyLevel));
        }
    }

    setSpeed(sx,sy) {
        this.speed_x = sx;
        this.speed_y = sy;
    }

    setColor(c) {
        this.col = c;
    }

    draw() {
        noStroke();

        // dot
        fill(this.col);
        ellipse(this.x,this.y, 4, 4);
        //drawVolEllipse(this.x, this.y, 64, 64);

        // Volume-based outer circle
        var vol = this.energy()/255;
        fill(this.col.levels[0], this.col.levels[1], this.col.levels[2], 64);
        ellipse(this.x, this.y, 64*sqrt(vol));

    }
}

dots = Array(array_size);

var last_time = 0;
function bg_setup() {
    for(i=0;i<array_size;i++)
    {
        dots[i] = new Dot(random(width), random(height));
    }
}

function bg_draw() {
    for(i=0; i<array_size; i++)
    {
        // move
        strokeWeight(3);
        for(j=0; j<array_size; j++)
        {
            if (i==j) continue;
            var x = dots[i].x-dots[j].x;
            var y = dots[i].y-dots[j].y;

            var dist_sqr = x*x+y*y;
            if(dist_sqr < 128*128) {
                stroke(200, 256-(dist_sqr/64));
                line(dots[i].x, dots[i].y,
                     dots[j].x, dots[j].y);
                
                dots[i].speed_x += gravity*(128-x)/128;
                dots[i].speed_y += gravity*(128-y)/128;

                dots[j].speed_x -= gravity*(128-x)/128;
                dots[j].speed_y -= gravity*(128-y)/128;
            }
        }
        var dt = 0.016;
        var sx = dots[i].speed_x;
        var sy = dots[i].speed_y;

        var grav_factor = dots[i].energy()/255;

        dots[i].x += dt*sx*grav_factor;
        dots[i].y += dt*sy*grav_factor;
        if(dots[i].x<0) {
            dots[i].speed_x *= -1;
            dots[i].x=0;
        } 
        else if(dots[i].x>width) {
            dots[i].speed_x *= -1;
            dots[i].x = width;
        }

        if(dots[i].y<0) {
            dots[i].speed_y *= -1;
            dots[i].y = 0;
        }
        else if(dots[i].y>height) {
            dots[i].speed_y *= -1;
            dots[i].y = height;
        }

        strokeWeight(1);
        dots[i].draw();

        last_time = millis();
    }
}