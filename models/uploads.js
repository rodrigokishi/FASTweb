Uploads = new Mongo.Collection('uploads');

Uploads.allow({
  insert: function (userId, doc) {
    return true;
  },
  update: function (userId, doc, fields, modifier) {
    return true
  }
});

Uploads.after.insert(function (userId, doc) {
	Uploads.update({_id: this._id}, {$set : {status: 0, outputFileName: null, segmentationUrl: null, segmentationTime: 0, owner: userId }});
 
});


