from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import os
from inference_sdk import InferenceHTTPClient
import io
from PIL import Image
import base64

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize the Roboflow API client
CLIENT = InferenceHTTPClient(
    api_url="https://detect.roboflow.com",
    api_key="wZAd4OmtCjQqAVQ5k522"
)


@app.route('/detect', methods=['POST'])
def detect_violations():
    # Check if an image file was provided
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['file']

    # Save the file temporarily
    image_path = "temp_image.jpg"
    file.save(image_path)

    # Perform inference on the image
    result = CLIENT.infer(image_path, model_id="bike-helmet-detection-2vdjo/2")

    # Load the image using OpenCV
    image = cv2.imread(image_path)

    # Initialize counters for helmet and no-helmet detections
    no_helmet_count = 0
    helmet_count = 0

    # Process the result and draw bounding boxes
    predictions = result.get('predictions', [])

    # Debug: print the number of predictions
    print("Number of predictions:", len(predictions))

    for prediction in predictions:
        class_name = prediction['class']
        confidence = prediction['confidence']

        # Extract the coordinates
        x_center = prediction['x']
        y_center = prediction['y']
        width = prediction['width']
        height = prediction['height']

        # Convert from center coordinates to top-left corner coordinates
        x1 = int(x_center - (width / 2))
        y1 = int(y_center - (height / 2))
        x2 = int(x_center + (width / 2))
        y2 = int(y_center + (height / 2))

        # Debug: print the bounding box coordinates
        print(f"Prediction: {class_name}, Coordinates: ({x1}, {y1}, {x2}, {y2})")

        # Increment the corresponding count based on the class
        if class_name == "Without Helmet":
            no_helmet_count += 1
            color = (0, 0, 255)  # Red for "Without Helmet"
        else:
            helmet_count += 1
            color = (0, 255, 0)  # Green for "With Helmet"

        # Draw the bounding box
        cv2.rectangle(image, (x1, y1), (x2, y2), color, 2)

        # Add label with class name and confidence
        label = f"{class_name}: {confidence:.2f}"
        cv2.putText(image, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)

    # Save the annotated image temporarily
    output_image_path = "output_image.jpg"
    cv2.imwrite(output_image_path, image)

    # Convert the annotated image to binary data to include in the response
    img_pil = Image.open(output_image_path)
    img_byte_arr = io.BytesIO()
    img_pil.save(img_byte_arr, format='JPEG')
    img_byte_arr = img_byte_arr.getvalue()

    # Encode image to base64
    img_base64 = base64.b64encode(img_byte_arr).decode('utf-8')

    # Prepare the response data
    response_data = {
        "no_helmet_count": no_helmet_count,
        "helmet_count": helmet_count,
        "message": "Detection completed",
        "predictions": predictions
    }

    # Send both the result and the image in the response
    return jsonify({
        "data": response_data,
        "image": img_base64  # Send the base64 image
    })


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)  # Run the app on localhost:5000
