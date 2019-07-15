var canvas;
var cols, rows; 
var scl; 
var x_offset, y_offset; // coordinate offset
var w,h;
var z_value = [];
var x_noise, y_noise;
var sp;

var song; 
var amp;
var fft; 

var avg;

var sample_rate;

function emptyz_value(){
    for ( let y = 0; y <rows; y++){
        let temp = [];
        for ( let x = 0; x<cols ; x++){
            temp.push(0);
        }
        z_value.push(temp);
    }
}

function suc(){
    console.log("File loaded properly");
    song.play(); // does not work on chrome 

    
}

function fail(){
    console.log("DIDNT LOAD");
}

function preload(){
    song =loadSound("sample/sample4.mp3",suc,fail);
}


//
function avg_spec(){
    
    let t = [];

    fft.analyze();
    for ( let i = 1; i < 1024; i += 10 ){
        t.push( map(fft.getEnergy(i,i+10), 0,255,0,300 )  );
    }
    return t;



}
//function test1(){
//    fft.analyze();
//
//    console.log(fft.getEnergy(1,100));
//}


function get_color(zvalue){
    if (zvalue >= 200){
        return "#f6efef"; // white 
    }
    
    
    if (zvalue >= 180){
        
        return "#d93030"; // red 
    }
    
    if(zvalue >= 160){
        return  "#d65e27"; //orange
    }
    
    if(zvalue >= 140){
        return "#e7eb2d"; //yellow 
    }
    
    if (zvalue >= 120){
        return "#a5eb2d"; // greenish
    }
    
    if(zvalue >= 100){
        return "#30eb2d"; //deeper green
        
    }
    
    if(zvalue >= 80){
        return "#2debd5"; // sky blue 
    }
    
    if (zvalue >= 60){
        
        return "#2d79eb"; // dark blue 
        
    }
    
    if (zvalue >= 40){
        return "432deb"; // dark purle blue
    }else{
        return "#4c4b52"; //grey
    }
    
}


function setup() {
    canvas = createCanvas(windowWidth, windowHeight, WEBGL); //coordinate system changes with WEBGL 
    canvas.position(0,0);
    // puts canvas element in the background 
    canvas.style('z-index','-1');
    
    w = windowWidth; 
    h = windowHeight; 
    scl = 20;
    cols = w/scl;
    rows = h/scl;
    
    console.log("columes: ",cols,"rows:",rows); //(48,48)
    
    
    y_noise = 0;
    x_noise = 0;
    
    sp = 0;
    song.setVolume(0.1);
    amp = new p5.Amplitude;
    fft = new p5.FFT(.6, 2048);
    emptyz_value();
    sample_rate = 0; 
    console.log("Calling spec");
//    setInterval(avg_spec ,1000);

    


    
}





function draw() {
    
//    sp -= 0.01;
//    
//    y_noise = sp;
//    for (y = 0; y <rows ; y++){
//        var temp =[];
//        x_noise =0;
//        for (x = 0; x<cols ; x++){
//            //noise function returns same number if both input are the same
//            temp.push( map(noise(x_noise,y_noise),0,1,-100,100));
//            x_noise += 0.1;
//        }
//        z_value.push(temp);
//        y_noise+= 0.1;
////        console.log(y_noise);
//    }
//    
//    console.log(z_value);
        
    z_value.shift(); //remove array or row 
    z_value.push(avg_spec()); //

//    for (let y = 0; y <rows-1 ; y++){
//        z_value.unshift(avg_spec());
//    }
//    
    
    

    background(45);
    
    
//    stroke(75); 
    noFill();
    
    rotateX(PI/2.7);
    translate(-(w/2),-(h/2)); // offset by a certain amount (manual offset might be faster)
    
//    frameRate(10);
    
    
    for (let y = 0; y <rows-1 ; y++){ // rows-1 with triangle strpip
        beginShape(LINES);
        for ( let x = 0; x<cols ; x++){  
            
            stroke(get_color(z_value[y][x]));
//            fill(get_color(z_value[y][x]));

            vertex(x*scl, y*scl, z_value[y][x]) ;
            
            vertex(x*scl, (y+1)*scl, z_value[y+1][x]);
       }
        endShape();
        
   }
        
}



// global p5 function
function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
    
}