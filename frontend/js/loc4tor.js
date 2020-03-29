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
        document.querySelector("#analyseButton").style = "";

    }
}
// Auf neue Auswahl reagieren und gegebenenfalls Funktion dateiauswahl neu ausführen.
document.getElementById('files').addEventListener('change', dateiauswahl, false);

document.getElementById('analyseButton').addEventListener('click', showResult);

//document.getElementById('showUserImage').addEventListener('click', showUserImage);

async function showResult() {
    let model = await tf.loadGraphModel(MODEL_URL);

    let img = new Image(244.0, 244.0);
    img.src = document.querySelector("#yourImageLink").src;

    let imgTensor = tf.browser.fromPixels(img);

    let input = imgTensor.expandDims();
    input = tf.cast(input, 'float32');

    var result = model.predict(input);
    result.print()
    var winner = Math.max(...result.dataSync());
    var index = result.dataSync().indexOf(winner);
    console.log(index)

    var sourceImageUrl;
    switch (index) {
        case 0:
            sourceImageUrl = "./assets/BigBen.jpg";
            break;
        case 1:
            sourceImageUrl = "./assets/BrandenburgerTor.jpg";
            break;
        case 2:
            sourceImageUrl = "./assets/Eiffelturm.jpg";
            break;
        case 3:
            sourceImageUrl = "./assets/Freiheitsstatue.jpg";
            break;
        case 4:
            sourceImageUrl = "./assets/GoldenGate.jpeg";
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