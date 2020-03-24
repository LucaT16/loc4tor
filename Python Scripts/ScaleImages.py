from PIL import Image
import os
import random

count = 0
totalcount = 0
image_list = []
path = '../Bilder/'
size = (244,244)


for root, dirnames, filenames in os.walk(path):

    #create dictionary for cropped pics
    for dirname in dirnames:
        if dirname != "":
            if "Cropped" in dirname:
                continue
            else:
                try:
                    newDir = "{}{}Cropped".format(path, dirname)
                    os.mkdir(newDir)
                except OSError:
                    print ("Creation of the directory %s failed" % newDir)
                else:
                    print ("Successfully created the directory %s " % newDir)
        
    #skale the image
    for filename in filenames:
        name, ext = os.path.splitext(filename)
        if name == ".DS_Store":
            continue

        file = os.path.join(root, filename)

        #ignore image when already cropped
        if "Cropped" in root:
            continue

        #append file name to array list
        image_list.append(os.path.basename(file))

        #resize images
        image = Image.open(file)
        imageCropped = image.resize(size, Image.LANCZOS)

        #save new images
        newImage = "{}Cropped/{}".format(root, image_list[count])
        imageCropped.save(newImage, optimized=True, quality=85)

        #rotate the images 
        for i in range(11):
            rotatedImage = image.rotate(random.randrange(0, 360, 10))
            newRotatedImage = "{}Cropped/rotated{}_{}".format(root, i, image_list[count])
            rotatedImage.save(newRotatedImage, optimized=True, quality=85)
            totalcount += 1
        
        count += 1
        totalcount +=1

print("Scaling successful! Generated {} diffrent images".format(totalcount))

