import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import os

MODEL_PATH = "model/detection_model.h5"
IMG_SIZE = (256, 256)
CLASS_NAMES = ['intact', 'damaged'] 

model = tf.keras.models.load_model(MODEL_PATH)

current_dir = os.path.dirname(__file__)  
image_path = os.path.join(current_dir, "damagedfoodpackagingbox10.jpeg")
def preprocess_image(image):
    image = image.resize(IMG_SIZE)
    image = img_to_array(image)         
    image = tf.convert_to_tensor(image, dtype=tf.float32)
    image = tf.expand_dims(image, axis=0)
    image = image / 255.0
    return image
    # img = load_img(image_path, target_size=(256, 256))      
    # x = img_to_array(img)                                  
    # x = np.expand_dims(x, axis=0)                           
    # x = x / 255.0    
    # return x  

def predict(file):
    processed = preprocess_image(file)
    prediction = model.predict(processed)[0]
    print("🧠 Raw model output:", prediction.tolist())
    label = CLASS_NAMES[np.argmax(prediction)]
    confidence = float(np.max(prediction))
    return {"label": label, "confidence": round(confidence, 4)}
