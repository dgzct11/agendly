'use client'
import { useRef, useState } from "react";


export default function Upload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  const handleClick = () => {
    if (fileInputRef.current){
      fileInputRef.current.click();
    }
    else{
      console.error("File input ref is null");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    console.log(selectedFile)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
    console.log("Drag over")
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];
    
    // Check if the dropped file is a PDF
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  return (
    <div className="flex flex-col gap-28 w-screen h-screen bg-gradient-to-br from-gray-100 to-gray-300 items-center overflow-hidden">
      <div className="flex flex-col mt-10 h-40 w-5/6">
        <h1 className="text-3xl font-bold items-center mt-auto ml-auto mr-auto text-gray-600">
          Turn .PDF Files to .ISC Files
        </h1>
        <h3 className="text-xl text-gray-700 opacity-50 ml-auto mr-auto">
          or open with Google Calendar
        </h3>
        
      </div>
      <div 
        className={`items-center shadow-lg flex h-1/2 w-4/6 max-w-3/6 rounded-sm border border-opacity-75 border-4 border-gray-500 border-solid ${dragging ? 'bg-gray-300' : 'bg-gray-200'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}>
        <div className="m-auto">
          <button className="bg-blue-400 hover:bg-blue-500 shadow-md rounded-xl pt-8 pb-8 pl-16 pr-16" 
          onClick={handleClick}>
            Upload PDF Files
          </button>
          <p className="text-center text-sm text-blue-900 opacity-50">
            or drop PDFs here
          </p>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden">
          </input>
        </div>
      </div>
    </div>
  )
}
