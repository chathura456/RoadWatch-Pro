"use client"
import { InferenceEngine } from "inferencejs"; // Use inferencejs
import { useEffect, useRef, useState } from "react";

const Uploader = () => {
  const videoRef = useRef(null); // Reference to video element
  const canvasRef = useRef(null); // Reference to canvas element
  const [workerId, setWorkerId] = useState(null); // Store the inference worker ID
  const [inferEngine, setInferEngine] = useState(null); // Inference engine state

  useEffect(() => {
    const engine = new InferenceEngine();
    engine
      .startWorker("bike-helmet-detection-2vdjo", 2, "rf_SfWTdKgHlnMiJxXq4QfTTRQxjXF2") // Public model
      .then((id) => {
        setWorkerId(id);
        setInferEngine(engine); // Save engine instance
      })
      .catch((error) => {
        console.error("Error loading model:", error);
      });
  }, []);
  
  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (file) {
      const fileURL = URL.createObjectURL(file);
      video.src = fileURL;

      video.onloadedmetadata = () => {
        video.play();
        detectFrame(video, canvas, ctx); // Start detecting on frames
      };
    }
  };

  const detectFrame = (video, canvas, ctx) => {
    if (workerId && inferEngine) {
      const image = videoRef.current;

      // Perform inference on each frame
      inferEngine.infer(workerId, image).then((predictions) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous frame

        predictions.forEach((prediction) => {
          const { x, y, width, height } = prediction.bbox;
          const confidence = (prediction.confidence * 100).toFixed(2);

          // Draw bounding boxes
          ctx.strokeStyle = "green";
          ctx.lineWidth = 2;
          ctx.strokeRect(x, y, width, height);

          // Draw labels and confidence
          ctx.font = "18px Arial";
          ctx.fillStyle = "red";
          ctx.fillText(
            `${prediction.class} (${confidence}%)`,
            x,
            y > 20 ? y - 10 : y + 20
          );
        });

        // Call the next frame
        requestAnimationFrame(() => detectFrame(video, canvas, ctx));
      });
    }
  };

  return (
    <div>
      <h1>Upload a Video File for Helmet Detection</h1>
      <input type="file" accept="video/*" onChange={handleVideoUpload} />
      <video ref={videoRef} width="640" height="480" controls />
      <canvas ref={canvasRef} width="640" height="480" />
    </div>
  );
};

export default Uploader;
