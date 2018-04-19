
var ethUtil = require("ethereumjs-util");

/*
var sgn = "Hola"; //signature hash
var msg = "0x221870d3802540242ba62403747e3f85331b75c1fe821784f16f807ca38d8db8353453e92b97f284bee58b78e28fa6822a4016ee27b00835290aa69f3ad9e4be1b"; // message

var r = utils.toBuffer(sgn.slice(0,66))
var s = utils.toBuffer('0x' + sgn.slice(66,130))
var v = utils.bufferToInt(utils.toBuffer('0x' + sgn.slice(130,132)))
var m = utils.toBuffer(msg)
var pub = utils.ecrecover(m, v, r, s)
var adr = '0x' + utils.pubToAddress(pub).toString('hex')

*/
var signature = "0xb2e3c3c7b1a02a4d4d06a86d8a51c1598eca66cf67c946fbd845f028d69cbdc963f02fdcdb7a263e894de4d62a53e9e68c496b3d918ec8c53bd12512c0d84bf21b";

var message = "gang";
var address = "0x857f270b33a9ee9240f77374ec681b81afdd499a";
if(check(signature, message, address)) {console.log("verified")} else{console.log("Not Verified")}

function getNakedAddress (address) {
    return address.toLowerCase().replace('0x', '');
};

function check(sgn, msg, adr){


            var sig = new Buffer(getNakedAddress(sgn), 'hex');


            if (sig.length != 65) return false;

            sig[64] = sig[64] == 0 || sig[64] == 1 ? sig[64] + 27 : sig[64];

            var hash = ethUtil.hashPersonalMessage(ethUtil.toBuffer(msg));


            var pubKey = ethUtil.ecrecover(hash, sig[64], sig.slice(0, 32), sig.slice(32, 64));

            if (getNakedAddress(adr) != ethUtil.pubToAddress(pubKey).toString('hex')) return false; else {
              return true;
            }
}
