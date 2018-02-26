/*1.tab切换*/
(function(){
	$(".putong_login").on("click",function(){
		console.log('111');
		$(".box_login").css("display","block");
		$("#phone_login").css("display","none");
	})
	
	$(".phone_login").on("click",function(){
		console.log(222);
		$(".box_login").css("display","none");
		$("#phone_login").css("display","block");
	})
	
	$(".erweima").on("click",function(){
		$(".login").css("display","none");
		$(".saoyisao").css("display","block");
	})
	
	$(".computer").on("click",function(){
		$(".login").css("display","block");
		$(".saoyisao").css("display","none");
	})
})(),


/*登录验证*/
//普通登录
//(function(){
//	$(".sub").on("click",function(){
//		$(".normal").on("blur",function(){
//			if($.cookie("user")!=$(this).val()){
//				$(".msg").text("用户名不存在！");
//			}
//		});
//		
//		
//		if($(".normal").val()==$.cookie("user")&&$(".pass_lo").val()==$.cookie("pass")){
//			window.location.href="index.html";
//		}else{
//			$(".msg").text("用户名或密码不正确！");
//		}
//	})
//})(),

//手机号登录
(function(){
	$(".active_code").on("click",function(){
		var rancode=yanzhenma();
		alert(rancode)
	})
	$("._login").on("click",function(){
		
		if(($(".tel_phone input").val()==15956654050 )&& ($(".active_pass").val()==5566)){
			window.location.href="index.html";
		}else{
			$(".msg").text("请输入正确的手机号及验证码！")
		}
	})

})(),

//用户登录
(function(){
	function judge(str){
		var reg=/^[a-zA-Z_]\w{2,8}$/;
		if(reg.test(str)){
			return true;
		}else{
			return false;
		}
	}
	var $userinfo={
		username:'username',
		password:'password'
	}
	var bstop1=true, bstop2=true;
	//用户名
	$(".normal").focus(function(){
		$(".msg").text("请输入3~9位用户名");
	}).blur(function(){
		if($('.normal').val()){
			var $username=$(this).val();
			if(judge($('.normal').val())){//通过正则
				$.ajax({
					type:'post',
					url:'http://127.0.0.1/mogujie/php/login1.php',
					data:{
						username:$username
					},
					success:function(d){
						console.log(d);
						if(d){//如果可以返回值说明用户存在
							bstop1=false;
						}else{
							bstop1=true;
						}
						
					}
				});
			}else{//未通过正则
				$(".msg").text("用户名格式不正确");
				bstop1=true;
			}
		}else{
			$(".msg").text("用户名不能为空！");
			bstop1=true;
		}
	});
	//密码
	$(".pass_lo").focus(function(){
		$(".msg").text("请输入6-16位的字母或数字");
	}).blur(function(){
		if($(".pass_lo").val()){
			bstop2=false;

		}
	});
	//点击登录
	$(".sub").on('click',function(){
		//设置cookie,获取cookie,删除cookie
		
		
		if(bstop1||bstop2){
			return false;//用户名或者密码不对阻止
		}else{
			$userinfo.username=$(".normal").val();
			$userinfo.password=$(".pass_lo").val();
			console.log($userinfo.username)
			$(".msg").css("display","none");
			$.ajax({
				type:"post",
				data:{
					'username':$userinfo.username,
					'password':$userinfo.password
				},
				url:"http://127.0.0.1/mogujie/php/login2.php"
			}).done(function(s){
				console.log(s);
				
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

		
				
				
				if(s){
					console.log(111)
			
					if($(".sub_box_check").prop("checked")){
						$.cookie("username",$userinfo.username, {expires: 7});
						$.cookie("password",$userinfo.password, {expires: 7});
//						setcookie('username',$userinfo.username,7);
//						setcookie('password',$userinfo.password,7);
					}else{
						$.cookie("username",$userinfo.username, { expires:-1});
						$.cookie("password",$userinfo.password, { expires: -1})
//						delcookie('username');
//						delcookie('password');
					}
					//倒计时
					$(".djs").css("display","block");
					var num=6;
					var timer=null;
					$(".djs_close").on("click",function(){
						$(".djs").css("display","none");
						clearInterval(timer);
						//立即登录
						window.location.href="http://127.0.0.1/mogujie/index.html";
					})
					timer=setInterval(function(){
						num--;
						$('.djs_s').html(num);
						if(num<=0){
							num=0;
							window.location.href="http://127.0.0.1/mogujie/index.html";
							clearInterval(timer);
						}
					},1000)
				}else{
					bstop2=true;
				}
				
				
			});
		}
	});
	//如果重新登录新用户还会记住之前记住的用户名
	$(window).ready(function(){
		var username=$.cookie('username');
		var password=$.cookie('password');
		console.log(username)
		$(".normal").val(username);
		$('.pass_lo').val(password);
		$('.sub_box_check').prop('checked',function(i,val){
			return !val;//记住标签重新钩上
		})
	})
})(),
			//验证码
			(function(){
				function yanzhenma(){
				var arr=[];
				var str="";
				for(var i=0;i<=9;i++){
					arr.push(i);
				}
				for(var j=0;j<6;j++){
					str+=parseInt(Math.random()*arr.length);
				}
				return str;
			}
			
			console.log(yanzhenma());
			})(),
			//点击快速注册
			(function(){
			
			})()




