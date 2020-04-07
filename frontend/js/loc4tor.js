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

    let model = await tf.loadGraphModel(MODEL_URL);

    let img = new Image(IMG_SIZE, IMG_SIZE);
    img.src = document.querySelector("#yourImageLink").src;

    var imgTensor = tf.browser.fromPixels(img);
    imgTensor = tf.reverse(imgTensor, -1)
    var input = imgTensor.expandDims();
    input = tf.cast(input, 'float32');

    input.print()

    var result = model.predict(input);
    result.print()

    var winner = Math.max(...result.dataSync());
    var index = result.dataSync().indexOf(winner);

    var sourceImageUrl;
    var place = "";
    switch (index) {
        case 0:
            sourceImageUrl = "./images/BigBen.jpg";
            place = "Big Ben";
            break;
        case 1:
            sourceImageUrl = "./images/BrandenburgerTor.jpg";
            place = "Brandenburger Tor";
            break;
        case 2:
            sourceImageUrl = "./images/Eiffelturm.jpg";
            place = "Eiffelturm"
            break;
        case 3:
            sourceImageUrl = "./images/Freiheitsstatue.jpg";
            place = "Freiheitsstatue"
            break;
        case 4:
            sourceImageUrl = "./images/GoldenGate.jpeg";
            place = "Golden Gate Bridge"
            break;
        default:
            break;
    }
    $.LoadingOverlay('hide')

    // Display the image.
    document.querySelector("#sourceImage").src = sourceImageUrl;
    $("#text1").html("Ihr Bild wurde hier aufgenommen:");
    $("#text2").html(place);
    $("#text3").html("Ergebnis");

    // Display the percentage.
    //document.querySelector("#percentage").style = "";
};

function showUserImage() {
    var userImageUrl = document.getElementById('picUrl').value;
    document.querySelector("#yourImageLink").src = userImageUrl;
    document.querySelector("#analyseButton").style = "";

}