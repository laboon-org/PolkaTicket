const NTSTicket = artifacts.require("NTSTicket");

module.exports = function (deployer) {
  deployer.deploy(NTSTicket);
};
