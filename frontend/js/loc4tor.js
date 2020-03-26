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

function getAttribute(data, listAttribute) {
    var jsonObject = JSON.parse(data);
    //return jsonObject[0].faceAttributes.gender;

    switch (listAttribute) {
        case "sex":
            if (jsonObject[0].faceAttributes.gender = "female") {
                return "Die Person ist weiblich.";
            } else if (jsonObject[0].faceAttributes.gender = "male") {
                return "Die Person ist männlich.";
            } else {
                return "Geschlecht kann nicht bestimmt werden.";
            }
        case "age":
            return "Die Person ist " + jsonObject[0].faceAttributes.age + " Jahre alt";
        case "haircolour":
            var hairColours = jsonObject[0].faceAttributes.hair.hairColor;
            var colourObject = {
                "color": "none",
                "confidence": 0.0
            };
            hairColours.forEach(element => {
                    if (element.confidence > colourObject.confidence) {
                        colourObject = element;
                    }
                }
            )
            return "Die Haarfarbe ist " + colourObject.color + ".";
        default:
            return "Fehler bei Ausführung."
    }
}