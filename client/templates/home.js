Template['uploadedInfo'].helpers({
  segTime: function(){
    return this.segmentationTime.toFixed(2);
  },
  size: function(){
    //To show MB 
    if (this.size > 1073741824) {
        return ((this.size/1073741824).toFixed(2)).toString() + " GB";
    }
    return ((this.size/1048576).toFixed(2)).toString() + " MB";
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

Template["botao_config"].events({
  'click #config' : function() {
      Modal.show('configuracoesModal');
  }
  
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
