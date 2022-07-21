/**
 * Example of how to use a global logging function
 * 
 * //this is a function in the script
 * 
 * function test101() {
  try{
    let msg = "this is the message";
    aprmpt("what");
  }
  catch(err){
    let info={
      level:'warning',
      theMsg: 'This is what uap',
      error: err
    }
    logIt(info);

  }
}

//This is the global logging function

let logIt = (info)=>{
  let log = BBLog.getLog({
    sheetName:'Library Error Log',
    level:'FINEST', 
    sheetId:'1a2D1FoU_SOSRRxdqPyHy3ThVXZgEiFeAB89uPpTYk3k',
    displayUserId:'EMAIL_FULL'
    });
  log[info.level](info.theMsg);
  if(info.error){
    log.severe(info.error.stack)
  }
  
}
 */



