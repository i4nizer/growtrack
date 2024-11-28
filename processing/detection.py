import os
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image


# Load the model (ensure the path is correct)
MODEL_PATH = os.path.join(os.path.dirname(__file__), '../models/lettuce_growth_model.keras')
model = load_model(MODEL_PATH)


# Preprocess the image to the required input format for the model.
def preprocess_image(img_path, target_size=(254, 254)):
    
    # Resize to target size
    img = image.load_img(img_path, target_size=target_size)
    
    # Convert to numpy array
    img_array = image.img_to_array(img)  

    # Add batch dimension
    img_array = np.expand_dims(img_array, axis=0)  

    # Normalize pixel values
    img_array /= 255.0  
    return img_array


# Predict the growth stage using the preloaded model.
def predict_growth_stage(img_array):    
    
    # Get predictions for the batch (first element)
    predictions = model.predict(img_array)[0]
    
    # Get the class with the highest probability
    growth_stage = np.argmax(predictions) 
    print(predictions)

    # Convert predictions to a Python list
    return growth_stage, predictions.tolist()

