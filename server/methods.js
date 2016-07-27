var exec = Npm.require("child_process").exec;
var WORKING_DIR = "../../../../../.uploads/";

Meteor.methods({
  'deleteFile': function(_id) {
    check(_id, String);

    var upload = Uploads.findOne(_id);
    if (upload == null) {
      throw new Meteor.Error(404, 'Upload not found'); 
    }

    UploadServer.delete(upload.path);
    if(upload.status == 2){
      console.log("Deleting " + upload.outputFileName);
      UploadServer.delete(upload.outputFileName);
    }
    Uploads.remove(_id);
  },
  'segmentVideo': function(_id, params) {
    check(_id, String);

    var upload = Uploads.findOne(_id);
    if (upload == null) {
      throw new Meteor.Error(404, 'Upload not found'); 
    }
    if(upload.status != 2) //For some reason, the system calls segmentVideo without the click event when starting (and restarting) the server.
    {
      var inputFile = upload.path;
      var outputFile = inputFile + ".csv"     
      var command="FAST '" + WORKING_DIR + inputFile + "' '" + WORKING_DIR + outputFile + "' " + params.ghs + ' ' + params.hi + ' ' + params.ed + ' ' + params.ahim + ' ' + params.aedm;
    console.log('Segmentating ' + upload.path);
      var before = new Date();

      var syncExec = Meteor.wrapAsync( exec ),
                     execResult = syncExec(command, function()
                     {
                        var elapsed = ((new Date()).getTime() - before.getTime())/1000;
                          
                        console.log('Finished ' + upload.path + ' segmentation in ' + elapsed + ' seconds.');     
                        Uploads.update(_id, {$set : {status: 2, outputFileName: outputFile, segmentationUrl: upload.baseUrl + outputFile, segmentationTime: elapsed, parameters: {ghs: params.ghs, hi: params.hi, ed: params.ed, ahim: params.ahim, aedm: params.aedm} }} );
    });            
    }
    
    return execResult;   
  },
})


