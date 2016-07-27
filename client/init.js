Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

Meteor.startup(function() {
  Uploader.finished = function(index, file) {
    Uploads.insert(file);  
  };
  sessionBind(Template.configuracoesModal);
  Session.set('ghs', 3.0);
  Session.set('hi', 0.25); 
  Session.set('ed', 1.5); 
  Session.set('ahim', 0.5); 
  Session.set('aedm', 9.0);  
});
