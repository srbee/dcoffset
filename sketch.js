function setup() {
  createCanvas(1200, 500);
  background('yellow')
  strokeWeight(1)
  stroke('red')
  // Very Important to check whether
  // angleMode(DEGREES) or angleMode(RADIANS) is required
  // by default angle mode is in RADIANS
  angleMode(RADIANS)
  textSize(18)
  frameRate(50)
  // Initialization of global variables
  t=0;x=t
  Vm=200;f=50;w=2*PI*f;T50=1/f
  k=0;idc=[];iac=[]
  xscale=8000;yscale=-18
  jadi=2
  // create sliders
  mySliders()
   
  
}// end of mandatory function setup()

function mySliders(){
  
  alpSlider=createSlider(0,180,0,1)
  alpSlider.position(10,15)
  alpSlider.style('width','80px')
  alpSlider.changed(alpChanged)
  
  //thetaSlider=createSlider(-90,0,-90,15)
  //thetaSlider.position(10,60)
  //thetaSlider.style('width','80px')
  //thetaSlider.changed(alpChanged)

}//end of function mySliders()

function draw() {
  //background(220);
  translate(width/2,height/2)
  myAxes()
  L=.325/(2*PI*60) ; R=0.028;km=100
  L=L*km;R=R*km;Tau=L/R
  //Tstep=Tau/100
  Tstep=T50/200
  theta=atan2(w*L,R);// !!!! theta is in radinas !!!!
  theta_deg=degrees(theta)
  theta_deg=round(theta_deg*100)
  theta_deg=theta_deg/100
  Z=sqrt(R*R+(w*L)*(w*L))
  t=t+Tstep
  k=int(t/Tstep)
  // ======Switching angle slider =====
     //alp=30;//alpha is reserved by p5.js
  alp=alpSlider.value() 
  // alp is in degrees while we need it in radians
  // in all expressions, but for display in degrees
  //===========================
  x=t*xscale-width/2.5
  ydc=dc(Vm,Z,Tau,alp,theta)// dc offset
  ydc=ydc*yscale
  push();stroke('green');circle(x,-ydc,jadi);pop()
  yac=ac(Vm,Z,alp,theta)
  yac=yac*yscale
  push();stroke('blue');circle(x,yac,jadi);pop()
  cu=yac-ydc// cu for current
  push();stroke('magenta');circle(x,cu,jadi);pop()
  volt=acV(Vm,alp)
  volt=volt*yscale/18
  push();fill('red');circle(x,volt,jadi+1);pop()
  text('Sw Ang = '+alp,-width/2.1,-height/2.13)
  if(theta>0) {LL=' lag'} 
  if(theta==0){LL='   '}
  text('phi = '+theta_deg+LL,-width/2.1,-height/2.63)
  
}// end of mandatory function draw()

function alpChanged(){
  background('yellow')
  t=0
}// end of function alpChanged()

function dc(Vm,Z,Tau,alp,theta){
  idc[k]=(Vm/Z)*(exp(-t/Tau))*sin(radians(alp)-theta)
  return idc[k]
}//end of function dc()
//=================================
function ac(Vm,Z,alp,theta){
    iac[k]=(Vm/Z)*(sin(w*t+radians(alp)-theta))
    return iac[k]
}//end of function ac()
//=====================================

function acV(Vm,alp){
  vvv=(Vm)*(sin(w*t+radians(alp)))
  return vvv
  }//end of function acV()
//===================================
function myAxes()
{
  x1=-width/2;y1=0;x2=width/2;y2=0
  line(x1,y1,x2,y2)
  x3=-width/2.5;y3=-height/2;x4=-width/2.5;y4=height/2
  line(x3,y3,x4,y4)
  text('t = 0',-width/2.35,15)
  push();stroke('red');text('V:red',-width/2.1,-150);pop()
  push();stroke('magenta');text('I:magenta',-width/2.1,-120);pop()
  push();stroke('blue');text('Iss:blue',-width/2.1,-90);pop()
  push();stroke('green');text('Idc:green',-width/2.1,-60);pop()
  
}//end of function myaxes()