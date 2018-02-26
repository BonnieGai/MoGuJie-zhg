$(function() {
			var arr = [false, false, false, false, true];
			//加载生成验证码
			yanzhenma();
			function yanzhenma() {
				var arr = []; //得到一个含有数字和字母的数组
				for(var i = 48; i <= 57; i++) {
					arr.push(String.fromCharCode(i));
				}
				for(var j = 97; j <= 122; j++) {
					arr.push(String.fromCharCode(j));
				}
				var html = "";
				for(var k = 0; k <4; k++) {
					var ranIndex = parseInt(Math.random() * arr.length);
					if(ranIndex > 9) { //考虑字母的情况
						var bool = Math.random() > 0.5 ? true : false;
						if(bool) {
							html += arr[ranIndex].toUpperCase();
						} else {
							html += arr[ranIndex];
						}
					} else {
						html += arr[ranIndex];
					}
				}
				return html;
			}

			//	console.log($('.change').html())
			$('.code').text(yanzhenma());
			$(".change").on("click", function() {

				$('.code').text(yanzhenma());
			})

			//失去光标判断用户名
			$('.username input').on('blur', function(){
			var res = /^[a-zA-Z]\w{2,8}$/;
			var text1 = "用户名";
			var num = 0;
			var text = "用户名须以字母开头的3~9位数字字母下划线";
			judge(this, text, res, text1, num);
			
			
			//用户名格式正确先判断
				if($('.username input').val()){
					var $username = $(this).val();
					console.log($username);
					if(arr[0]){
						$.ajax({
							type:'post',
							url:'http://127.0.0.1/mogujie/php/adduser.php',
							data:{
								username:$username
							},
							success:function(d){
								console.log(d);
								if(!d){
									$('.username .msg').text("√").css("color","green");
									console.log($('.username .msg').text())
									arr[0]=true;
								}else{								
									$('.username .msg').text('用户名已经存在').css("color","red");								
									arr[0]=false;
								}
							}
						})
					}else{
						$(this).siblings(".msg").text("用户名格式不正确").css("color","red");
					}
				
			}else{
				$(this).siblings('.msg').text("请输入用户名");
			}
		
			});	

		
				
			
				//判断密码
				$('.pass input').on('blur', function() {
					var res = /^[a-zA-z0-9]{6,16}$/;
					var text = "密码";
					var text1 = "密码为6-16位的字母或数字"
					var num = 1;
					judge(this, text, res, text1, num);
				})
				//重复密码
				$(".repass input").on("blur", function() {
					if($(this).val() != $(".pass input").val()) {
						$(this).siblings(".msg").text("两次密码不一致").css("color", "red");
						arr[2] = false;
					} else {
						$(this).siblings(".msg").text("");
						arr[2] = true;
					}
				})

				//验证码

				$(".yan_code").on("blur", function() {
					if($(this).val() == "") {
						$(this).siblings(".msg").text("请输入验证码");
						arr[3] = false;
					} else {
						if($(this).val() != $(".code").text()) {
							$(this).siblings(".msg").text("验证码错误").css("color", "red");
						} else {
							$(this).siblings(".msg").text("");
							arr[3] = true;
						}
					}
				})
				
				var $userinfo={
					username:'username',
					password:'password'
				}
				
				
				//条约加注册按钮
				$("._register input").on("click", function() {
//					var $value1=$('.username input').val();
//					var $value2=$(".pass input").val();
//					console.log($value);
//					console.log($value2);
					$userinfo.username=$(".username input").val();
					$userinfo.password=$(".pass input").val();
					if($(".checkbox").prop("checked")) {
						arr[4] = true;
					} else {
						arr[4] = false;
					}				
					console.log(arr[0],arr[1],arr[2],arr[3],arr[4]);
					if(arr[0] && arr[1] && arr[2] && arr[3] && arr[4]) {
						$.cookie('user', $('.username input').val(), {expires: 7});
						$.cookie('pass', $('.pass input').val(), {expires: 7});
						alert("注册成功");
						//注册都成功了再ajax
						$.ajax({
							type: "post",
							url: "http://127.0.0.1/mogujie/php/newreg.php",
							async: true,
							data:{
								'username':$userinfo.username,
								'password':$userinfo.password
							},
							success: function(d) {
								if(!d){
//								$(this).find(".msg").text("√");
								arr[0]=true;
							}else{
								$(this).find(".msg").text('用户名已经存在');
								arr[0]=false;
							}
								$(location).attr('href', 'login.html');
							}
						});
						
					} else {
						alert("注册不成功");
					}
				})

				function judge(ele, text, res, text1, num) {
					if($(ele).val() == "") {
						$(ele).siblings('.msg').text(text1 + "不能为空").css("color", "red");
						arr[num] = false;
					} else {
						if(res.test($(ele).val())) {
							$(ele).siblings(".msg").text("");
							arr[num] = true;
						} else {
							$(ele).siblings(".msg").text(text + "格式不正确").css("color", "red")
							arr[num] = false;
						}
					}
				}

				/*已有账号点击登录页面*/
				$(".hasname").on("click", function() {
					console.log(1)
					window.location.href = "http://127.0.0.1/mogujie/login.html?__hbt=1513060475928";
				});

			})