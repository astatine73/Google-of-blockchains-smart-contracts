//imports
const {ethers,run,network,getAddress} = require("hardhat");

//async function
async function main(){
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying contract...");
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.waitForDeployment();
  const address = await simpleStorage.getAddress();
  console.log(`Contract Address: ${address}`);
  //checking if the hardhat is not available then deploye it on sepolia
  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for block confirmations...");
    //await simpleStorage.deployTransaction.wait(6);
    //await simpleStorage.deploymentTransaction().wait(2);
    //await simpleStorage.deployTransaction.wait(6)
    // const deploymentPromise = simpleStorage.deploy();
    // const deployedContract = await deploymentPromise;
    // await deployedContract.wait(6);
    await simpleStorage.deploymentTransaction().wait(60);

    await verify(simpleStorage.address, [])
  }

  const currentValue = await simpleStorage.retrieve();
  console.log(`Current Value is: ${currentValue}`);

  // Update the current value
  const transactionResponse = await simpleStorage.store(7);
  await transactionResponse.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log(`Updated Value is: ${updatedValue}`);


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