String name = "Nathan Graule - Ubuntu 16.10";

int array_size = 64;
Dot[] dots = new Dot[array_size];
PFont fontclock, fontname;
float gravity = -0.5;

public class Dot {
    float x, y;
    float speed_x, speed_y;
    color c;

    public Dot(float x, float y) {
        this.x=x;
        this.y=y;
        this.speed_x=random(-25, 25);
        this.speed_y=random(-25, 25);
        this.c = color(random(127, 255), random(127, 255), random(127, 255));
    }

    public void setSpeed(float sx, float sy)
    {
        this.speed_x = sx;
        this.speed_y = sy;
    }

    public void setColor(color c)
    {
        this.c = c;
    }

    public void move(float delta)
    {
        // Gravity
        //speed_y += 90*delta;
        delta /= 1000;
        x += delta*speed_x;
        if(x<0 || x>width)
        {
            speed_x *= -1;
            x<0? x=0 : x=width;
        }
        
        y += delta*speed_y;
        if(y<0 || y>height) 
        {
            speed_y *= -1;
            y<0? y=0 : y=height;
        }
    }

    public void draw()
    {
        noStroke();
        // dot
        fill(c);
        ellipse(x, y, 2, 2);
        // big circle
        fill(c, 64);
        ellipse(x, y, 32, 32);
    }
}

float last_time = 0;
void setup() {
    fontclock = createFont("Roboto Thin", 96, true);
    fontname  = createFont("Roboto Slab Light", 24, true);
    //size(1366, 768);
    //fullScreen(SPAN);
    size(1280, 720);
    for(int i=0; i<array_size; i++)
    {
        dots[i] = new Dot(random(width), random(height));
        //dots[i].setSpeed(0,0);
    }
    
}

void draw() {
    background(0);
    for(int i=0; i<array_size; i++)
    {
        dots[i].move((millis()-last_time)); // Real time
        //dots[i].move(16); // 60 Hz refresh rate
        dots[i].draw();
        noFill();
        for(int j=0; j<array_size; j++)
        {
            if (i==j) continue;
            float x = dots[i].x-dots[j].x;
            float y = dots[i].y-dots[j].y;

            float dist_sqr = x*x+y*y;
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
    }
    fill(200);

    textFont(fontclock);
    text(hour()+":"+nf(minute(), 2)+":"+nf(second(), 2), 50, 100);

    textFont(fontname);
    text(name, 53, 135);
    //fill(255);
    //text("Freq: "+round(1.0/((millis()-last_time)/1000))+ " Hz", 10, 10);
    last_time=millis();
}
