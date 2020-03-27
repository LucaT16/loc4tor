#!/usr/bin/env python
# coding: utf-8

# <a href="https://colab.research.google.com/github/LucaT16/loc4tor/blob/master/Python%20Scripts/loc4tor.ipynb" target="_parent"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>

# # loc4tor

# ### Import TensorFlow

# In[1]:


from __future__ import absolute_import, division, print_function, unicode_literals
import tensorflow as tf
import pickle
import os
os.environ['KMP_DUPLICATE_LIB_OK']='True'

from tensorflow.keras import datasets, layers, models
from tensorflow.keras import losses 
import matplotlib.pyplot as plt


# ### Read Dataset

# In[2]:


train_images = pickle.load(open("x.pickle","rb")) 
train_labels = pickle.load(open("y.pickle","rb")) 

train_images = train_images/255.0


# ### Verify the data

# In[3]:


plt.imshow(train_images[0])
plt.show()


# ### Create the convolutional base

# In[4]:


IMG_SIZE = 244

model = models.Sequential()
model.add(layers.Conv2D(64, (3, 3), activation='relu', input_shape= (IMG_SIZE, IMG_SIZE, 3)))
model.add(layers.MaxPooling2D((2, 2)))
model.add(layers.Conv2D(64, (3, 3), activation='relu'))
model.add(layers.MaxPooling2D((2, 2)))
model.add(layers.Conv2D(64, (3, 3), activation='relu'))

model.add(layers.Flatten())
model.add(layers.Dense(64, activation='relu'))
model.add(layers.Dense(5))

model.summary()


# ### Compile and train the model

# In[ ]:


model.compile(optimizer='adam',
              loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
              metrics=['accuracy'])

history = model.fit(train_images, train_labels, epochs=10, validation_split=0.1)


# ### Evaluate the model

# In[ ]:


plt.plot(history.history['accuracy'], label='accuracy')
plt.plot(history.history['val_accuracy'], label = 'val_accuracy')
plt.xlabel('Epoch')
plt.ylabel('Accuracy')
plt.ylim([0.5, 1])
plt.legend(loc='lower right')

test_loss, test_acc = model.evaluate(test_images,  test_labels, verbose=2)


# In[ ]:


print(test_acc)


# ### Save the model

# In[ ]:


MODEL_DIR = "models/loc4tor"
export_path = os.path.join(MODEL_DIR)
print('export_path = {}\n'.format(export_path))

tf.keras.models.save_model(
    model,
    export_path,
    overwrite=True,
    include_optimizer=True,
    save_format=None,
    signatures=None,
    options=None
)


# In[ ]:




