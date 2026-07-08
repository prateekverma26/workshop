"use client";

import "./ui.css";
import { useId, useRef, useState } from "react";
import { Upload, CircleCheck, X } from "lucide-react";
import { Avatar } from "./Avatar";

interface FileUploadProps {
  label: string;
  onFileChange: (file: File | null) => void;
  isRequired?: boolean;
  accept?: string;
  maxBytes?: number;
}

const DEFAULT_MAX = 5 * 1024 * 1024; // 5MB

export function FileUpload({
  label,
  onFileChange,
  isRequired,
  accept = "image/jpeg,image/png",
  maxBytes = DEFAULT_MAX,
}: FileUploadProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  function accept_file(file: File) {
    if (!accept.split(",").includes(file.type)) {
      setError("Only JPEG or PNG images are accepted.");
      return;
    }
    if (file.size > maxBytes) {
      setError("File must be 5MB or smaller.");
      return;
    }
    setError(null);
    setFileName(file.name);
    setPreview(URL.createObjectURL(file));
    onFileChange(file);
  }

  function clear() {
    setPreview(null);
    setFileName(null);
    setError(null);
    onFileChange(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="field">
      <span className="field__label" id={`${inputId}-label`}>
        {label}
        {isRequired ? <span className="field__required" aria-hidden="true">*</span> : null}
      </span>

      {preview ? (
        <div className="upload__preview">
          <Avatar src={preview} alt="Uploaded ID photo preview" size="md" />
          <div>
            <span className="upload__received">
              <CircleCheck size={14} aria-hidden="true" /> Photo received
            </span>
            <p className="field__hint">{fileName}</p>
          </div>
          <button
            type="button"
            className="btn btn--ghost btn--sm"
            onClick={clear}
            aria-label="Remove uploaded photo"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>
      ) : (
        <label
          htmlFor={inputId}
          className={`upload ${isDragging ? "upload--dragover" : ""} ${
            error ? "upload--error" : ""
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            const file = e.dataTransfer.files[0];
            if (file) accept_file(file);
          }}
        >
          <Upload size={24} strokeWidth={1.5} aria-hidden="true" />
          <span>Tap to upload or take a photo</span>
          <span className="upload__hint">JPEG or PNG, max 5MB</span>
        </label>
      )}

      <input
        ref={inputRef}
        id={inputId}
        type="file"
        className="visually-hidden"
        accept={accept}
        capture="environment"
        aria-labelledby={`${inputId}-label`}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) accept_file(file);
        }}
      />

      {error ? (
        <span className="field__error" role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}
