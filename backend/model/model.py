import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing.image import img_to_array

IMG_SIZE = (256, 256)
CLASS_NAMES = ['intact', 'damaged']
MODEL_PATH = "model/resnet34_model.h5"

model = tf.keras.models.load_model(MODEL_PATH)

def preprocess_image(image):
    image = image.resize(IMG_SIZE)
    image = img_to_array(image)          
    image = tf.convert_to_tensor(image, dtype=tf.float32)
    image = tf.expand_dims(image, axis=0)  
    image = image / 255.0                  
    return image
    
def predict(pil_image):
    try:
        processed = preprocess_image(pil_image)
        prediction = model.predict(processed)[0]
        print("🧠 Raw model output:", prediction.tolist())

        label_index = np.argmax(prediction)
        label = CLASS_NAMES[label_index]
        confidence = float(np.max(prediction))

        return {"label": label, "confidence": round(confidence, 4)}
    except Exception as e:
        print("Prediction error:", str(e))
        return {"error": str(e)}
