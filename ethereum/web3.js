import Web3 from "web3";

let web3;

// We are in the browser and metamask is running
if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  // Overriding the current metamask versions
  web3 = new Web3(window.web3.currentProvider);
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/3cf83b73bf7a4ab29a3f6676c821167c"
  );
  web3 = new Web3(provider);
}

export default web3;
