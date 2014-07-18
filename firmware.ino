int notify(String command){
  char directive = command.charAt(0);

  if(directive == '0'){
    makeNormal();
  } else if(directive == '1'){
    makeWarning();
  } else if(directive == '2'){
    makeAlert();
  }

  return 1;
}


void makeNormal(){
  RGB.color(0, 0, 255);
}


void makeWarning(){
  RGB.color(255, 255, 0);
}


void makeAlert(){
  RGB.color(255, 0, 0);
}


void setup(){
  RGB.control(true);
  Spark.function("notify", notify);
}


void loop(){

}
