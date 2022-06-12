var bk
var mic
var btnElement,radioElement,sliderElement,cacheGraphics,capture
var r = 100
var mode="G"
let video;

function setup() {
	background(0)
  createCanvas(windowWidth, windowHeight)
  capture = createCapture(VIDEO)
	capture.size(windowWidth/2, windowHeight/2)
	cacheGraphics = createGraphics(windowWidth, windowHeight)
	cacheGraphics.translate(windowWidth, 0) 
	cacheGraphics.scale(-1,1) 
	capture.hide()
	
  textAlign(CENTER, CENTER)
	
	mic = new p5.AudioIn()
	mic.start()
	
	sliderElement= createSlider(10,500,50,0.01)
	sliderElement.position(windowWidth/4+100, windowHeight/4*3+30)
	
	colorPicker = createColorPicker('#382f3c')
	colorPicker.position(windowWidth/4, windowHeight/4*3+30)
	colorPicker.value()
	
	radioElement=createRadio()
	radioElement.option("N")
	radioElement.option("2")
	radioElement.style("background-color",'white')
	radioElement.position(windowWidth/4, windowHeight/4*3)
	
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
		var micLevel = mic.getLevel()
		var m = sliderElement.value()
		var span=10+max(m,0)/20 
		let clr = colorPicker.value()
		
		mode = radioElement.value()
		r = lerp(r,micLevel*500,0.05)
		background(clr)
	
		fill(255);
		textSize(15);
		text("[ 使用說明 ]  \n   \n 1️⃣檢色器選擇背景顏色\n 2️⃣N > 普通相機  \n 3️⃣2 > 黑白畫面  \n   \n 💫拉桿調整圓的大小 \n 💫下方人臉的嘴巴會隨音量大小改變形狀 ", 870, 200);
		fill(149, 168, 176)  
		text("by. 410730971  陳雅淯",870, 300); 
		push()	
				if(mode=="N"){
					translate(capture.width,0)  
					scale(-1,1) 
					image(capture, 0, 0);  
				}if(mode=="2"){	
					cacheGraphics.image(capture,windowWidth/2, 0);
					noStroke();
					for(var x=0;x<cacheGraphics.width;x=x+span){
						for(var y=0;y<cacheGraphics.height;y=y+span){
								var pixel=cacheGraphics.get(x,y); //取(x,y)顏色(rgb)
								bk=(pixel[0]+ pixel[2]+ pixel[2])/3
								fill(bk)
								ellipse(x,y,span*map(bk,0,255,0,1))
				}
			}
		}
		pop()
		
		push()
			var X=windowWidth/2,Y=windowHeight/2
			if(micLevel>0.1){
					fill(254, 165, 190)
					ellipse(X+100,Y+100,200);
					fill(255)
					ellipse(X+50,Y+80,70);
					ellipse(X+150,Y+80,70);
					fill(0)
					ellipse(X+50+random(-r/5,r/5),Y+80+random(-r/5,r/5),10)
					ellipse(X+150+random(-r/5,r/5),Y+80+random(-r/5,r/5),10)
					fill(255, 236, 238)
					rect(X+90,Y+100,20,20+r*2)
				}else{
					fill(149, 168, 176)
					ellipse(X+100,Y+100,200);
					fill(255)
					ellipse(X+50,Y+80,70);
					ellipse(X+150,Y+80,70);
					fill(0)
				ellipse(X+50,Y+80,10)
					ellipse(X+150,Y+80,10)
					fill(255, 201, 214)
					rect(X+90,Y+100,20,20+r*2)
				}
		pop()
} 