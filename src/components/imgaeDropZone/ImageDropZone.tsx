import React, { Component } from "react";
import { DropzoneArea, DropzoneAreaBase } from "mui-file-dropzone";
import "./ImageDropZone.css"
export const ImageDropZone = () => {
    return (
        <DropzoneArea dropzoneClass="dropzone" acceptedFiles={['image/*']} dropzoneText={"Drag and drop an image here or click"} onChange={(files) => console.log('Files:', files)} fileObjects={[]} />
    )
}
