import React, { useState } from 'react';
import { Upload as UploadIcon, File, CheckCircle } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { dataService } from '../services/dataService';
import { useToast } from '../contexts/ToastContext';

function Upload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const { success, error } = useToast();
  const [uploadLocked, setUploadLocked] = useState(false);


  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (selectedFile) => {
    // Validate file type
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
      'text/csv' // .csv
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      error('Please select a valid .xlsx or .csv file');
      return;
    }

    // Validate file size (max 10MB)
    if (selectedFile.size > 40 * 1024 * 1024) {
      error('File size must be less than 10MB');
      return;
    }

    setFile(selectedFile);
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
  if (!file) {
    error('Please select a file first');
    return;
  }

  setUploading(true);

  try {
    // Call your dataService API
    const result = await dataService.uploadFile(file);

    // Set preview and show success toast
    setPreview(result);
    success(`File uploaded successfully! ${result.rowCount} records processed.`);
    setUploadLocked(true); 
  } catch (err) {
    console.error(err);
    error(err.message || 'Upload failed. Please try again.');
  } finally {
    setUploading(false);
  }
};


  const handleCancel = () => {
    setFile(null);
    setPreview(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Upload Data</h1>
        <p className="text-gray-600">Import customer and contract data for analysis</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Upload Area */}
<Card title="File Upload" className="h-fit">
  <div
    className={`
      relative border-2 border-dashed rounded-lg p-6 text-center transition-colors
      ${dragActive 
        ? 'border-accent bg-accent bg-opacity-5' 
        : 'border-gray-300 hover:border-gray-400'
      }
      ${uploadLocked ? 'opacity-50 pointer-events-none' : ''}
    `}
    onDragEnter={handleDrag}
    onDragLeave={handleDrag}
    onDragOver={handleDrag}
    onDrop={handleDrop}
  >
    <input
      type="file"
      accept=".xlsx,.csv"
      onChange={handleFileInput}
      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      disabled={uploadLocked} // 🔒 disable file input
    />

    <UploadIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />

    {file ? (
      <div className="space-y-2">
        <div className="flex items-center justify-center">
          <File className="w-5 h-5 mr-2 text-accent" />
          <span className="text-sm font-medium text-gray-900">{file.name}</span>
        </div>
        <p className="text-xs text-gray-500">
          Size: {(file.size / 1024 / 1024).toFixed(2)} MB
        </p>
      </div>
    ) : (
      <div className="space-y-2">
        <p className="text-lg font-medium text-gray-900">
          Drop your file here, or <span className="text-accent">browse</span>
        </p>
        <p className="text-sm text-gray-500">
          Supports .xlsx and .csv files up to 10MB
        </p>
      </div>
    )}
  </div>

  {file && !uploadLocked && ( // hide buttons once locked
    <div className="flex mt-6 space-x-3">
      <Button 
        onClick={handleUpload} 
        loading={uploading}
        disabled={uploading}
        className="flex-1"
      >
        Upload File
      </Button>
      <Button 
        variant="secondary" 
        onClick={handleCancel}
        disabled={uploading}
      >
        Cancel
      </Button>
       <Button
           variant="danger" >
            Remove Uploaded Data !
       </Button>
      
    </div>
  )}

  {uploadLocked && ( // show lock message
    <p className="mt-4 text-sm text-center text-red-500">
      🔒 Upload locked. You cannot upload another file.
    </p>
  )}
</Card>

 

        {/* Upload Guidelines */}
        <Card title="Upload Guidelines">
          <div className="space-y-4">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Supported Formats</p>
                <p className="text-sm text-gray-600">Excel (.xlsx) and CSV (.csv) files</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">File Size Limit</p>
                <p className="text-sm text-gray-600">Maximum 10MB per file</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Required Columns</p>
                <p className="text-sm text-gray-600">PRODUCT_CODE, CONTRACT_NO, CUSTOMER_ID are required</p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Data Quality</p>
                <p className="text-sm text-gray-600">Ensure data is clean and properly formatted</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Preview Table */}
      {preview && (
        <Card title="Data Preview" subtitle={`Showing first 10 rows of ${preview.rowCount} total records`}>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {preview.preview.length > 0 && Object.keys(preview.preview[0]).map((header) => (
                    <th key={header} className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {preview.preview.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((cell, cellIndex) => (
                      <td key={cellIndex} className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}

export default Upload;