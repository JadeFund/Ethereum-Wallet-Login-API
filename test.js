
/*$scope.generateSignedMsg = function() {
    try {
        var thisMessage = $scope.signMsg.message;
        var hwType = $scope.wallet.getHWType();

        // Sign via MetaMask
        if (typeof hwType != "undefined" && hwType == "web3") {

            var msg = ethUtil.bufferToHex(new Buffer(thisMessage,'utf8'));
            var signingAddr = web3.eth.accounts[0];
            var params = [msg, signingAddr];
            var method = 'personal_sign';
            $scope.notifier.info("Sent message for signing via MetaMask / Mist.");

            web3.currentProvider.sendAsync({
                method: method,
                params: params,
                signingAddr: signingAddr
            }, function(err, result) {
                if (err)
                    return $scope.notifier.danger(err);
                if (result.error)
                    return $scope.notifier.danger(result.error);
                $scope.signMsg.signedMsg = JSON.stringify({
                    address: signingAddr,
                    msg: thisMessage,
                    sig: result.result,
                    version: '3',
                    signer: 'web3'
                }, null, 2);
                $scope.notifier.success('Successfully Signed Message with ' + signingAddr);
            });

            // Sign via Ledger
        } else if (typeof hwType != "undefined" && hwType == "ledger") {
            var msg = Buffer.from(thisMessage).toString("hex");
            var app = new ledgerEth($scope.wallet.getHWTransport());
            var localCallback = function localCallback(signed, error) {
                if (typeof error != "undefined") {
                    error = error.errorCode ? u2f.getErrorByCode(error.errorCode) : error;
                    if (callback !== undefined)
                        callback({
                            isError: true,
                            error: error
                        });
                    return;
                }
                var combined = signed['r'] + signed['s'] + signed['v'];
                var combinedHex = combined.toString('hex');
                var signingAddr = $scope.wallet.getAddressString();
                $scope.signMsg.signedMsg = JSON.stringify({
                    address: $scope.wallet.getAddressString(),
                    msg: thisMessage,
                    sig: '0x' + combinedHex,
                    version: '3',
                    signer: 'ledger'
                }, null, 2);
                $scope.notifier.success('Successfully Signed Message with ' + signingAddr);
            };
            app.signPersonalMessage_async($scope.wallet.getPath(), msg, localCallback);

            // Sign via Digital Bitbox
        } else if (typeof hwType != "undefined" && hwType == "digitalBitbox") {
            var msg = ethUtil.hashPersonalMessage(ethUtil.toBuffer(thisMessage));
            var localCallback = function localCallback(signed, error) {
                if (typeof error != "undefined") {
                    error = error.errorCode ? u2f.getErrorByCode(error.errorCode) : error;
                    $scope.notifier.danger(error);
                    return;
                }
                var combined = signed['r'] + signed['s'] + signed['v'];
                var combinedHex = combined.toString('hex');
                var signingAddr = $scope.wallet.getAddressString();
                $scope.signMsg.signedMsg = JSON.stringify({
                    address: $scope.wallet.getAddressString(),
                    msg: thisMessage,
                    sig: '0x' + combinedHex,
                    version: '3',
                    signer: 'digitalBitbox'
                }, null, 2);
                $scope.notifier.success('Successfully Signed Message with ' + signingAddr);
            };
            $scope.notifier.info("Touch the LED for 3 seconds to sign the message. Or tap the LED to cancel.");
            var app = new DigitalBitboxEth($scope.wallet.getHWTransport(),'');
            app.signMessage($scope.wallet.getPath(), msg, localCallback);

            // Sign via Secalot
        } else if (typeof hwType != "undefined" && hwType == "secalot") {

            var localCallback = function localCallback(signed, error) {
                if (typeof error != "undefined") {
                    error = error.errorCode ? u2f.getErrorByCode(error.errorCode) : error;
                    $scope.notifier.danger(error);
                    return;
                }
                var combined = signed['r'] + signed['s'] + signed['v'];
                var combinedHex = combined.toString('hex');
                var signingAddr = $scope.wallet.getAddressString();
                $scope.signMsg.signedMsg = JSON.stringify({
                    address: $scope.wallet.getAddressString(),
                    msg: thisMessage,
                    sig: '0x' + combinedHex,
                    version: '3',
                    signer: 'secalot'
                }, null, 2);
                $scope.notifier.success('Successfully Signed Message with ' + signingAddr);
            };
            $scope.notifier.info("Tap a touch button on your device to confirm signing.");
            var app = new SecalotEth($scope.wallet.getHWTransport());
            app.signMessage($scope.wallet.getPath(), thisMessage, localCallback);

            // Sign via trezor
        } else if (typeof hwType != "undefined" && hwType == "trezor") {
            TrezorConnect.ethereumSignMessage($scope.wallet.getPath(), thisMessage, function(response) {
                if (response.success) {
                    $scope.signMsg.signedMsg = JSON.stringify({
                        address: '0x' + response.address,
                        msg: thisMessage,
                        sig: '0x' + response.signature,
                        version: '3',
                        signer: 'trezor'
                    }, null, 2);
                    $scope.notifier.success('Successfully Signed Message with ' + $scope.wallet.getAddressString());
                } else {
                    $scope.notifier.danger(response.error);
                }
            });

            // Sign via PK
        } else {
*/
var ethUtil = require('ethereumjs-util');




            var privateKey = "5ebc6c5b74092fc0f07e73c1111f34201a133123e7c43e0ac2c3eb72b8f5b8bc";

            var msg = "Hello";
            var signed = ethUtil.ecsign(ethUtil.hashPersonalMessage(ethUtil.toBuffer(msg)), new Buffer(privateKey, "hex"));

            var combined = Buffer.concat([Buffer.from(signed.r), Buffer.from(signed.s), Buffer.from([signed.v])]);
            var signature = "0x" + combined.toString('hex');
            var address = ethUtil.privateToAddress(privateKey);


            console.log(signature);





/*




        }
    } catch (e) {
        $scope.notifier.danger(e);
    }
}
*/
