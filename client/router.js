Router.map(function () {
  this.route('home', {
    path: '/',
    waitOn: function() {
      return [
        Meteor.subscribe('uploads')
      ];
    },
    data: function() {
      return {
        uploads: Uploads.find()
      }
    }
  });
});

