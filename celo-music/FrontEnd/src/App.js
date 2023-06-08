
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UploadForm from './UploadForm';
import TrackList from './TrackList';

const App = () => {
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
      const gatherTracks = async () => {
          try {
              const response = await axios.get('/api/tracks');
              setTracks(response.data);
          } catch (err) {
              console.error(err);
          }
      };
      gatherTracks();
  }, []);
  

    const manageUpload = async (name, artist, ipfsHash) => {
        const response = await axios.post('/api/tracks', { name, artist, ipfsHash });
        setTracks((prevTracks) => [...prevTracks, response.data]);
    };

    return (
        <div>
            <UploadForm onUpload={manageUpload} />
            <TrackList tracks={tracks} />
        </div>
    );
};

export default App;
