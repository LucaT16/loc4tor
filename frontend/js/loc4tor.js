   function dateiauswahl(evt) {
            var dateien = evt.target.files; // FileList object
            // Auslesen der gespeicherten Dateien durch Schleife
            for (var i = 0, f; f = dateien[i]; i++) {
                // nur Bild-Dateien
                if (!f.type.match('image.*')) {
                    continue;
                }
              
                var reader = new FileReader();
                reader.onload = (function (theFile) {
                    return function (e) {
                        // erzeuge Thumbnails.
                        var vorschau = document.createElement('img');
                        vorschau.className = 'vorschau';
                        vorschau.src = e.target.result;
                        vorschau.title = theFile.name;
                        document.getElementById('list')
                            .insertBefore(vorschau, null);
                    };
                })(f);
                // Bilder als Data URL auslesen.
                reader.readAsDataURL(f);
            }
        }
        // Auf neue Auswahl reagieren und gegebenenfalls Funktion dateiauswahl neu ausführen.
    document.getElementById('files')
        .addEventListener('change', dateiauswahl, false);


function showResult(result) {

    switch (0) {
  case 0:
    result = "https://de.wikipedia.org/wiki/Eiffelturm#/media/Datei:Tour_Eiffel_Wikimedia_Commons.jpg";
    break;
  case 1:
    day = "Monday";
    break;
  case 2:
     day = "Tuesday";
    break;
  case 3:
    day = "Wednesday";
    break;
  case 4:
    day = "Thursday";
    break;
  case 5:
    day = "Friday";
    break;
  case 6:
    day = "Saturday";
}

    // Display the image.

    var sourceImageUrl = result;
    document.querySelector("#sourceImage").src = sourceImageUrl;



};
function showUserImage (){

	var userImageUrl = document.getElementById('picUrl').value;
    document.querySelector("#yourImageLink").src = userImageUrl;

    document.querySelector("#analyseButton").style = "";

}
