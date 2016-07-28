Template['home'].helpers({
 myCallbacks: function(){
		return {formData: function() { return { user: Meteor.user().username} },}
	},
});

Template['elemento'].helpers({
	segTime: function(){
		if(this.segmentationTime) {
			return "Running time: " + this.segmentationTime.toFixed(2) + "s";
		}
		return "Click to segment";
	},
	size: function(){
		//To show MB 
		if (this.size > 1000*1000*1000) {
				return ((this.size/(1000*1000*1000)).toFixed(2)).toString() + " GB";
		}
		return ((this.size/(1000*1000)).toFixed(2)).toString() + " MB";
	},
	src: function() {
		return 'file_icon.png';
	},
	videoStatus: function(){
		var ret = "";
		switch(this.status)
		{ 
			case 0: 
				ret = "<span class='glyphicon glyphicon-play' aria-hidden='true'></span> Segment";
				break;
			case 1:
				ret = "Processing";
				break;
			case 2:
				ret = "<span class='glyphicon glyphicon glyphicon-download-alt' aria-hidden='true'></span> Download";
				break;
		}
		return Spacebars.SafeString(ret);
	},
	isEnabled: function(){    
		if(this.status == 1){
			return "disabled"
		}else{
			return "";
		}    
	},
	classesBotao: function() {
		switch(this.status) {
			case 0:
				return "btn-primary"; 
			case 1:
				return "btn-info";
			case 2:
				return "btn-success";
		}		
	},	
});

Template.registerHelper("parserLinha",function(lista) {
		lista = lista.fetch()
		if(lista.length == 0) {
			return [];
		}
		blocos = [];
		tam = 4;
		while(lista.length > tam) {
			blocos.push({row : lista.slice(0,tam)});
			lista = lista.slice(tam);
		}
		blocos.push({row: lista});
		return blocos;
});

Template['elemento'].events({
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


Template["botao_config"].events({
	'click #config' : function() {
			Modal.show('configuracoesModal');
	}
	
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
