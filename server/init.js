Meteor.startup(function () {
	UploadServer.init({
		tmpDir: process.env.PWD + '/.uploads/tmp',
		uploadDir: process.env.PWD + '/.uploads/',
		checkCreateDirectories: true,
		acceptFileTypes: /.(avi|mp4|mkv)$/i,
		
		validateRequest: function(req) { 
        if (req.headers["content-length"] > 1000*1000*1000*5) { //5GB
					return "File is too long!";
        }
				if (req.headers["content-length"] < 1000*1000) { //1MB
					return "File is too short!";
        }
        return null; 
    },
		
		getDirectory: function(fileInfo, formData) {
			if (formData && formData.directoryName != null) {
				return formData.directoryName;
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
