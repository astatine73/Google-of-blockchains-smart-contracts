//imports
const {ethers,run,network,getAddress} = require("hardhat");

//async function
async function main(){
  const PaymentCollectionFactory = await ethers.getContractFactory("PaymentCollection");
  console.log("Deploying contract...");
  const paymentCollection = await PaymentCollectionFactory.deploy();
  await paymentCollection.waitForDeployment();
  const address = await paymentCollection.getAddress();
  console.log(`Contract Address: ${address}`);

  //checking if the hardhat is not available then deploye it on sepolia
  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for block confirmations...");
    await paymentCollection.deployTransaction.wait(6);

    await verify(paymentCollection.address, [])
  }

}

const verify = async (contractAddress, args) => {
  console.log("Verifying contract...")
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!")
    } else {
      console.log(e)
    }
  }
}


//main
main().then(()=>process.exit(0)).catch((error)=>{
  console.error(error);
  process.exit(1);
});