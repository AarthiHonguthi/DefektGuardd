from flask import Blueprint, request, jsonify
from PIL import Image
from model.model import predict

predict_bp = Blueprint('predict_bp', __name__)

@predict_bp.route("/predict", methods=["POST"])
def predict_route():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]
    try:
        
        image = Image.open(file.stream).convert("RGB")
        
        result = predict(image)  
        return jsonify(result)
    except Exception as e:
        print("Prediction error:", str(e))
        return jsonify({"error": str(e)}), 500

