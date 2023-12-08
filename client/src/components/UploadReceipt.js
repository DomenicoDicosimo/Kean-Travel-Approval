import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from "./NavBar";
import { useUser } from '@clerk/clerk-react';
 
const UploadReceipt = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const { user } = useUser();
    const [receipts, setReceipts] = useState([]);

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

        if(user) {
            formData.append('user_id', user.id);
        }

        try {
            await axios.post('http://localhost:5000/upload_receipt', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('File uploaded successfully');

        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file')
        }
    };

    const renderReceipt = (receipt) => {
        const fileExtension = receipt.file_path.split('.').pop().toLowerCase();
        const filename = receipt.file_path.split('\\').pop();
        if(['jpg', 'jpeg', 'png'].includes(fileExtension)) {
            return <img src={receipt.file_path} alt={`Receipt ${receipt.id}`} />;
        } 
        else if (fileExtension === 'pdf') {
            return <a href={`http://localhost:5000/uploads/${filename}`} target="_blank" rel="noopener noreferrer">View PDF</a>;
        }
        else {
            return <span>Unsupported file format</span>;
        }
    };

    const fetchReceipts = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/get_receipts?user_id=${user.id}`);
            console.log(response.data.receipts);
            setReceipts(response.data.receipts);
        }
        catch (error){
            console.error('Error fecthing receipts:', error);
        }
    };

    useEffect(() => {
        if(user) { 
            fetchReceipts();
        }
       
    }, [user]);


    return (
        <div>
            <NavBar />
            <div className="upload-receipt-container">
                <h1>Upload Receipt</h1>
                <form onSubmit={handleSubmit}>
                    <input type="file" onChange={handleFileChange} />
                    <button type="submit">Upload</button>
                </form>

                <div>
                    <h2>Uploaded Receipts</h2>
                    <ul>
                        {receipts.map(receipt => (
                            <li key={receipt.id}>
                            {renderReceipt(receipt)}
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default UploadReceipt;
