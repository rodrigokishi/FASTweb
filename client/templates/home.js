Template['uploadedInfo'].helpers({
  segTime: function(){
    return this.segmentationTime.toFixed(2);
  },
  size: function(){
    //To show MB 
    return (this.size/1000/1000).toFixed(2);
  },
  src: function() {
    return 'file_icon.png';
  },
  videoStatus: function(){
    switch(this.status)
    { 
      case 0: 
	return "Segment";
      break;
      case 1:
	return "Processing";
      break;
      case 2:
	return "Download";
      break;
    }
  },
  isEnabled: function(){    
    if(this.status == 1){
      return "disabled"
    }else{
      return "";
    }    
  },
});

Template['uploadedInfo'].events({
  'click .deleteVideo':function() {
    if (confirm('Are you sure?')) {
      Meteor.call('deleteFile', this._id);
    }
  },
  'click .segmentOrDownload':function() {
      if(this.status == 0){
        //For some reason that I don't get, when this update is transfered to server side code, inside segmentVideo method, it doesn't work.
        Uploads.update({_id: this._id}, {$set : {status: 1}});  
	var parameters = {ghs: Session.get("ghs"), hi: Session.get("hi"), ed: Session.get("ed"), ahim: Session.get("ahim"), aedm: Session.get("aedm")};      
        Meteor.call('segmentVideo', this._id, parameters);  
      }else{
        window.open(this.segmentationUrl, '_system');
      } 
  },
});

Template['segmentationParameters'].helpers({
  isEnabled: function(){    
    if(this.status != 2){
      return "disabled"
    }else{
      return "";
    }    
  },
});

/*Template['globalSegmentationParameters'].helpers({
  ghs: function(){    
      return Session.get("ghs");
  },
  hi: function(){    
      return Session.get("hi");
  },
  ed: function(){    
      return Session.get("ed");
  },
  ahim: function(){    
      return Session.get("ahim");
  },
  aedm: function(){    
      return Session.get("aedm");
  },
});*/

/*Template['globalSegmentationParameters'].events({
  'change .ghs':function(event) {
    Session.set('ghs', this.value);
    console.log(this.value);
  },
});*/
