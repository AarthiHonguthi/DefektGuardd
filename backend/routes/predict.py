from flask import Blueprint, request, jsonify
from PIL import Image
from model.model import predict

predict_bp = Blueprint('predict_bp', __name__)

@predict_bp.route("/predict", methods=["POST"])
def predict_route():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    try:
        image = Image.open(file.stream).convert("RGB")
        result = predict(image)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
