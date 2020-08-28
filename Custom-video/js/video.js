$(function(){
	var duration = document.querySelector(".duration");
	var video = document.querySelector("video");
	var sta = document.querySelector(".sta");
	var ful = document.querySelector(".ful");
	var pro = document.querySelector(".pro");
	var pro_p1 = document.querySelector(".pro-p1");
	var pro_p2 = document.querySelector(".pro-p2");
	var pro_p3 = document.querySelector(".pro-p3");
	var pro_d1 = document.querySelector(".pro-d1");
	var duration_s2 = document.querySelector(".duration-s2");
	var duration_s1 = document.querySelector(".duration-s1");
	var sound_d1 = document.querySelector(".sound-d1");
	var soundProP2 = document.querySelector(".sound-pro-p2");
	var soundProD1 = document.querySelector(".sound-pro-d1");
	var soundProP3 = document.querySelector(".sound-pro-p3");
	var prompt = document.querySelector(".prompt");
	var plan = document.querySelector(".plan");
	// 视频总时长
	video.oncanplay = function(){
		duration_s2.innerHTML = getFormatTime(this.duration);
		// 获取静音前的音量
		var x = video.volume;
		// 计算音量百分比
		var f = x * 100 + "%";
		// 设置音量进度条的宽度
		soundProP2.style.width = f;
		// 计算进度条的像素值
		var spp = soundProP2.offsetWidth;
		// 设置音量滑块位置
		soundProD1.style.left = spp - 6 + "px";
	}
	// 视频总时长转换方法
	function getFormatTime(time){
		var m = parseInt(time%3600/60),
			s = parseInt(time%60);
		// 满足格式 00:00 在单数前面填充0
		m = m < 10 ? "0" + m : m;
		s = s < 10 ? "0" + s : s;
		return m + ":" + s; // 返回结果
	}
	
	// 播放视频
	sta.onclick = function(){
		if(video.paused){ // 视频未播放时
			video.play(); // 播放
			this.innerHTML = '<svg class="icon" aria-hidden="true"><use xlink:href="#icon-zanting1"></use></svg>'; //更改图标
		} else {
			video.pause(); // 暂停
			this.innerHTML = '<svg class="icon" aria-hidden="true"><use xlink:href="#icon-bofang"></use></svg>'; //更改图标
		}
	}
	
	// 播放进度条
	video.ontimeupdate = function(){
		// 当前播放时间节点
		var curr = this.currentTime;
		// 视频总时长
		var dura = this.duration;
		// 当前播放进度百分比
		var dreac = curr / dura * 100 + "%";
		// 获取总时长像素
		var proP1 = pro.offsetWidth;
		// 播放进度元素宽度
		pro_p2.style.width = dreac;
		// 设置调节进度控件
		var pro_p2_width = $('.pro-p2').width();
		if(pro_p2_width > 6){ // 进度条到达控件中间 控件开始动
			pro_d1.style.left = (pro_p2_width - 6) + "px";
		} else {
			pro_d1.style.left = 0;
		}
		if(pro_p2_width > (proP1 - 12)){
			pro_d1.style.left = proP1 - 12 + "px";
		}
		duration_s1.innerHTML = getFormatTime(curr); // 更新时间节点
		
		video.onended=function(){ // 视频结束
			// 改变宽度
			pro_p2.style.width = 0;
			// 改变滑块
			pro_d1.style.left = 0;
			video.currentTime = 0;
			// 改变播放按钮
			sta.innerHTML = '<svg class="icon" aria-hidden="true"><use xlink:href="#icon-bofang"></use></svg>';
		}
	}
	
	// 鼠标移入播放进度条
	pro_p3.onmousemove = function(){
		plan.style.display = "inline-block";
		// 获取当前鼠标位置
		var x = event.offsetX;
		// 获取进度条总长度
		var w = this.offsetWidth;
		// 得到鼠标位置所占比例
		var f = x / w;
		// 视频总时长
		var s = video.duration;
		// 得到秒数
		var miao = f * s;
		// 转换为时间格式
		plan.innerHTML = getFormatTime(miao);
		// 位置实时刷新
		plan.style.left = x - 35 + "px";
	}
	pro_p3.onmouseleave = function(){
		plan.style.display = "none";
	}
	
	// 跳跃播放
	pro.onclick = function(){
		// 获取鼠标点击位置宽度
		var of = event.offsetX;
		// 进度条总长度
		var ofW = this.offsetWidth;
		// 鼠标点击位置占总长度的比列
		var per = of / ofW ;
		// 获取播放的起始时间节点
		var currtime = video.duration*per;
		// 设置播放的起始时间节点
		video.currentTime = currtime;
	}
	
	// 鼠标按下调节视频
	pro_p3.onmousedown = function(){
		// 获取鼠标点击进度条位置
		var x = event.offsetX;
		// 获取进度条总长度
		var w = this.offsetWidth;
		// 鼠标点击位置占总长度的比例
		var per = x / w;
		var currtime = video.duration*per;
		video.currentTime = currtime;
		// 计算播放的百分比
		var wb = per * 100 + "%";
		// 设置播放进度条的宽度
		pro_p2.style.width = wb;
		//获取进度条宽度的像素值
		var w1=pro_p2.offsetWidth;
		//设置调节控件的位置
		pro_d1.style.left=w1-6+"px";
		
		// 鼠标按下未释放并移动
		this.onmousemove = function(){
			plan.style.display = "inline-block";
			// 实时获取鼠标在进度条上的位置
			var x = event.offsetX;
			// 实时获取进度条总长度
			var w = this.offsetWidth;
			// 实时计算点击位置占百分比
			var per = x / w;
			var currtime = video.duration*per;
			console.log(currtime);
			video.currentTime = currtime;
			var wb = per * 100 + "%";
			//实时设置音量进度条的宽度
			pro_p2.style.width= wb;
			//实时获取音量进度条的宽度的像素值
			var w1=pro_p2.offsetWidth;
			//实时设置音量调节控件左距离（left定位值）
			pro_d1.style.left=w1-6+"px";
			// 视频总时长
			var s = video.duration;
			// 得到秒数
			var miao = per * s;
			// 转换为时间格式
			plan.innerHTML = getFormatTime(miao);
			// 位置实时刷新
			plan.style.left = x - 35 + "px";
		}
		
		// 鼠标离开视频进度条
		this.onmouseout = function(){
			this.onmousemove = null;
			this.onmousemove = function(){
				plan.style.display = "inline-block";
				// 实时获取鼠标在进度条上的位置
				var x = event.offsetX;
				// 实时获取进度条总长度
				var w = this.offsetWidth;
				// 实时计算点击位置占百分比
				var per = x / w;
				var wb = per * 100 + "%";
				// 视频总时长
				var s = video.duration;
				// 得到秒数
				var miao = per * s;
				// 转换为时间格式
				plan.innerHTML = getFormatTime(miao);
				// 位置实时刷新
				plan.style.left = x - 35 + "px";
			}
		}
		
		// 鼠标释放后
		this.onmouseup = function(){
			//清除鼠标按住时移动的所有操作
			this.onmousemove=null;
			// 实时获取鼠标在进度条上的位置
			var x = event.offsetX;
			// 实时获取进度条总长度
			var w = this.offsetWidth;
			// 实时计算点击位置占百分比
			var per = x / w;
			var currtime = video.duration*per;
			video.currentTime = currtime;
			//重新设置鼠标移动时的操作
			this.onmousemove = function(){
				plan.style.display = "inline-block";
				// 实时获取鼠标在进度条上的位置
				var x = event.offsetX;
				// 实时获取进度条总长度
				var w = this.offsetWidth;
				// 实时计算点击位置占百分比
				var per = x / w;
				var wb = per * 100 + "%";
				// 视频总时长
				var s = video.duration;
				// 得到秒数
				var miao = per * s;
				// 转换为时间格式
				plan.innerHTML = getFormatTime(miao);
				// 位置实时刷新
				plan.style.left = x - 35 + "px";
			}
		}
	}
	
	// 视频静音
	sound_d1.onclick = function(){
		// 是否静音
		var isjy = video.muted;
		if(isjy){ // 判断静音时
			video.muted = false; // 解除静音
			// 改变当前音量按钮标识
			sound_d1.innerHTML = '<svg class="icon" aria-hidden="true"><use xlink:href="#icon-yinliang"></use></svg>';
			// 获取静音前的音量
			var x = video.volume;
			// 计算音量百分比
			var f = x * 100 + "%";
			// 设置音量进度条的宽度
			soundProP2.style.width = f;
			// 计算进度条的像素值
			var spp = soundProP2.offsetWidth;
			
			// 设置音量滑块位置
			soundProD1.style.left = spp - 6 + "px";
		} else {
			video.muted = true; // 改变状态
			// 改变当前音量按钮标识
			sound_d1.innerHTML = '<svg class="icon" aria-hidden="true"><use xlink:href="#icon-jingyin1"></use></svg>';
			// 设置进度条 滑块位置为0
			soundProP2.style.width = 0;
			soundProD1.style.left = 0;
		}
	}
	
	// 鼠标移入
	soundProP3.onmousemove = function(){
		prompt.style.display = "inline-block";
		// 获取鼠标在音量进度条上当前的X位置
		var ylX = event.offsetX;
		// 获取进度条的长度
		var yl = this.offsetWidth;
		// 计算音量在进度条百分比
		var ylbfb = parseInt(ylX / yl * 100) + "%";
		prompt.innerHTML = '音量' + ylbfb;
	}
	soundProP3.onmouseleave = function(){
		prompt.style.display = "none";
	}
	
	// 鼠标按下音量进度条时，音量大小跳跃调节
	soundProP3.onmousedown = function(){
		// 获取鼠标坐标
		var x = event.offsetX;
		// 获取音量总长度
		var w = this.offsetWidth;
		// 获取音量大小
		var yldx = x / w;
		// 设置音量
		video.volume = yldx;
		// 设置百分比
		var ylbfb = yldx * 100 + "%";
		// 设置进度条宽度
		soundProP2.style.width = ylbfb;
		// 计算进度条像素
		var ylxs = soundProP2.offsetWidth;
		// 设置滑块位置
		soundProD1.style.left = ylxs - 6 + "px";
		// 解除静音
		video.muted = false;
		// 改变按钮
		sound_d1.innerHTML = '<svg class="icon" aria-hidden="true"><use xlink:href="#icon-yinliang"></use></svg>';
		// 鼠标按下移动
		this.onmousemove = function(){
			// 实时获取
			// 鼠标位置
			var x = event.offsetX;
			// 总音量长度
			var w = this.offsetWidth;
			// 音量大小
			var yldx = x / w;
			// 设置音量
			video.volume = yldx;
			// 设置百分比
			var ylbfb = parseInt(yldx * 100) + "%";
			// 进度条宽度
			soundProP2.style.width = ylbfb;
			// 进度条像素
			var ylxs = soundProP2.offsetWidth;
			// 滑块位置
			soundProD1.style.left = ylxs - 6 + "px";
			// 显示浮窗
			prompt.style.display = "inline-block";
			// 改变音量显示百分比
			prompt.innerHTML = '音量' + ylbfb;
		}
		this.onmouseout = function(){
			this.onmousemove = null;
			this.onmousemove = function(){
				// 显示浮窗
				prompt.style.display = "inline-block";
				// 鼠标位置
				var x = event.offsetX;
				// 总长度
				var w = this.offsetWidth;
				// 音量大小
				var yldx = x / w;
				// 音量百分比
				var ylbfb = parseInt(yldx * 100) + "%";
				// 音量百分比显示
				prompt.innerHTML = '音量' + ylbfb;
			}
		}
	}
	// 鼠标释放
	soundProP3.onmouseup = function(){
		// 清空鼠标按下操作
		this.onmousemove = null;
		// 鼠标位置
		var x = event.offsetX;
		// 总长度
		var w = this.offsetWidth;
		// 音量大小
		var yldx = x / w;
		// 设置音量
		video.volume = yldx;
		this.onmousemove = function(){
			// 显示浮窗
			prompt.style.display = "inline-block";
			// 鼠标位置
			var x = event.offsetX;
			// 总长度
			var w = this.offsetWidth;
			// 音量大小
			var yldx = x / w;
			// 音量百分比
			var ylbfb = parseInt(yldx * 100) + "%";
			// 音量百分比显示
			prompt.innerHTML = '音量' + ylbfb;
		}
	}
	// 全屏播放
	ful.onclick = function(){
		video.webkitRequestFullScreen();
	}
})