//购物车找info
(function(){
	
		var sid=getcookie("sid");
		var num=getcookie('num');
		var sidarr=getcookie('sidarr');
		var numarr=getcookie('numarr');
		var allarr=[];//存放所有已经存在的sid
		var $clone;
		
		if(getcookie('sidarr')&&getcookie('numarr')){
			var s=getcookie('sidarr').split(',');
			var n=getcookie('numarr').split(',');
			for(var i=0;i<s.length;i++){
				createcart(s[i],n[i]);
//				console.log(s[i],n[i]);
			}
		}else{
			$(".goods-item").hide();
		}
		
		
		function createcart(sid,num){		
			$.ajax({
				type: "get",
				url: "http://127.0.0.1/mogujie/php/main-branch.php",
				async: false,
				dataType: 'json'
			}).done(function(data){
//				console.log(data);
				
				var $clone=$('.goods-item').eq(0).clone(true);
				$('.goods-item').eq(0).css("display","none");
				$clone.find('.goods-pic').find('img').attr('src',data[sid].url);
				$clone.find('.goods-pic').find('img').attr('sid',data[sid].sid);
				$clone.find('.goods-d-info').find('a').html(data[sid].title);
				$clone.find('.b-price').find('strong').html(data[sid].price);
				$clone.find('.quantity-form').find('input').val(num);
				
				var $p2=(Number($clone.find('.b-price').find('strong').html().substring(1)));
				$clone.find('.b-sum strong').html(($p2*num).toFixed(2));
				$clone.css('visibility','visible');
				$clone.css("display","block");
				$('.car-wrap').append($clone);	
		 
			}).done(function(){
				
			})
		
		} 	
			
	$('.sl-info').text(sidarr.split(',').length);
	setcookie('goods',$('.sl-info').text().toString(),7);

		
})();
//全选
(function(){	
	 var $seleinput=$('.sele').find('input:checked');
	$("#all2").on('change',function(){
		$('.sele').find('input').prop('checked',$(this).prop('checked'));
		$("#all").prop('checked',$(this).prop('checked'));
		
	})			
	$('#all').on('change', function() {
	    $('.sele').find('input').prop('checked', $(this).prop('checked'));
	    $('#all2').prop('checked', $(this).prop('checked'));
	    
	});	
	$(".sele").on('change',$seleinput,function(){
		var $inpts=$('.goods-item:visible').find('input:checked');
		if($(".goods-item:visible").find('input:checkbox').length==$inpts.size()){
			$("#all").prop('checked',true);
			$("#all2").prop('checked',true);
		}else{
			$("#all").prop('checked',false);
			$("#all2").prop('checked',false);
		}				
	})
})();
//修改数量--小计--总价
(function(){
	var sidarr=getcookie("sidarr");

	var numarr=getcookie("numarr");
	var sid=0;
	//++
	$(".quantity-add").on("click",function(){
		sid=$(this).parents('.goods-info').find('img').attr('sid')-2;
		console.log(sid.toString());
		var $quieties=$(this).prev('input').val();
		$quieties++;
		if($quieties>=10){
			$quieties=10;
		}
		$(this).prev('input').val($quieties);
		if($(this).prev('input').val()==10){
			$(this).parent(".quantity-form").next('.quantity-text').text("无货啦").css("color","red");
		}
		var $dan=Number(($(this).parents(".b-quantity").prev('.b-price').find('strong').html()).substring(1));
		var $total=($quieties*$dan).toFixed(2);
		$(this).parents(".goods-info").find('.b-sum strong').text($total);
		count();

		cookieToArray();
//		console.log(numarr);
//		console.log(sidarr);
//		console.log($quieties);
		numarr[sidarr.indexOf(sid.toString())]=$quieties;
//		console.log(numarr[sidarr.indexOf(sid.toString())])
		setcookie("numarr",numarr.toString(),7);
		save(sid,$(this));
		
	})
	
	function save(sid,obj){
		cookieToArray();
		var $index = sid;
    	numarr[sidarr.indexOf($index)] = obj.parents('.goods-item').find('.quantity-form input').val();
    	setcookie('numarr', numarr.toString(), 7);
	}
	function del(sid,sidarr){
		var $index=-1;
		for(var i=0;i<sidarr.length;i++){
			if(sid==sidarr[i]){
				console.log(1111);
				console.log(sid);
				console.log(sidarr[i]);
				$index=i;
			}
		}
		sidarr.splice($index,1);
		numarr.splice($index,1);
		setcookie('sidarr',sidarr.toString(),7);
		setcookie('numarr',numarr.toString(),7);
	}
	function cookieToArray() {//获取cookie转换成数组
	    if (getcookie('sidarr')) {
	        sidarr = getcookie('sidarr').split(','); //将cookie值通过逗号拆分为数组。
	    } else {
	        sidarr = [];//没有cookie就是空数组
	    }
	
	    if (getcookie('numarr')) { //存放数量
	        numarr = getcookie('numarr').split(',');
	    } else {
	        numarr = [];
	    }
	}	
	
//--
$(".quantity-down").on("click",function(){
	sid=$(this).parents('.goods-info').find('img').attr('sid')-2;
		var $quieties=$(this).next('input').val();
		$quieties--;
		if($quieties<=1){
			$quieties=1;
		}
		if($quieties<10){
			$(this).parent(".quantity-form").next('.quantity-text').text("有货").css("color","black");
		}
		$(this).next('input').val($quieties);
		var $dan=Number(($(this).parents(".b-quantity").prev('.b-price').find('strong').html()).substring(1));
		var $total=($quieties*$dan).toFixed(2);
		$(this).parents(".goods-info").find('.b-sum strong').text($total);
		count();
		//存cookie
		cookieToArray();
		numarr[sidarr.indexOf(sid.toString())]=$quieties;
		setcookie("numarr",numarr.toString(),7);
		save(sid,$(this));		
	})

//总计
count();
function count(){
	var length=$(".goods-item:visible").size();
	var $count=0;
	for(var i=0;i<length;i++){			
		$count+=parseInt($(".goods-item:visible").eq(i).find('.b-sum').find('strong').text());		
	}
	console.log(parseInt($count).toFixed(2))
	$('.moneny').text(parseInt($count).toFixed(2));
}

//删除
$('.b-action').on("click",function(){
		$(this).parents(".goods-item").remove();
		cookieToArray();
		var sid=$(this).parents('.goods-info').find('img').attr('sid')-2;
		del(sid,sidarr);
	})

})();
