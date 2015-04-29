// If you miss comments, you... could add them?

function Point(x, y) {
    this.x = x;
    this.y = y;
    this.distance = function(other) {
        return Math.sqrt(Math.pow(this.x-other.x,2)+Math.pow(this.y-other.y,2))
    }
}

function Color(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.darken
        this.rgb = function() {
            return "rgb("+r+","+g+","+b+")";
        }
    this.darken = function(amount) {
        return new Color(r-amount,g-amount,b-amount);
    }
}

var BLUE = new Color(0,0,255);
var WHITE = new Color(255,255,255);

function Line(from, to, color) {
    this.from = from;
    this.to = to;
    this.color = color;
    this.isIntersecting = function(other) {
        var s = this.getIntersection(other);
        if (!s) return false;
        return this.couldContainPoint(s) && other.couldContainPoint(s);
    }

    this.couldContainPoint = function(s) {
        return (from.x-s.x)*(s.x-to.x) >= 0  &&  (from.y-s.y)*(s.y-to.y) >= 0;
    }

    this.getIntersection = function(other) {
        // TODO: parallel? equal?
        var a = (this.from.x-this.to.x)*(other.from.y-other.to.y)-(this.from.y-this.to.y)*(other.from.x-other.to.x);
        return new Point(
                ((this.from.x*this.to.y-this.from.y*this.to.x)*(other.from.x-other.to.x)-(this.from.x-this.to.x)*(other.from.x*other.to.y-other.from.y*other.to.x))/a,
                ((this.from.x*this.to.y-this.from.y*this.to.x)*(other.from.y-other.to.y)-(this.from.y-this.to.y)*(other.from.x*other.to.y-other.from.y*other.to.x))/a
                );
    }

    this.move = function(dx, dy) {
        this.from.x += dx;
        this.from.y += dy;
        this.to.x += dx;
        this.to.y += dy;
    }
}

var camera = new function() {
    this.pos = new Point(0,0);
    this.angle = 0;
    this.move = function(forward,sideward) {
        this.pos.x += Math.sin(this.angle)*forward;
        this.pos.y += Math.cos(this.angle)*forward;

        this.pos.x += Math.sin(this.angle+Math.PI/2.0)*sideward;
        this.pos.y += Math.cos(this.angle+Math.PI/2.0)*sideward;
    }
    this.rotate = function(amount) {
        this.angle += amount;
    }
}

function Entity() {
    this.lines = new Array();
    this.center = new Point(0,0);
    this.addLine = function(line) {
        this.lines.push(line);
        return line;
    }
    this.move = function(dx, dy) {
        for (var i=0; i<this.lines.length; i++) {
            this.lines[i].move(dx, dy);
        }
        this.center.x += dx;
        this.center.y += dy;
    }
    this.moveTo = function(x, y) {
        dx = x-this.center.x;
        dy = y-this.center.y;
        this.move(dx,dy);
    }
    this.collidesWith = function(other) {
        for (var i=0; i<this.lines.length; i++) {
            for (var j=0; j<other.lines.length; j++) {
                if (this.lines[i].isIntersecting(other.lines[j])) return true;
            }
        }
        return false;
    }
}

var renderer = new function() {
    this.canvas = document.getElementById("canvas");
    this.context = this.canvas.getContext("2d");
    this.WIDTH = 500;
    this.HEIGHT = 20;
    this.draw = function(world, camera) {
        this.context.clearRect(0, 0, this.WIDTH, this.HEIGHT);
        for (var x = 0; x<this.WIDTH; x++) {
            var fov = Math.PI/2.0; //4
            this.context.fillStyle = this.getColor(world, camera.pos, (camera.angle-fov/2)+x*(fov/(this.WIDTH-1)));
            this.context.beginPath();
            this.context.rect(x,0,x+1,this.HEIGHT);
            this.context.closePath();
            this.context.fill();
        }
    }
    this.getColor = function(world, pos, a) {
        var collisions = new Array();
        for (var n=0; n<world.lines.length; n++) {
            var line = world.lines[n];
            var l2 = new Line(new Point(pos.x, pos.y), new Point(pos.x+100*Math.sin(a),pos.y+100*Math.cos(a)));
            if (line.isIntersecting(l2)) {
                var s = line.getIntersection(l2);
                collisions.push({line:line,distance:pos.distance(s)});
            }
        }
        if(collisions.length>0) {
            collisions.sort(function(a,b) {
                return a.distance-b.distance;
            });
            var collision = collisions[0];
            var b = Math.atan2(collision.line.from.y-collision.line.to.y,collision.line.from.x-collision.line.to.x);
            c = ((b-a+Math.PI)%(Math.PI*2))-Math.PI;
            c = Math.abs(c);
            if (c>Math.PI/2.0) {
                c = Math.PI-c;
            }
            c = Math.round(c*(255/(Math.PI)));
            //return collision.line.color.darken(c).darken(Math.round(collision.distance*20)).rgb();
            return collision.line.color.darken(Math.round(collision.distance*20)).rgb();
        } else {
            return "rgb(0,0,0)";
        }
    }
}

function goal(p1){
    if (p1) {
        points++;
        document.getElementById("p2-points").innerHTML = points;
        if (points == 11) {
            alert("You win!");
            points = 0;
            pointsEnemy = 0;
            document.getElementById("p2-points").innerHTML = points;
        }
    } else {
        pointsEnemy++;
        document.getElementById("p1-points").innerHTML = pointsEnemy;
        if (pointsEnemy == 11) {
            alert("You lose!");
            points = 0;
            pointsEnemy = 0;
            document.getElementById("p1-points").innerHTML = pointsEnemy;
        }
    }
    ball.moveTo(0,0);
    direction = Math.random()*2*Math.PI;
    ballMovement = new Point(0.05*Math.cos(direction), 0.05*Math.sin(direction));
}

var pressed={};

document.onkeydown = function(e){
    e = e || window.event;
    pressed[e.keyCode] = true;
}

document.onkeyup = function(e){
    e = e || window.event;
    delete pressed[e.keyCode];
}

function update() {
    if (pressed[37]) { // left
        if (camera.pos.x>-halfFieldWidth+0.1)
            camera.move(0,-0.1);
    }
    if (pressed[39]) { // right
        if (camera.pos.x<halfFieldWidth-0.1)
            camera.move(0,0.1);
    }
    /*
       if (pressed[38]) { // up
       camera.move(0.1,0);
       }
       if (pressed[40]) { // down
       camera.move(-0.1,0);
       }
       */
    ball.move(ballMovement.x, ballMovement.y);
    if (ball.collidesWith(walls))
        ballMovement.x = -ballMovement.x;

    if (ball.lines[0].from.distance(camera.pos) < 1 || ball.collidesWith(enemyPaddle)) {
        ballMovement.y = -ballMovement.y;
    }

    if (ball.lines[0].from.y > halfFieldLength+1)
        goal(true);
    if (ball.lines[0].from.y < -(halfFieldLength+1))
        goal(false);

    var diff = ball.center.x - enemyPaddle.center.x;
    var maxSpeed = 0.015;
    if (Math.abs(diff) > maxSpeed) {
        diff = diff/Math.abs(diff)*maxSpeed;
    }
    enemyPaddle.moveTo(enemyPaddle.center.x+diff,5);
}

function l(x1, y1, x2, y2, color) {
    return new Line(new Point(x1, y1), new Point(x2, y2), color);
}

var points = 0;
var pointsEnemy = 0;

var ballMovement = new Point(0.02,-0.02);

var world = new Entity();

camera.pos = new Point(0,-5);

var halfFieldWidth = 4;
var halfFieldLength = 5;

w1 = new Line(new Point(-halfFieldWidth,-halfFieldLength),new Point(-halfFieldWidth,halfFieldLength),WHITE);
w2 = new Line(new Point(halfFieldWidth,-halfFieldLength),new Point(halfFieldWidth,halfFieldLength),WHITE);

world.addLine(w1);
world.addLine(w2);

var walls = new Entity();
walls.addLine(w1);
walls.addLine(w2);

paddleLine = l(-0.5,4.9,0.5,4.95,WHITE);
world.addLine(paddleLine);
var enemyPaddle = new Entity();
enemyPaddle.addLine(paddleLine);
enemyPaddle.center = new Point(0,5);

ballRadius = 0.1;
p1 = new Point(ballRadius, ballRadius+0.1);
p2 = new Point(-ballRadius, ballRadius);
p3 = new Point(-ballRadius, -ballRadius+0.1);
p4 = new Point(ballRadius, -ballRadius);

l1 = new Line(p1, p2, BLUE);
l2 = new Line(p2, p3, BLUE);
l3 = new Line(p3, p4, BLUE);
l4 = new Line(p4, p1, BLUE);

//world.addLine(l1);
//world.addLine(l2);
world.addLine(l3);
//world.addLine(l4);

var ball = new Entity();

//ball.addLine(l1);
//ball.addLine(l2);
ball.addLine(l3);
//ball.addLine(l4);

setInterval("renderer.draw(world, camera)", 10);
setInterval(update, 10);
