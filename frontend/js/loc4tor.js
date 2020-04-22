const MODEL_URL = 'js/model/model.json';
const IMG_SIZE = 128.0;

$('#files').change(function() {
    var i = $(this).prev('label').clone();
    var file = $('#files')[0].files[0].name;
    $(this).prev('label').text(file);
});

function dateiauswahl(evt) {
    //cleart vorschau wenn schon ein Bild hochgeladen wurde
    var element;
    if (element = document.querySelector("#yourImageLink")) {
        element.src = "";
        document.querySelector("#sourceImage").src = "";
        $("#text1").html("");
        $("#text2").html("");
    }

    var dateien = evt.target.files;
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
                $("#text4").html("Ihr Bild");
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

async function showResult() {
    $.LoadingOverlay('show')

    //Model laden
    let model = await tf.loadGraphModel(MODEL_URL);

    //Bilddaten laden
    let img = new Image(IMG_SIZE, IMG_SIZE);
    img.src = document.querySelector("#yourImageLink").src;
    var imgTensor = tf.browser.fromPixels(img);
    imgTensor = tf.reverse(imgTensor, -1)
    var input = imgTensor.expandDims();
    input = tf.cast(input, 'float32');

    //Bild predicten
    var result = model.predict(input);
    var winner = Math.max(...result.dataSync());
    var index = result.dataSync().indexOf(winner);

    //Ergebnis ausgeben
    var sourceImageUrl;
    var place = "";
    switch (index) {
        case 0:
            sourceImageUrl = "./assets/BigBen.jpg";
            place = "Big Ben";
            break;
        case 1:
            sourceImageUrl = "./assets/BrandenburgerTor.jpg";
            place = "Brandenburger Tor";
            break;
        case 2:
            sourceImageUrl = "./assets/Eiffelturm.jpg";
            place = "Eiffelturm"
            break;
        case 3:
            sourceImageUrl = "./assets/Freiheitsstatue.jpg";
            place = "Freiheitsstatue"
            break;
        case 4:
            sourceImageUrl = "./assets/GoldenGate.jpeg";
            place = "Golden Gate Bridge"
            break;
        case 5:
            sourceImageUrl = "./assets/Akropolis.jpg";
            place = "Akropolis";
            break;
        case 6:
            sourceImageUrl = "./assets/BuckinghamPalace.jpg";
            place = "Buckingham Palace";
            break;
        case 7:
            sourceImageUrl = "./assets/Colosseum.jpg";
            place = "Colosseum";
            break;
        case 8:
            sourceImageUrl = "./assets/Wasserturm.jpg";
            place = "Mannheimer Wasserturm";
            break;
        default:
            break;
    }
    $.LoadingOverlay('hide')

    // Bild darstellen
    document.querySelector("#sourceImage").src = sourceImageUrl;
    $("#text1").html("Ihr Bild wurde hier aufgenommen:");
    $("#text2").html(place);
    $("#text3").html("Ergebnis");
};