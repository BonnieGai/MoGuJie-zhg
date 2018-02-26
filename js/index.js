define(['jquery'],function($){
	return {
		/*轮播*/
		big_banner:(function(){
		var $num=0;
		var timer=null;
		var arr_bg=["rgb(251,54,139)","rgb(246,40,100)","rgb(252,147,38)","rgb(110,35,246)","rgb(246,56,178)","rgb(251,40,111)","rgb(251,105,124)"];
		$(".btn_list").on("mouseenter",function(){
			$(this).addClass("active_btn").siblings("li").removeClass("active_btn");
			$("._img").find("img").eq($(this).index()).stop().animate({opacity:'1'},'slow').parent("a").siblings("a").find("img").stop().animate({opacity:'0'},'slow');
			$num=$(this).index();
			$("#banner").css("backgroundColor",arr_bg[$num]);
		})
		$("#banner").on("mouseenter",function(){
			clearInterval(timer);
		}).on("mouseleave",function(){
			timer=setInterval(function(){
			$num++;
			$(".btn_list:eq("+$num+")").addClass("active_btn").siblings("li").removeClass("active_btn");
			$("._img").find("img").eq($num).stop().animate({opacity:'1'},'slow').parent("a").siblings("a").find("img").stop().animate({opacity:'0'},'slow');
			$("#banner").css("backgroundColor",arr_bg[$num]);
			if($num>=6){
				$num=-1;
			}
		},1500);
		})	
	timer=setInterval(function(){
			$num++;
			$(".btn_list:eq("+$num+")").addClass("active_btn").siblings("li").removeClass("active_btn");
			$("._img").find("img").eq($num).stop().animate({opacity:'1'},'slow').parent("a").siblings("a").find("img").stop().animate({opacity:'0'},'slow');
			$("#banner").css("backgroundColor",arr_bg[$num]);
			if($num>=6){
				$num=-1;
			}
		},1500);		
	})(),
	hover_nav:(function(){
		$('.list1').on("mouseenter",function(){
			$(".hover").eq($(this).index()).show().siblings('.hover').hide();
		}).on("mouseleave",function(){
			$(".hover").eq($(this).index()).hide();
		})
	})(),
	
	rotate:(function(){
		var $index=0;
		var timer=null;
		
		timer=setInterval(function(){			
			var $rannum=parseInt(Math.random()*5);
			console.log($rannum);
			var $width1=$('.rotate1').innerWidth();
			var $width2=$('.rotate2').innerWidth();
			if($width1==0){
				rotate2($rannum);
			}else{
				rotate1($rannum);
			}
		},3000)
		
		function rotate1(num){
			$('.rotate1').eq(num).animate({
				width:0,
				left:90
			},500,function(){
				$('.rotate2').eq(num).animate({
					width:182,
					left:0
				});
			});
		}
		function rotate2(num){
			$('.rotate2').eq(num).animate({
				width:0,
				left:90
			},500,function(){
				$('.rotate1').eq(num).animate({
					width:182,
					left:0
				})
			})
		}
	})(),
	//获取数据，仅有的--拼接
	//第四分支
	fenzhi_four:(function(){
		$.ajax({
				type: "get",
				url: "http://127.0.0.1/mogujie/php/main.php?__hbt=1512987675399",
				async: true,
				dataType: 'json'
			}).done(function(d){
				var $html = '';
				for(var i=0;i<5;i++){
					$html+='<ul class="wrap_min_banner">'
					for(var j=0;j<5;j++){
						$html+='<li><img src="'+d[j].url+'" /><p>'+d[j].title+'</p><p><em class="newpri">'+d[j].price+'</em><del class="oldpri">¥184.29</del></p></li>';					
					}
					$html+='</ul>';
				}
				$(".four_right").append($html);
			
			$(".wrap_min_banner").eq(0).addClass('first_ul');
			
				var $ul=$(".wrap_min_banner");
				var $index=0;
		    	var $qindex=0;
		    	var timer=null;
		    	timer=setInterval(function(){
	    		$('._right').click();
	    	},3000);
    	//左右切换按钮的显示与隐藏
    	$('._right').hover(function(){
    		$('._left').show();
    		$('._right').show();
    		clearInterval(timer);
    	},function(){
    		$('._left').hide();
    		$('._right').hide();
    		timer=setInterval(function(){
	    		$('._right').click();
	    	},3000);
    	})
    	
    	$('._left').hover(function(){
    		$('._left').show();
    		$('._right').show();
    		clearInterval(timer);
    	},function(){
    		$('._left').hide();
    		$('._right').hide();
    	timer=setInterval(function(){
	    		$('._right').click();
	    	},3000);
    	})
    	
    	
    	$('.four_right').hover(function(){
    		$('._left').show();
    		$('._right').show();
    		clearInterval(timer);
    	},function(){
    		$('._left').hide();
    		$('._right').hide();
    		timer=setInterval(function(){
	    		$('._right').click();
	    	},3000);
    	});
    	$('._left').on('click',function(ev){
    		$index--;
    		if($index<0){
    			$qindex=0;
    			$index=4;
    		}
    		imgscroll(ev);
    		$qindex=$index;
    	});	
    	$('._right').on('click',function(ev){
    		$index++;
    		if($index>4){
    			$qindex=4;
    			$index=0;
    		}
    		imgscroll(ev);
    		$qindex=$index;
    	});
    	
    	function imgscroll(ev){
    		if($qindex==4 && $index==0){
			
					$ul.eq($qindex).animate({
	    				left:-1000
	    			});
	    			$ul.eq($index).css('left','1000px').animate({
	    				left:0
	    			});
				}
    		if($qindex==0&& $index==4){
    			
    				$ul.eq($qindex).animate({
	    				left:1000
	    			});
	    			$ul.eq($index).css('left','-1000px').animate({
	    				left:0
	    			})
    			}
    			
    		 if($index>$qindex){
    			$ul.eq($qindex).animate({
    				left:-1000
    			});
    			$ul.eq($index).css('left','1000px').animate({
    				left:0
    			})
    			
    		
    		}else if($index<$qindex){
    			$ul.eq($qindex).animate({
    				left:1000
    			});
    			$ul.eq($index).css('left','-1000px').animate({
    				left:0
    			});
				
    		}
    	}
	});
	
	})(),
	
	
	//第五分支
	fenzhi_five:(function(){
			/*此分支数据部分无法取到先用clone填充*/
			var arr=['女装','女鞋','美妆','男友','家居','内衣','优选','母婴','包包','配饰','运动'];
			for(var i=0;i<11;i++){
				var $cfenzhi=$(".box_five").eq(0).clone(true);
				$cfenzhi.find('.title').text(arr[i]);
				$cfenzhi.insertBefore($("#box_six"));
			}		
			$.ajax({
				type: "get",
				url: "http://127.0.0.1/mogujie/php/main.php?__hbt=1512987675399",
				async: true,
				dataType: 'json'
			}).done(function(d){
				var $html = '';
				for(var i=5;i<11;i++){
				$html+='<li class="mid_li"><div class="mid_ul_h">大牌店铺</div><div class="mid_ul_p">每天10点</div><div class="mid_ul_img"><img src="'+d[i].url+'" /></div>'
				}
				$(".mid_ul").append($html);
			})
	})(),

//最后分支
	fenzhi0:(function(){
			$.ajax({
				type: "get",
				url: "http://127.0.0.1/mogujie/php/main-branch.php?__hbt=1512995900800",
				async: true,
				dataType: 'json'
			}).done(function(d){
				var $html = '';
				for(var i=0;i<120;i++){
				$html+=`
				<li sid="`+d[i].sid+`" class="ooo">
				 			<a  class="like_one">
				 				<img src="`+d[i].url+`" alt="" />
				 			</a>
				 			<a  class="like_two">找相似</a>
				 			<a  class="like_three">
				 				<p>`+d[i].title+`</p>
				 				<div class="like_price">
				 					<span class="new_price">`+d[i].price+`</span>
				 					<span class="old_price">282.86</span>
				 				</div>
				 			</a>
				 		</li>`
				
				
				}
				$(".like").append($html);
			}).done(function(){
				
				$(".ooo").on("click",function(){
					console.log($(this).attr("sid"));
					setcookie("sid",$(this).attr("sid"),7);	
					window.location.href="detail.html";
					
					
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
			})
	})(),
	
	/*楼梯*/
	louti:(function(){
		//通过滚动条控制楼梯显示和隐藏
	$(window).on('scroll',function(){
		var $top=$(this).scrollTop();//滚动条的距离
		if($top>=1000){
			$('#loutinav').show();
		}else{
			$('#loutinav').hide();
		}
		//拖动滚轮对应的楼梯添加active类
		$('.louti').each(function(){
			var $loutitop=$('.louti').eq($(this).index(".louti")).offset().top-300;
			
			if($loutitop>$top){
				$('#loutinav li').removeClass('active');
				$('#loutinav li').eq($(this).index(".louti")).addClass('active');
				return false;
			}
		});
	});
	//点击楼梯让右边的内容达到顶部
	$('#loutinav li').not('.last').on('click',function(){
		$(this).addClass('active').siblings('li').removeClass('active');
		var $offsettop=$('.louti').eq($(this).index()).offset().top-450;
		$('html,body').animate({
			scrollTop:$offsettop
		});
	});
	
	
	//回到顶部
	$(".go_top").on("click",function(){
		$('html,body').animate({
			scrollTop:0
		})
	});
	$('.last').on('click',function(){
		$('html,body').animate({
			scrollTop:0
		});
	});
	})(),
	


	fengzhi_six:(function(){
		var $ul=$(".box_six_banner");
		var $btn=$(".number");
		var $index=0;
    	var $qindex=0;
    	var timer=null;
    	$btn.on('click',function(ev){
    		$index=$(this).index();
    		imgscroll(ev);
    		$qindex=$index;
    	});
    	
    	timer=setInterval(function(){
    		$('.btn_right').click();
    	},2000);
    	//左右切换按钮的显示与隐藏
    	$('.six_left_bot').hover(function(){
    		$('.btn_left').show();
    		$('.btn_right').show();
    		clearInterval(timer);
    	},function(){
    		$('.btn_left').hide();
    		$('.btn_right').hide();
    		timer=setInterval(function(){
	    		$('.btn_right').click();
	    	},2000);
    	});
    	$('.btn_left').on('click',function(ev){
    		$index--;
    		if($index<0){
    			$qindex=0;
    			$index=4;
    		}
    		imgscroll(ev);
    		$qindex=$index;
    	});	
    	$('.btn_right').on('click',function(ev){
    		$index++;
    		if($index>4){
    			$qindex=4;
    			$index=0;
    		}
    		imgscroll(ev);
    		$qindex=$index;
    	});
    	
    	function imgscroll(ev){
    		$btn.eq($index).addClass('active_num').siblings('li').removeClass('active_num');
    		if($qindex==4 && $index==0){
    			if(ev.target.nodeName=='DIV'){
    				$ul.eq($qindex).animate({
	    				left:-950
	    			});
	    			$ul.eq($index).css('left','820px').animate({
	    				left:0
	    			});
    			}else if(ev.target.nodeName=='LI'){
    				$ul.eq($qindex).animate({
	    				left:950
	    			});
	    			$ul.eq($index).css('left','-820px').animate({
	    				left:0
	    			})
    			}
    		}else if($qindex==0&& $index==4){
    			if(ev.target.nodeName=='DIV'){
    				$ul.eq($qindex).animate({
	    				left:950
	    			});
	    			$ul.eq($index).css('left','-820px').animate({
	    				left:0
	    			})
    			}else if(ev.target.nodeName=='LI'){
    				$ul.eq($qindex).animate({
	    				left:-950
	    			});
	    			$ul.eq($index).css('left','820px').animate({
	    				left:0
	    			})
    			}
    		}else if($index>$qindex){
    			$ul.eq($qindex).animate({
    				left:-950
    			});
    			$ul.eq($index).css('left','820px').animate({
    				left:0
    			})
    		}else if($index<$qindex){
    			$ul.eq($qindex).animate({
    				left:950
    			});
    			$ul.eq($index).css('left','-820px').animate({
    				left:0
    			})
    		}
    	}
   	
    		
    	
    	
    	
	})(),
	
	//跳转之后登录变用户名
	user_login:(function(){
		//设置cookie,获取cookie,删除cookie
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
		
		if(getcookie('username')){
			$(".li1").find('.login').text(getcookie('username')).css("color","#FF0077")
		}else{
			$(".li1").find('.login').text("登录");
		}
		
		if($(".li1").find('.login').text()=="登录"){
			$(".li1").find('.login').on("click",function(){
				window.location.href="login.html";
			})
		}
		
	})(),
	
	
	layzy:(function(){
		$(window).on('scroll',function(){
			var $top=$(this).scrollTop();
			$(".like").find('li').each(function(){			
				if($top>=$(this).offset().top-200){
					$(this).find('img').show();
					console.log($(this));
				}else{
					$(this).find('img').hide();
				}
				console.log($(this).offset().top)
			})
			console.log($top);
			
		})
	})(),
	gouwuche:(function(){
		$('.min_car').find('.car_txt').on("click",function(){
			alert(1);
			window.location.href="http://127.0.0.1/mogujie/cars.html";
		})
		var $cnum=getcookie('goods');
		$('#yyy').text($cnum);
	})()
	
	}
})








