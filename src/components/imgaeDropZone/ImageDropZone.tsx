import React, { Component } from "react";
import { DropzoneArea, DropzoneAreaBase } from "mui-file-dropzone";
import "./ImageDropZone.css"

interface ImageDropZoneProps {
    onDrop: (files: File[]) => void;
}

export const ImageDropZone: React.FC<ImageDropZoneProps> = ({ onDrop }) => {
    return (
        <DropzoneArea
            fileObjects={[]}
            onChange={(files) => onDrop(files)}
            dropzoneClass="dropzone"
            // showPreviews
            showPreviewsInDropzone
            previewText="Selected files"
            filesLimit={5}
            dropzoneText="Drag and drop an image here or click"
        />
    );
};
