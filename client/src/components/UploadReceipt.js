import React, { useState } from 'react';
import axios from 'axios';
import NavBar from "./NavBar";

const UploadReceipt = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            alert('Please select a file to upload');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        
        // Add user_id or other necessary fields to formData if needed
        // formData.append('user_id', 'your_user_id');

        try {
            await axios.post('/upload_receipt', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            // Handle successful upload...
        } catch (error) {
            // Handle error...
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
            <NavBar />
            <div className="upload-receipt-container">
                <h1>Upload Receipt</h1>
                <form onSubmit={handleSubmit}>
                    <input type="file" onChange={handleFileChange} />
                    <button type="submit">Upload</button>
                </form>
            </div>
        </div>
    );
};

export default UploadReceipt;
