import tensorflow as tf
import numpy as np
from PIL import Image

MODEL_PATH = "model/resnet34_model_final.h5"
IMG_SIZE = (256, 256)
CLASS_NAMES = ['intact', 'damaged']


model = tf.keras.models.load_model(MODEL_PATH)

def preprocess_image(image):
    image = image.resize(IMG_SIZE)
    image = np.array(image) / 255.0
    image = np.expand_dims(image, axis=0)
    return image

def predict(image):
    """image: PIL.Image object"""
    processed = preprocess_image(image)
    prediction = model.predict(processed)[0]
    label = CLASS_NAMES[np.argmax(prediction)]
    confidence = float(np.max(prediction))
    return {"label": label, "confidence": round(confidence, 4)}
