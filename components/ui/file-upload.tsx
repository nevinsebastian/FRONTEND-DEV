import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";

interface FileUploadProps {
  accept?: string; // Add 'accept' to props
  multiple?: boolean; // Allow multiple file uploads
  onChange?: (files: File[]) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  accept = "*",
  multiple = true,
  onChange,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (newFiles: File[]) => {
    setFiles((prevFiles) =>
      multiple ? [...prevFiles, ...newFiles] : newFiles
    );
    onChange?.(newFiles);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple,
    accept,
    onDrop: handleFileChange,
  });

  return (
    <div {...getRootProps()} className="w-full">
      <motion.div
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        className="p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />
        <div className="flex flex-col items-center justify-center">
          <IconUpload className="h-8 w-8 text-gray-500" />
          <p className="text-gray-700">
            Drag and drop files or click to upload
          </p>
        </div>
        {files.length > 0 && (
          <div className="mt-4">
            {files.map((file, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center p-2 border-b"
              >
                <span>{file.name}</span>
                <span>{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};
