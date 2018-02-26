function setcookie(key,value,days){
			var d=new Date();
			d.setDate(d.getDate()+days);
			document.cookie=key+'='+encodeURI(value)+';expires='+d;
		}
		function getcookie(key){
			var arr=decodeURI(document.cookie).split('; ');
			for(var i=0;i<arr.length;i++){
				var newarr=arr[i].split('=');
				if(newarr[0]==key){
					return newarr[1];
				}
			}
		}		
		function delcookie(key){
			setcookie(key,'',-1);
}