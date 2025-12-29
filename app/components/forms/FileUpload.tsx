"use client";

import React, { useRef, useState } from "react";
import { Button } from "../ui/Button";

export interface FileUploadProps {
  label?: string;
  error?: string;
  helperText?: string;
  accept?: string;
  maxSize?: number;
  onFileSelect: (file: File | null) => void;
}

export function FileUpload({
  label,
  error,
  helperText,
  accept = ".html",
  maxSize = 10 * 1024 * 1024,
  onFileSelect,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const validateFile = (file: File): string | null => {
    if (maxSize && file.size > maxSize) {
      return `File size exceeds ${(maxSize / (1024 * 1024)).toFixed(0)}MB limit`;
    }
    if (accept && !accept.split(",").some((type) => file.name.endsWith(type.trim()))) {
      return `File type must be: ${accept}`;
    }
    return null;
  };

  const handleFileChange = (file: File | null) => {
    setFileError(null);
    
    if (file) {
      const validationError = validateFile(file);
      if (validationError) {
        setFileError(validationError);
        setSelectedFile(null);
        onFileSelect(null);
        return;
      }
    }

    setSelectedFile(file);
    onFileSelect(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFileChange(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleClear = () => {
    handleFileChange(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const displayError = error || fileError;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative flex min-h-[180px] w-full flex-col items-center justify-center rounded-lg border-2 border-dashed
          transition-colors duration-150
          ${isDragging ? "border-primary bg-primary/5" : "border-border bg-muted/30"}
          ${displayError ? "border-danger" : ""}
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="absolute inset-0 cursor-pointer opacity-0"
          aria-label="File upload"
        />
        <div className="flex flex-col items-center gap-3 text-center px-4">
          <svg
            className="h-10 w-10 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          {selectedFile ? (
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-foreground">
                {selectedFile.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {(selectedFile.size / 1024).toFixed(1)} KB
              </p>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
                className="mt-1"
              >
                Remove
              </Button>
            </div>
          ) : (
            <>
              <p className="text-sm text-foreground">
                <span className="font-medium text-primary">Click to upload</span> or
                drag and drop
              </p>
              <p className="text-xs text-muted-foreground">
                {accept.toUpperCase()} files up to{" "}
                {(maxSize / (1024 * 1024)).toFixed(0)}MB
              </p>
            </>
          )}
        </div>
      </div>
      {(displayError || helperText) && (
        <p
          className={`text-sm ${
            displayError ? "text-danger" : "text-muted-foreground"
          }`}
        >
          {displayError || helperText}
        </p>
      )}
    </div>
  );
}
