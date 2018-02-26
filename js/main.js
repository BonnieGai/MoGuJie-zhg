require(['config','index'],function(){//整个config文件当作依赖
	require(['jquery'],function(){//使用依赖里面的内容当作我的依赖
//		alert($);
//		alert(getcookie('username'));
	})
});