
import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = ({ onUpload }) => {
    const [trackName, setTrackName] = useState('');
    const [artistName, setArtistName] = useState('');
    const [file, setFile] = useState();

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);
        const { data } = await axios.post('/api/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
        });
        onUpload(trackName, artistName, data.ipfsHash);
    };

    return (
        <form onSubmit={onSubmit}>
            <label>
                Track Name:
                <input type="text" value={trackName} onChange={(e) => setTrackName(e.target.value)} required />
            </label>
            <label>
                Artist Name:
                <input type="text" value={artistName} onChange={(e) => setArtistName(e.target.value)} required />
            </label>
            <label>
                File:
                <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
            </label>
            <button type="submit">Upload</button>
        </form>
    );
};

export default UploadForm;
