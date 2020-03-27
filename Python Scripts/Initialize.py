import os

print("Preparing the images.....")
os.system("python3 ScaleImages.py")
print("...done!")
print("Preparing datasets.....")
os.system("python3 CreateDataset.py")
print("...done!")
