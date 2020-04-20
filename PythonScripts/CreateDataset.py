import os
import cv2
import random
import numpy as np
import pickle

DATADIR = "../Bilder/"
CATEGORIES = ["BigBen", "BrandenburgerTor", "Eiffelturm", "Freiheitstatue", "GoldenGateBridge","Akropolis","BuckinghamPalace","Colosseum","Wasserturm"]
CROPPED = "Cropped"
IMG_SIZE = 128
training_data = []

# Über Bildverzeichnisse loopen
for category in CATEGORIES:
    path = os.path.join(DATADIR,category)

    # Nur die rotierten Bilder betrachten
    path = path + CROPPED
    class_num = CATEGORIES.index(category)

    for img in os.listdir(path):
        try:
            # Bildgröße anpassen und in Array speichern
            img_array = cv2.imread(os.path.join(path,img))
            resized_array = cv2.resize(img_array, (IMG_SIZE, IMG_SIZE))
            training_data.append([resized_array, class_num])
        except Exception as e:
            print(e)
    print("Info: Done with appending {}".format(category))
random.shuffle(training_data)

# Datensets generieren
x = []
y = []

# Bilder in x anhängen, die dazugehörigen Labels in y 
for features, label in training_data:
    x.append(features)
    y.append(label)

x = np.array(x).reshape(-1, IMG_SIZE, IMG_SIZE, 3)
y = np.array(y)

# pickle Dateien generieren 
pickle_out = open("x.pickle", "wb")
pickle.dump(x, pickle_out)
pickle_out.close()
print("Info: x.pickle created!")

pickle_out = open("y.pickle", "wb")
pickle.dump(y, pickle_out)
pickle_out.close()
print("Info: y.pickle created!")