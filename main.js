var canvas;
var cols, rows; 
var scl = 20; 
var x_offset, y_offset; // coordinate offset

var z_value = [];
var x_noise, y_noise;
var sp;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight, WEBGL); //coordinate system changes with WEBGL 
    canvas.position(0,0);
    // puts canvas element in the background 
    canvas.style('z-index','-1');
    
    var w = windowWidth; 
    var h = windowHeight; 
    
    cols = w/scl;
    rows = h/scl;
    
    x_offset = w/2-1;
    y_offset = h/2;
    
    
    y_noise = 0;
    x_noise = 0;
    
    sp = 0;
    

}


function draw() {
    
    sp -= 0.01;
    
    y_noise = sp;
    console.log(y_noise);
    for (y = 0; y <rows ; y++){
        var temp =[];
        x_noise =0;
        for (x = 0; x<cols ; x++){
            temp.push( map(noise(x_noise,y_noise),0,1,-100,100  )  );
            x_noise += 0.1;
        }
        z_value.push(temp);
        y_noise += 0.1;
    }
    
    
    
        

  // put drawing code here
    background(45);
    
//    ellipse(50, 50, 80, 80);
    
    stroke(75); 
    noFill();
    
//    framerate(30);
    rotateX(PI/3);

    for (y = 0; y <rows-1 ; y++){
        beginShape(TRIANGLE_STRIP);
        for (x = 0; x<cols ; x++){

            vertex(x*scl-x_offset, y*scl - y_offset, z_value[y][x]);
            vertex(x*scl-x_offset, (y+1)*scl - y_offset, z_value[y+1][x]);
       }
        endShape();
   }
    
    
    z_value = [];
}



// global p5 function
function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
    
}