import cv2
from inference_sdk import InferenceHTTPClient

# Initialize the Roboflow API client
CLIENT = InferenceHTTPClient(
    api_url="https://detect.roboflow.com",
    api_key="wZAd4OmtCjQqAVQ5k522"
)

# Path to the video file
video_path = "videos/hv2.mp4"

# Open the video file
cap = cv2.VideoCapture(video_path)

# Check if video opened successfully
if not cap.isOpened():
    print("Error: Could not open video.")
    exit()

# Get the frame width and height
frame_width = int(cap.get(3))
frame_height = int(cap.get(4))

# Define the codec and create a VideoWriter object to save the output
output_video = cv2.VideoWriter('output_with_detections.mp4',
                               cv2.VideoWriter_fourcc(*'mp4v'), 30,
                               (frame_width, frame_height))

while cap.isOpened():
    ret, frame = cap.read()  # Read a frame from the video

    if not ret:
        break  # Exit the loop if no more frames are available

    # Save the current frame as an image
    frame_path = "current_frame.jpg"
    cv2.imwrite(frame_path, frame)

    # Perform inference on the current frame
    result = CLIENT.infer(frame_path, model_id="bike-helmet-detection-2vdjo/2")

    # Draw bounding boxes and labels on the frame (if any predictions are made)
    for prediction in result['predictions']:
        x, y, w, h = prediction['x'], prediction['y'], prediction['width'], prediction['height']
        confidence = prediction['confidence']
        label = prediction['class']

        # Calculate the coordinates for the bounding box
        x1 = int(x - w / 2)
        y1 = int(y - h / 2)
        x2 = int(x + w / 2)
        y2 = int(y + h / 2)

        # Draw a rectangle and label around the detected object
        cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
        cv2.putText(frame, f"{label} ({confidence:.2f})", (x1, y1 - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.9, (36, 255, 12), 2)

    # Display the frame with the detections (optional)
    cv2.imshow("Frame with Detections", frame)

    # Write the frame to the output video
    output_video.write(frame)

    # Press 'q' to exit the loop early (optional)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the video capture and writer objects
cap.release()
output_video.release()

# Close all OpenCV windows
cv2.destroyAllWindows()
