Meteor.publish('uploads', function() {
  //return Uploads.find();
  return Uploads.find({owner: this.userId});
})


