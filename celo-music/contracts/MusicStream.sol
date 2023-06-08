// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MusicStream {
    struct Track {
        uint256 id;
        string name;
        string artist;
        string ipfsHash;
    }

    mapping(uint256 => Track) public tracks;
    uint256 public nextTrackId = 1;

    function createTrack(string calldata name, string calldata artist, string calldata ipfsHash) public {
        tracks[nextTrackId] = Track(nextTrackId, name, artist, ipfsHash);
        nextTrackId++;
    }

    function getTrack(uint256 id) public view returns (uint256, string memory, string memory, string memory) {
        Track storage track = tracks[id];
        return (track.id, track.name, track.artist, track.ipfsHash);
    }
}
