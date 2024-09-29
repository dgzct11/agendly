'use client'
import { useRef, useState } from "react";
import { PDFDocumentProxy, getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import mammoth from 'mammoth'; // Import mammoth
import { useRouter } from "next/navigation";
import { LOCAL_STORAGE_KEY } from "@/lib/constants";

// Set the workerSrc to the PDF.js worker file
GlobalWorkerOptions.workerSrc = "./pdf.worker.mjs";


export default function Upload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [pdfText, setPdfText] = useState<string>('');
  const router = useRouter();

  const handleClick = () => {
    if (fileInputRef.current){
      fileInputRef.current.click();
    }
    else{
      console.error("File input ref is null");
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    let text = '';

    
    if (file.type === 'application/pdf') {
      text = await extractTextFromPDF(file);
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      text = await extractTextFromDOCX(file);
    }

    setPdfText(text);
    localStorage.setItem(LOCAL_STORAGE_KEY, text);
    router.push("/results")
  }

  const extractTextFromPDF = async (file: File): Promise<string> => {
    const pdfData = await file.arrayBuffer();
    const loadingTask = getDocument({ data: pdfData });
    const pdf: PDFDocumentProxy = await loadingTask.promise;
  
    let textContent = '';
  
    // Iterate over each page of the PDF
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
  
      // Extract text content from the page
      const pageText = content.items.map((item: any) => item.str).join(' ');
      textContent += `${pageText}\n`;  // Add text from each page to the final string
    }
  
    return textContent;  // Return the final extracted text
  };

  const extractTextFromDOCX = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const { value } = await mammoth.extractRawText({ arrayBuffer });
    return value; // The extracted text
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];
    let text = '';

    if (file.type === 'application/pdf') {
      text = await extractTextFromPDF(file);
      setPdfText(text);
      localStorage.setItem(LOCAL_STORAGE_KEY, text);
      router.push("/results")
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      text = await extractTextFromDOCX(file);
      setPdfText(text);
      localStorage.setItem(LOCAL_STORAGE_KEY, text);
      router.push("/results")
    }
  };

  return (
    <div className="flex flex-col pt-12 gap-20 w-min-screen w-max-full h-screen bg-gradient-to-br from-white to-gray-100 items-center overflow-hidden">
      <div className="flex flex-col h-16 w-5/6">
        <h1 className="text-3xl font-bold items-center mt-auto ml-auto mr-auto text-gray-700">
          Turn .PDF, .DOCX Files to .ISC Files
        </h1>
        <h3 className="text-xl text-gray-700 opacity-50 ml-auto mr-auto">
          or open with Google Calendar
        </h3>
        
      </div>
      <div 
        className={`items-center shadow-lg flex h-1/2 w-4/6 max-w-3/6 rounded-sm border border-opacity-75 border-4 border-gray-800 border-dotted ${dragging ? 'bg-blue-100' : 'bg-gray-200'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}>
        <div className="m-auto">
          <button className="bg-blue-400 hover:bg-blue-500 shadow-md rounded-xl pt-8 pb-8 pl-16 pr-16" 
          onClick={handleClick}>
            Upload .PDF, .DOCX Files
          </button>
          <p className="text-center text-sm text-blue-900 opacity-70">
            or drop files here
          </p>
          <input type="file" accept=".pdf, .docx" ref={fileInputRef} onChange={handleFileChange} className="hidden">
          </input>
        </div>
      </div>
    </div>
  )
}
