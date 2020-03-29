const MODEL_URL = 'js/model/model.json';

function dateiauswahl(evt) {
    //cleart vorschau wenn schon ein Bild hochgeladen wurde
    var element;
    if (element = document.querySelector("#yourImageLink")) {
        element.src = "";
    }

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
                document.querySelector("#yourImageLink").src = e.target.result;
            };
        })(f);
        // Bilder als Data URL auslesen.
        reader.readAsDataURL(f);
    }
}
// Auf neue Auswahl reagieren und gegebenenfalls Funktion dateiauswahl neu ausführen.
document.getElementById('files').addEventListener('change', dateiauswahl, false);

document.getElementById('analize').addEventListener('click', showResult);

async function showResult() {
    const model = await tf.loadLayersModel(MODEL_URL);

    let img = new Image(244, 244);
    img.src = document.getElementById('vorschau').src;

    let imgTensor = tf.browser.fromPixels(img);
    let input = tf.zeros([1, 244, 244, 3]);
    input[0] = imgTensor;
    //input.reshape([-1, 244, 244, 3])
    var result = model.predict(input);
    var winner = Math.max(...result.dataSync());
    var index = result.dataSync().indexOf(winner);

    var sourceImageUrl;
    switch (index) {
        case 0:
            sourceImageUrl = "https://de.wikipedia.org/wiki/Eiffelturm#/media/Datei:Tour_Eiffel_Wikimedia_Commons.jpg";
            break;
        case 1:
            sourceImageUrl = "Monday";
            break;
        case 2:
            sourceImageUrl = "./assets/Eiffelturm.jpg";
            break;
        case 3:
            sourceImageUrl = "Wednesday";
            break;
        case 4:
            sourceImageUrl = "Thursday";
            break;
        default:
            break;
    }

    // Display the image.
    document.querySelector("#sourceImage").src = sourceImageUrl;
};

function showUserImage() {
    var userImageUrl = document.getElementById('picUrl').value;
    document.querySelector("#yourImageLink").src = userImageUrl;

    document.querySelector("#analyseButton").style = "";

}