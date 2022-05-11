Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
 });
 
 camera = document.getElementById("camera");
 
 Webcam.attach( '#camera');
 
 function take_snapshot()
 {
     Webcam.snap(function(data_uri){
       document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
  });
 }
 
 console.log('ml5.version:' , ml5.version);
 
 classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/aVdkbQ97v/model.json',modelLoaded);
 
 function modelLoaded() {
     console.log('Model Loaded!');
 }
 
 function speak() {
     var synth = window.speechSynthesis;
     speak_data_1 = " The first predication is " + predication_1;
     speak_data_2 = " And the second predication is " + predication_2;
     var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
     synth.speak(utterThis);
 }
 
 function check()
 {
     img = document.getElementById('captured_image');
     classifier.classify(img, gotResult);
 }

 

 function gotResult(error, result){
    if(error){
        console.error(error);
    }
    else{
        document.getElementById("result_gesture_name").innerHTML = result[0].label;
        predication = result[0].label;
        speak();
        if(result[0].label == "Amazing"){
            document.getElementById("result_emoji").innerHTML ="&#128076;";
            document.getElementById("quote").innerHTML = "This is looking Amazing";
        }
        else if(result[0].label == "Best"){
           document.getElementById("result_emoji").innerHTML ="&#128077;";
           document.getElementById("quote").innerHTML = "All the Best";
       }   
       else{
           document.getElementById("result_emoji").innerHTML ="&#9996;";
           document.getElementById("quote").innerHTML = "That was a marveolus Victory";
       }
   }
}