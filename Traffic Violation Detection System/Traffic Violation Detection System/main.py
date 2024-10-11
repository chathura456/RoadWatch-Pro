# Import the InferenceHTTPClient from inference_sdk
from inference_sdk import InferenceHTTPClient

# Initialize the client with API details
CLIENT = InferenceHTTPClient(
    api_url="https://detect.roboflow.com",  # Roboflow API URL
    api_key="wZAd4OmtCjQqAVQ5k522"         # Replace with your own API key if needed
)

# Path to your local image or URL of the hosted image
image_path = "images/h1.jpeg"  # Replace with your local image path or hosted image URL

# Perform inference using the helmet detection model
result = CLIENT.infer(image_path, model_id="bike-helmet-detection-2vdjo/2")

# Output the result of the detection
print(result)
