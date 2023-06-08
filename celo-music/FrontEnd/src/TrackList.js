
import React from 'react';

const TrackList = ({ tracks }) => {
    return (
        <div>
            {tracks.map((track) => (
                <div key={track.id}>
                    <h2>{track.name}</h2>
                    <h3>by {track.artist}</h3>
                    <audio controls>
                        <source src={`https://ipfs.infura.io/ipfs/${track.ipfsHash}`} type="audio/mpeg" />
                    </audio>
                </div>
            ))}
        </div>
    );
};

export default TrackList;
