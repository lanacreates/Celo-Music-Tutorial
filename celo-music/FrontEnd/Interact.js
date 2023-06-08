// Load environment variables
require('dotenv').config();

// Import dependencies
const Web3 = require('web3');
const ContractKit = require('@celo/contractkit');
const MusicStream = require('../build/contracts/MusicStream.json');
const IPFS = require('ipfs-http-client');

// Set up Celo connection and IPFS client
const web3 = new Web3(process.env.CELO_RPC_URL);
const kit = ContractKit.newKitFromWeb3(web3);
const ipfs = IPFS.create({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' });

// Connect to our MusicStream contract
const connectToContract = async () => {
    const accounts = await web3.eth.getAccounts();
    const musicStreamContract = new web3.eth.Contract(MusicStream.abi, process.env.CONTRACT_ADDRESS);

    return {
        contract: musicStreamContract,
        defaultAccount: accounts[0]
    };
};

// Function to create a new track
const createTrack = async (name, artist, musicFile) => {
    const { contract, defaultAccount } = await connectToContract();

    console.log('Uploading file to IPFS...');
    const ipfsHash = await addToIPFS(musicFile);
    console.log('File uploaded, IPFS Hash:', ipfsHash);

    const createTrackResult = await contract.methods.createTrack(name, artist, ipfsHash).send({ from: defaultAccount });

    console.log('Track created with ID:', createTrackResult.events.TrackCreated.returnValues.id);
};

// Function to get track details
const getTrack = async (id) => {
    const { contract } = await connectToContract();

    const track = await contract.methods.getTrack(id).call();

    console.log(`Track ${id}:`, track);
};

// Function to add file to IPFS
const addToIPFS = async (file) => {
    const { path } = await ipfs.add(file);
    return path;
};

module.exports = { createTrack, getTrack };
