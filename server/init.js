Meteor.startup(function () {
  UploadServer.init({
    tmpDir: process.env.PWD + '/.uploads/',
    uploadDir: process.env.PWD + '/.uploads/',
    checkCreateDirectories: true,
    acceptFileTypes: /.(avi|mp4|mkv)$/i,
    getDirectory: function(fileInfo, formData) {
      if (formData && formData.user != null) {        
        return formData.user + '/';	
      }
      return "";
    },
    getFileName: function(fileInfo, formData) {
      if (formData && formData.prefix != null) {
        return formData.prefix + '_' + fileInfo.name;
      }
      return fileInfo.name;
    },
    finished: function(fileInfo, formData) {
    }
  });
});
