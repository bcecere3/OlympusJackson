//Initialize local storage variables that can be accessed across all pages
if(localStorage.getItem("hasStarted") == null){
  localStorage.setItem("hasStarted", "true");
  localStorage.setItem("items", JSON.stringify(["Vault room door code", "Rope"]));
  localStorage.setItem("visitedWalkway", "false");
  localStorage.setItem("hasHead", "false");
  localStorage.setItem("hasUrn", "false");
  localStorage.setItem("hasBev", "false");
  localStorage.setItem("unlockDoor", "false");
  localStorage.setItem("eyeScan", "false");
  localStorage.setItem("code", "false");
  localStorage.setItem("swings", "false");
}
