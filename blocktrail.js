blocktrail = require('blocktrail-sdk');

const key = "ec2430671b53955cab40508f0d497b8684d3858e";
const secret = "dcf4b0d77ad0ec1d27b8a256cb6d3d3c3aca9100";

//create address
client.address('', function(err, address){
    console.log(address.balance);
});

//Get latest block Hash
client.blockLatest(function(err, block){
    console.log(block.hash);
});


client.blocktrail.BlocktrailSDK({
    apiKey: key,
    apiSecret: secret,
    network: "BTC",
    testnet: false
});

//Create Wallet
client.createNewWallet("mywallet", "mypassword", 
    function(err, wallet, backupInfo){
    console.log(wallet);
    console.log("-------");
    console.log(backupInfo);
});

//Initialize Wallet
client.initWallet("mywallet", "mypassword", function(err, wallet){
    // console.log(wallet);
    wallet.getNewAddress(function(){
        console.log(address);
    });
});