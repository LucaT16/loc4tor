function dateiauswahl(evt) {
    var dateien = evt.target.files; // FileList object

    // Auslesen der gespeicherten Dateien durch Schleife
    for (var i = 0, f; f = dateien[i]; i++) {

      // nur Bild-Dateien
      if (!f.type.match('image.*')) {
        continue;
      }

      var reader = new FileReader();

      reader.onload = (function(theFile) {
        return function(e) {
          // erzeuge Thumbnails.
          var vorschau = document.createElement('img');
          vorschau.className = 'thumb';
          vorschau.src   = e.target.result;
          vorschau.title = theFile.name;
          document.getElementById('list').insertBefore(vorschau, null);
        };
      })(f);

      // Bilder als Data URL auslesen.
      reader.readAsDataURL(f);
    }
  }
  // Auf neue Auswahl reagieren und gegebenenfalls Funktion dateiauswahl neu ausführen.
  document.getElementById('files').addEventListener('change', dateiauswahl, false);


function processImage(listAttribute) {
    // Replace <Subscription Key> with your valid subscription key.
    var subscriptionKey = "6d9a05bde1cd46338e508eb44b8d969b";

    var uriBase =
        "https://testdhbw1.cognitiveservices.azure.com/face/v1.0/detect";
    // Request parameters.
    var params = {
        "returnFaceId": "true",
        "returnFaceLandmarks": "false",
        "returnFaceAttributes":
            "age,gender,headPose,smile,facialHair,glasses,emotion," +
            "hair,makeup,occlusion,accessories,blur,exposure,noise"
    };

    // Display the image.
    var sourceImageUrl = document.getElementById("inputImage").value;
    document.querySelector("#sourceImage").src = sourceImageUrl;



};
