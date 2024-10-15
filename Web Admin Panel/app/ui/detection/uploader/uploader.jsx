"use client";
import axios from "axios";
import { useState } from "react";
import styles from "./uploader.module.css";

const Uploader = () => {
  const [imageFile, setImageFile] = useState(null);
  const [result, setResult] = useState(null);
  const [violations, setViolations] = useState([]);
  const [annotatedImage, setAnnotatedImage] = useState(null);
  const [loading, setLoading] = useState(false); // State to track loading

  const handleFileChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", imageFile);

    setLoading(true); // Set loading to true when detecting violations

    try {
      const response = await axios.post(
        "http://localhost:5000/detect",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Check if the necessary data is in the response
      if (response.data && response.data.data) {
        const predictions = response.data.data.predictions || [];
        const filteredViolations = predictions.filter(
          (prediction) => prediction.class === "Without Helmet"
        );
        setResult(response.data.data);
        setViolations(filteredViolations);

        // Ensure image is correctly formatted for display
        if (response.data.image) {
          setAnnotatedImage(`data:image/jpeg;base64,${response.data.image}`);
        } else {
          console.error("No image found in response:", response.data);
          setAnnotatedImage(null);
        }
      } else {
        console.error("No data found in response:", response.data);
        setResult(null);
        setViolations([]);
        setAnnotatedImage(null);
      }
    } catch (error) {
      console.error("Error detecting violations:", error);
    } finally {
      setLoading(false); // Set loading to false after request completes
    }
  };

  const handleReset = () => {
    setImageFile(null);
    setResult(null);
    setViolations([]);
    setAnnotatedImage(null);
    setLoading(false); // Reset loading state
  };

  const isImageOrVideo = (file) => {
    const fileType = file?.type;
    return fileType?.startsWith("image/") || fileType?.startsWith("video/");
  };

  return (
    <div className={styles.container}>
      {/* Upload Card */}
      <div className={styles.uploadCard}>
        <h2 className={styles.h2}>Upload Image or Video</h2>
        {!imageFile ? (
          <div className={styles.placeholder}>
            <p>
              Please select an image or video to upload for violation detection.
            </p>
          </div>
        ) : (
          <>
            <p>File selected: {imageFile.name}</p>
            <div className={styles.mediaContainer}>
              {isImageOrVideo(imageFile) &&
                (imageFile.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(imageFile)}
                    alt="Uploaded media"
                    className={styles.previewMedia}
                  />
                ) : (
                  <video
                    src={URL.createObjectURL(imageFile)}
                    controls
                    className={styles.previewMedia}
                  />
                ))}
            </div>
          </>
        )}
        <form onSubmit={handleSubmit} className={styles.formContainer}>
        <input type="file"  onChange={handleFileChange} />
    <div className={styles.inputContainer}>
        
        <div className={styles.buttonContainer}>
            <button className={styles.button} type="submit" disabled={loading}>
                {loading ? 'Detecting...' : 'Detect Violations'}
            </button>
            <button type="button" className={styles.button} onClick={handleReset}>
                Reset
            </button>
        </div>
    </div>
</form>


      </div>

      {/* Result Card */}
      <div className={styles.resultCard}>
        <h2 className={styles.h2}>Detection Results</h2>
        {!result ? (
          <div className={styles.placeholder}>
            <p>
              Results will be displayed here after the detection is complete.
            </p>
          </div>
        ) : (
          <>
            {violations.length > 0 ? (
              <div className={styles.results}>
                <h3>Violation Detected</h3>
                <p>Persons without helmet: {violations.length}</p>
                {/* Display the annotated image on the left side */}
                {annotatedImage && (
                  <img
                    src={annotatedImage}
                    alt="Annotated image"
                    className={styles.annotatedImage}
                  />
                )}
              </div>
            ) : (
              <p>No violations detected.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Uploader;
