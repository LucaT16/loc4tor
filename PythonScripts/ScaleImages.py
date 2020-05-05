from PIL import Image
import os
import random

count = 0
totalcount = 0
image_list = []
path = '../Bilder/'

for root, dirnames, filenames in os.walk(path):

    # Verzeichnis für gedrehte Bilder erstellen
    for dirname in dirnames:
        if dirname != "":
            if "Cropped" in dirname:
                continue
            else:
                try:
                    newDir = "{}{}Cropped".format(path, dirname)
                    os.mkdir(newDir)
                except OSError:
                    print ("Info: Directory %s already exists" % newDir)
                else:
                    print ("Info: Successfully created the directory %s " % newDir)
        
    # Bild verarbeiten
    for filename in filenames:
        name, ext = os.path.splitext(filename)
        file = os.path.join(root, filename)

        # .DS_Store Dateien ignorieren (Für MacOS)
        if name == ".DS_Store":
            continue

        # Bild ignorieren, wenn es schon gedreht ist
        if "Cropped" in root:
            continue

        
        # Bilder rotieren
        image_list.append(os.path.basename(file))
        image = Image.open(file)
        
        for i in range(11):
            rotatedImage = image.rotate(random.randrange(0, 360, 10))
            newRotatedImage = "{}Cropped/rotated{}_{}".format(root, i, image_list[count])
            rotatedImage.save(newRotatedImage, optimized=True, quality=85)
            totalcount += 1
        
        count += 1
        totalcount +=1

print("Info: Rotating successful! Generated %s images" % totalcount)

