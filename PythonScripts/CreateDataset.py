import os
import cv2
import random
import numpy as np
import pickle

DATADIR = "../Bilder/"
CATEGORIES = ["BigBen", "BrandenburgerTor", "Eiffelturm", "Freiheitstatue", "GoldenGateBridge"]
CROPPED = "Cropped"
IMG_SIZE = 244
training_data = []

#loop over relevant images
for category in CATEGORIES:
    path = os.path.join(DATADIR,category)
    path = path + CROPPED
    class_num = CATEGORIES.index(category)
    for img in os.listdir(path):
        try:
            #resize the image and save it in training_data
            img_array = cv2.imread(os.path.join(path,img), cv2.IMREAD_GRAYSCALE)
            resized_array = cv2.resize(img_array, (IMG_SIZE, IMG_SIZE))
            training_data.append([resized_array, class_num])
        except Exception as e:
            print(e)
    print("Info: Done with appending {}".format(category))
random.shuffle(training_data)

#create pickle datasets
x = []
y = []

for features, label in training_data:
    x.append(features)
    y.append(label)

x = np.array(x).reshape(-1, IMG_SIZE, IMG_SIZE, 1)
y = np.array(y)

pickle_out = open("x.pickle", "wb")
pickle.dump(x, pickle_out)
pickle_out.close()
print("Info: x.pickle created!")
pickle_out = open("y.pickle", "wb")
pickle.dump(y, pickle_out)
pickle_out.close()
print("Info: y.pickle created!")