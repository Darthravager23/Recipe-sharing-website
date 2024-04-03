"use client";
import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";
export default function ImagePicker({ label, imgName }) {
  const [pickedImage, setPickedImage] = useState(null);
  const imageInput = useRef();
  function handlePickClick() {
    imageInput.current.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];

    if (!file) {
      setPickedImage(null);
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }
  return (
    <div className={classes.picker}>
      <label htmlFor={imgName}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>no image is picked yet</p>}
          {pickedImage && (
            <Image src={pickedImage} alt='image selected by user' fill />
          )}
        </div>
        <input
          ref={imageInput}
          className={classes.input}
          type='file'
          id={imgName}
          accept='image/png, image/jpeg,image.jpg'
          name={imgName}
          onChange={handleImageChange}
          required
        />
        <button
          className={classes.button}
          type='button'
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
