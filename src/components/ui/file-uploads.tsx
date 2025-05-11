"use client";

import Image from "next/image";
import React, { useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface FileWithPreview extends File {
  preview: string;
}

interface FileUploadProps {
  files: FileWithPreview[];
  onFilesChange: (files: File[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
  acceptMimeTypes?: string[];
  label?: string;
  error?: string | null;
}

const DEFAULT_ACCEPT = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
];

export function FileUpload({
  files,
  onFilesChange,
  maxFiles = 5,
  maxSizeMB = 2,
  acceptMimeTypes = DEFAULT_ACCEPT,
  label = "Upload Files",
  error = null,
}: FileUploadProps) {
  // Clean up previews on unmount or files change
  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Combine existing files and new files, limit maxFiles
      const combinedFiles = [...files, ...acceptedFiles].slice(0, maxFiles);

      // Add preview URLs for new files
      const filesWithPreview: FileWithPreview[] = combinedFiles.map((file) => {
        if ("preview" in file) return file as FileWithPreview;
        return Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
      });

      onFilesChange(filesWithPreview);
    },
    [files, maxFiles, onFilesChange],
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    open: openFileDialog,
  } = useDropzone({
    onDrop,
    accept: acceptMimeTypes.reduce(
      (acc, type) => {
        acc[type] = [];
        return acc;
      },
      {} as Record<string, string[]>,
    ),
    maxSize: maxSizeMB * 1024 * 1024,
    noClick: true,
    noKeyboard: true,
  });

  function removeFile(index: number) {
    const newFiles = files.filter((_, i) => i !== index);
    onFilesChange(newFiles);
  }

  return (
    <div>
      <label className="mb-2 block font-medium">{label}</label>
      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-md border-2 border-dashed p-6 text-center transition-colors ${
          isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-sm text-gray-500">
          Drag & drop files here, or{" "}
          <button
            type="button"
            onClick={openFileDialog}
            className="text-blue-600 underline"
          >
            browse files
          </button>
          <br />
          (Max {maxFiles} files, each &lt; {maxSizeMB}MB, allowed types:{" "}
          {acceptMimeTypes.join(", ")})
        </p>
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

      {files.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-4">
          {files.map((file, index) => (
            <div
              key={file.name + index}
              className="relative rounded-md border p-1"
            >
              {file.type.startsWith("image/") ? (
                <Image
                  src={file.preview}
                  alt={file.name}
                  width={80}
                  height={80}
                  className="h-24 w-full rounded object-contain"
                />
              ) : (
                <div className="flex h-24 w-full items-center justify-center rounded bg-gray-100 text-gray-500">
                  {file.name}
                </div>
              )}
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute right-1 top-1 rounded bg-red-600 px-1 text-xs text-white hover:bg-red-700"
                aria-label={`Remove file ${file.name}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
