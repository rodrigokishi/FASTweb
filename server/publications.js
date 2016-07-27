Meteor.publish('uploads', function() {
  return Uploads.find();
})


