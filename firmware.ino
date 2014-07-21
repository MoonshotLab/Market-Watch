int rVal = 255;
int gVal = 255;
int bVal = 0;

int flashState = 0;
String should = "breathe";


// Pass in the params like 1,green or 0,blue
int notify(String command)
{
  char directive = command.charAt(0);
  String color = command.substring(2, command.length());

  if(directive == '0') should = "breathe";
  else if(directive == '1') should = "flash";

  if(color == "white"){
    rVal = 255;
    gVal = 255;
    bVal = 255;
  } else if(color == "green"){
    rVal = 0;
    gVal = 255;
    bVal = 0;
  } else if(color == "red"){
    rVal = 255;
    gVal = 0;
    bVal = 0;
  } else if (color == "blue"){
    rVal = 0;
    gVal = 0;
    bVal = 255;
  }

  return 1;
}


void setup()
{
  RGB.control(true);
  RGB.brightness(255);
  RGB.color(rVal, gVal, bVal);
  Spark.function("notify", notify);
}


void flash()
{
  if(flashState){
    RGB.color(rVal, gVal, bVal);
    flashState = 0;
  } else{
    RGB.color(0, 0, 0);
    flashState = 1;
  }

  delay(100);
}


void breathe(int speed)
{
  int R = rVal;
  int G = gVal;
  int B = bVal;
  int oR = rVal;
  int oG = gVal;
  int oB = bVal;

  RGB.color(R, G, B);

  for(int i=255; i>0; i--){
    if(R > 0) R = R - 1;
    if(G > 0) G = G - 1;
    if(B > 0) B = B - 1;

    RGB.color(R, G, B);
    delay(speed);
  }

  delay(speed*20);

  for(int j=0; j<255; j++){
    if(R != oR) R = R + 1;
    if(G != oG) G = G + 1;
    if(B != oB) B = B + 1;

    RGB.color(R, G, B);
    delay(speed);
  }
}


void loop()
{
  if(should == "breathe") breathe(3);
  else if(should == "flash") flash();
  else RGB.color(255,255,255);
}
