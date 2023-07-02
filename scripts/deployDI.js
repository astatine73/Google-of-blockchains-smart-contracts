//imports
const {ethers} = require("hardhat");

//async function
async function main(){
  const DecentralizedIndexingFactory = await ethers.getContractFactory("DecentralizedIndexing");
  console.log("Deploying contract...");
  const decentralizedIndexing = await DecentralizedIndexingFactory.deploy();
  await decentralizedIndexing.waitForDeployment();
  const address = await decentralizedIndexing.getAddress();
  console.log(`Contract Address: ${address}`);
}

//main
main().then(()=>process.exit(0)).catch((error)=>{
  console.error(error);
  process.exit(1);
});