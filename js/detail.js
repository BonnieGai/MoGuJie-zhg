$(function(){
	
/*放大镜*/
	
	  var ZoomWidth = $(".Zoom").width(),
	     ZoomHeight = $(".Zoom").height();
	    
	$(".middleImg").hover(function (){
		
		   $(".Zoom").show();
		   $(".ZoomWindow").show();
	},function (){
		$(".Zoom").hide();
		 $(".ZoomWindow").hide();
	}).on("mousemove" , function (evt){
		
		//将鼠标放到遮罩层的中间位置
	   $(".Zoom").offset({
	   	   
	   	     'left' : evt.pageX - ZoomWidth/2,
	   	     'top'  :evt.pageY - ZoomHeight/2
	   });   
	   //获取Zoom 相对有定位的父元素 middle 的相对定位位置
	   var  _left = $(".Zoom").position().left,
	     _top = $(".Zoom").position().top;
	    
	    if( _left < 0 ){
	    	_left = 0;
	    }else if(_left > $(".middleImg").innerWidth() - ZoomWidth){
	    	_left = $(".middleImg").innerWidth() - ZoomWidth;
	    }
	    if( _top < 0 ){
	    	_top = 0;
	    }else if(_top > $(".middleImg").innerHeight() - ZoomHeight){
	    	_top = $(".middleImg").innerHeight() - ZoomHeight;
	    }
	     
	  //给遮罩层设置相对定位
	  
	  $(".Zoom").css({	  	
	  	   "left" :_left,
	  	   "top"  : _top
	  	
	  });
	 
	  //给大图片设置相对定位
	 // console.log($(".ZoomWindow img").width());
	  $(".ZoomWindow img").css({

       left: - ( $(".ZoomWindow").width() / ZoomWidth ) *_left,
       top: - ($(".ZoomWindow").height() / ZoomHeight) * _top
	   });		  
	});
	   
	$(".desmallImg").on("mouseover" , function (){
			  //改变middle图片的src
			  var  _src = $(this).children("img").attr("src");
			  $(".middleImg img").attr("src",_src);
			  $(".ZoomWindow img").attr("src",_src);
			      
		});
	
	var isShow = true;
	$(".main_left").click(function (){
		 if(isShow){
		 	  isShow = false;
		 	$(".conleft_top").show();
		 }else{
		 	  isShow = true;
		 	$(".conleft_top").hide();
		 }
	});
	
	function ShowPic(className1,className2){
		$("."+className1).hover(function (){		
		  $(this).find("."+className2).show();
	},function (){
		  $(this).find("."+className2).hide();
	});
	}
	
	ShowPic("goods_popularize_top","popularize_hide");
	ShowPic("popularize_bottom_l","popularize_bto_hide");
	ShowPic("popularize_bottom_r","popularize_bto_hide");	
	
//$(window).on("scroll", function() {
//						//滚动距离
//	var  gd30_mainTop = $(".gd30_taball").offset().top;					
//	var 
//	    scrollTop = $(this).scrollTop();
//	   
//	
//	if( gd30_mainTop < scrollTop){	
//		$(".gd30_taball").css({
//			
//			"position" : 'fixed',
//			"top" : 0,
//			"z-index":50
//		});
//	}
//	
//	if(gd30_mainTop > scrollTop){
//		$(".gd30_taball").css({
//			
//			"position" : 'static'
//		});
//	  }
//	
//	});
	
	
	//选择商品
			(function(){
				var color = null;
		   		var size = null;
				$(".info_three").find("dd").click(function (){
				$(this).addClass("curr_three").siblings().removeClass("curr_three");
				if($(this).attr("class").indexOf("curr_four") != -1){
					color = $(this).text();
				}		
			 	
		       });
	
	           $(".info_four").find("dd").click(function (){
					$(this).addClass("curr_four").siblings().removeClass("curr_four");
					//寻找有此类名的元素
					if($(this).attr("class").indexOf("curr_four") != -1){
						size =  $(this).text();
					}
					
	    });
	    
	//加减数量
	 var $spanAmount = $(".add").find("span").text();
	$(".info_six div").find(".info_add").click(function (){
		  $spanAmount ++;
		  $(this).siblings("span").text($spanAmount);
	}).end().find(".info_reduce").click(function (){
		  $spanAmount --;
		  if($spanAmount <= 0){
		  	$spanAmount = 0;
		  }
		  $(this).siblings("span").text($spanAmount);
		  
	});
	
	//console.log($(".info_six").children().eq(1).parents(".detail_con").children(".detail_img").find(".middleImg").children("img").attr("src"));
	$(".info_six").children().eq(1).click(function (){
		
	   //获取商品的信息
	
	   var  product = {
	   	          
	   	    pic : $(this).parents(".detail_con").children(".detail_img").find(".middleImg").children("img").attr("src"),
	   	    
	   	    name :$(this).parents(".info_six").siblings(".info_first").find("h4").text(),
	   	    
	   	    size_color :size +" & "+color,
	   	    
	   	    price :  $(this).parents(".info_six").siblings(".info_two").find(".price_left").find("dt").children().text(),
	   	    
	   	    amount: $(this).parents(".info_six").find(".add").children("span").text()
	   };
	     console.log( product.pic);
	   $.cookie.json = true; 
	   
	  var products = $.cookie("products");
	  //判断看是否有此商品，判断是否读取到数组
		if (!products) { //没有读取到了，说明是第一次添加到购物车，则创建数组对象
			products = [];
		}
		
		//判断购物车数组中是否纯在当前选购的商品
		var index = findIndex(product.name, products);
		if (index === -1) { //数组中不存在选购的商品
			//将当前次添加到购物车的商品保存到数组中
			products.push(product);
		} else { //数组中存在当前选购商品
			products[index].amount++;
		}
		//将数组保存到cookie中
		$.cookie("products", products, {
						expires: 1,
						path: "/"
		});
	});
	
	//找出数组中指定商品编号的元素位置
	function findIndex(name, prodocuts) {
	   for (var i in prodocuts) {
			if (prodocuts[i].name === name) {
							return i;
				}
			}
			return -1;
	}
	
})(),
		   
	//寻找商品
	(function(){
		$.ajax({
				type: "get",
				url: "http://127.0.0.1/mogujie/php/main-branch.php",
				async: true,
				dataType: 'json'
			}).done(function(d){
				var num=1;
				var $queties=0;
				var sid=getcookie('sid');
				
				//把商品和数量用数组的方式存起来
				var sidarr=[];
				var numarr=[];

				console.log(d)
				console.log(d[sid].url);
				
				$(".middleImg").find('img').attr('src',d[sid].url);
				$(".ZoomWindow").find('img').attr('src',d[sid].url);
				$('.color_box').find('img').attr('src',d[sid].url);
				$('.car_title_title').text(d[sid].title);
				$('.car_now_price').text(d[sid].price);				
				$(".red").text(Number(d[sid].price.substring(1))+20);
				
		//数量的增加	
		$(".add").on("click",function(){	
			num++;
			if(num>=10){
				num=10
			}
			$(".quieties").text(num);
		});
		$(".reduce").on("click",function(){
			num--;
			if(num<=1){
				num=1
			}
			$(".quieties").text(num);
		})
		
		//点击加入购物车  存数量和sid
		$(".car_button_right").on("click",function(){
			$queties=$(".quieties").text();
			setcookie("num",$queties,7);
//				cookieToArray();
			//先判断一下sid 
			cookieToArray();
			if($.inArray(sid,sidarr)!=-1){//已存在
				console.log("此商品已存在");
				$queties++;
				numarr[$.inArray(sid,sidarr)]=$queties;//!!!!!!重点
				setcookie('numarr',numarr.toString(),7);
			}else{			//不存在
				sidarr.push(sid);
				setcookie('sidarr',sidarr.toString(),7);
				numarr.push($queties);
				setcookie('numarr',numarr.toString(),7);
			}
			
			console.log(numarr);
			console.log(sidarr);

		})
		//点击加入购物车
		$(".car_button_left").on("click",function(){
			$queties=$(".quieties").text();
			setcookie("num",$queties,7);
			cookieToArray();//虽然商品已在，将数量存如数组，
			if($.inArray(sid,sidarr)!=-1){//已存在
				console.log("此商品已存在");//考虑数量的累加
				$queties++;
				numarr[$.inArray(sid,sidarr)]=$queties;//!!!!!!重点
				setcookie('numarr',numarr.toString(),7);
			}else{			//不存在
				sidarr.push(sid);
				setcookie('sidarr',sidarr.toString(),7);
				numarr.push($queties);
				setcookie('numarr',numarr.toString(),7);
				
			}
			
			window.location.href="cars.html";
		})

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
			})
	})(),
	
	//加入购物车
	(function(){
	
		
		
	
		
	})()
	
})
