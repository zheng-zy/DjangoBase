//全屏打开窗口
function fnShowWindowMax(sUrl, sFeatures, sName) {
	var newWin;
	if (typeof (sFeatures) != "string") {
		sFeatures = "status=1,resizable=0,scrollbars=yes";
	}
	if (typeof (sName) != "string") {
		sName = "_blank";
	}
	newWin = window.open(sUrl, sName, sFeatures);
	newWin.window.moveTo(0, 0);
	newWin.window.resizeTo(window.screen.availWidth, window.screen.availHeight);
	// return false;
}

// 添加验证方法
function initValidate() {
	$.extend($.fn.validatebox.defaults.rules, {
		equals : {
			validator : function(value, param) {
				return value == $(param[0]).val();
			},
			message : '无法匹配密码.'
		},

		// 验证汉字
		CHS : {
			validator : function(value) {
				return /^[\u0391-\uFFE5]+$/.test(value);
			},
			message : '只能输入汉字.'
		},
		// 移动手机号码验证
		Mobile : {// value值为文本框中的值
			validator : function(value) {
				var reg = /^1[3|4|5|8|9]\d{9}$/;
				return reg.test(value);
			},
			message : '请输入准确你的电话号码.'
		},
		// 国内邮编验证
		ZipCode : {
			validator : function(value) {
				var reg = /^[0-9]\d{5}$/;
				return reg.test(value);
			},
			message : '只能输入国内邮编.'
		}

	});

}

// 初始化 下拉列表等数据
function initUI(data) {
	// 格式例子
	// {"readonlyList":["nn1","nn2"],"defaultValues":{"starttime":"2015-5-5
	// 21:54:09","nn3":1},
	// "comboValues":{"xlmrvalue1":[{"item_cn":"item_cn1","item_value":"1"},{"item_cn":"item_cn2","item_value":"2"}],"xlmrvalue2":[{"item_cn":"item_cn3","item_value":"3"},{"item_cn":"item_cn4","item_value":"4"}]}}

	// 默认下拉值
	// alert(data.comboValues);
	for ( var key in data.comboValues) {
		var value = data.comboValues[key];
		var onename = $('#' + key).get(0).tagName;
		// alert("comboValues.onename=" + onename + ",value=" + value);
		if (onename == 'SELECT') {
			$("#" + key).combobox('loadData', value);
		}
	}

	// 默认值
	// alert(data.defaultValues);
	for ( var key in data.defaultValues) {
		// alert("属性：" + key + ",值："+ data.defaultValues[key]);

		var onedata = data.defaultValues[key];
		var onename = $('#' + key).get(0).tagName;
		// alert("defaultValues.onename="+onename+",onedata="+onedata);
		if (onename == 'INPUT') {
			$("#" + key).textbox("setValue", onedata);
		} else if (onename == 'SELECT') {
			$("#" + key).combobox("setValue", onedata);
		}
	}
	// $.each(data.defaultValues,function(key,value){
	// alert("key:"+key+";value:"+value);
	// });

	// 不可编辑
	// alert(data.readonlyList);
	size = data.readonlyList.length;
	if (size > 0) {
		for ( var i = 0; i < size; i++) {
			var onedata = data.readonlyList[i];
			var onename = $('#' + onedata).get(0).tagName;
			// alert("readonlyList.onename="+onename+",text="+onedata);
			if (onename == 'INPUT') {
				$("#" + onedata).textbox({
					// editable : false//界面效果不明显修改
					disabled : true
				});
			} else if (onename == 'SELECT') {
				$("#" + onedata).combobox({
					// editable : false//界面效果不明显修改
					disabled : true
				});
			}
		}
	}

}


//扩展日期转换为字符串
Date.prototype.format = function(format) {
	var o = {
		"M+" : this.getMonth() + 1, // month
		"d+" : this.getDate(), // day
		"h+" : this.getHours(), // hour
		"m+" : this.getMinutes(), // minute
		"s+" : this.getSeconds(), // second
		"q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
		"S" : this.getMilliseconds()
	// millisecond
	}

	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	}

	for ( var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
					: ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
}

function convertDateToStr(obj){
	var type = typeof obj;
	if (type != "undefined") {
		alert(type);
		if (typeof obj == "object"){
			return obj.format('yyyyMMdd hh:mm:ss');
		}
	}
	return obj;	
}



jQuery.extend({
	/** 校验是否为空 */
	isNotBlank : function(obj) {
		var type = typeof obj;
		if (type != "undefined") {
			if (typeof obj == "string" && obj.length > 0) {
				return true;
				;
			}
		}
		return false;
	}
});

// js方法：序列化
// fields：serializeArray()后的数组对象
/*
 * 转换前 [ {name: 'firstname', value: 'Hello'}, {name: 'btnIds', value: 1}, {name:
 * 'btnIds', value: 2}, {name: 'btnIds', value: 3} ] ↓↓↓↓ 转换后
 * {'firstname':'Hello', 'btnIds':'1, 2, 3'}
 */
function serializeObj(fields) {
	var obj = {};
	$.each(fields, function(index) {
		if (obj[this['name']]) {
			obj[this['name']] = obj[this['name']] + ',' + this['value'];
		} else {
			obj[this['name']] = this['value'];
		}
	});
	return obj;
}

// 修改serializeArray序列化后的对象中name的值
// fields：serializeArray()后的数组对象
// oldName：旧名，例如btnId
// newName：新名：例如btnIds
/*
 * 转换前 [ {name: 'firstname', value: 'Hello'}, {name: 'btnId', value: 1}, {name:
 * 'btnId', value: 2}, {name: 'btnId', value: 3} ] ↓↓↓↓ 转换后 [ {name:
 * 'firstname', value: 'Hello'}, {name: 'btnIds', value: 1}, {name: 'btnIds',
 * value: 2}, {name: 'btnIds', value: 3} ]
 */
function updateSerializeObjName(fields, oldName, newName) {
	$.each(fields, function(i, field) {
		var name = field['name'];
		if (name === oldName) {
			field['name'] = newName;
		}
	});
	return fields;
}

// 处理异常
function alertError(data, errorInfo) {
	if (data && jQuery.type(data) === "string") {
		try {
			data = jQuery.parseJSON(data);
		} catch (e) {
			alert('返回的字符串不是json格式！');
			return false;
		}
	}
	var type = jQuery.type(data);
	if (type === 'object' || type === 'array') {
		if (data.error) {
			$.messager.alert('错误信息', errorInfo, 'error');
			return false;
		}
	}
	return true;
}

//处理excel导出
function fnOpenPostWindow(url, params, name)    {    
    var tempForm = document.createElement("form");    
 
    tempForm.id="tempForm1";    		  
    tempForm.method="post";    		  
    tempForm.action=url;    		  
    tempForm.target="win_"+name;     
 
 	for(i=0;params!=null&&i<params.length;i++) {
	     var hideInput = document.createElement("input");    		  
	     hideInput.type="hidden";    		  
	     hideInput.name= params[i].param; 		  
	     hideInput.value= params[i].value; 		  
	     tempForm.appendChild(hideInput);   
    }
      		  
//	     tempForm.attachEvent("onsubmit",function(){ window.open('about:blank',name) });  		  
    document.body.appendChild(tempForm);   		  
    //tempForm.fireEvent("onsubmit");  		  
    tempForm.submit();  		  
    document.body.removeChild(tempForm);  		  
}  

//遮罩层
function BtHide(id){var Div = document.getElementById(id);if(Div){Div.style.display="none"}} 
function BtShow(id){var Div = document.getElementById(id);if(Div){Div.style.display="block"}} 

function BtPopload(showId,prompt){ 
	// 高度减去 4px，避免在页面无滚动条时显示遮罩后出现流动条 
	var div = document.getElementById(showId);
	var h =div.offsetHeight + 'px';
	var w = div.offsetWidth + 'px';
	var top=document.getElementById(showId).offsetTop + 'px';
	var left=document.getElementById(showId).offsetLeft + 'px';
	var popCss = "background:#000;background-color:rgba(231, 240, 255, 0.5);filter:alpha(opacity=30);position:absolute;left:"+left+";top:"+top+";overflow:hidden;border:0"//遮罩背景
	var rePosition_mask = function() {
		pop_Box.style.height = h;
		pop_Box.style.width = w;
		if (document.documentElement.offsetWidth < 950) {
			//防止正常宽度下点击时 在 ff 下出现页面滚动到顶部 
			document.documentElement.style.overflowX = "hidden";
		} 
	} 
	var exsit = document.getElementById(showId+"zz");
	
	if (!exsit) { 
		var pop_Box = document.createElement("div");
		pop_Box.id = showId+"zz"; 
		document.getElementsByTagName("body")[0].appendChild(pop_Box); 
		pop_Box.style.cssText = popCss; 
		pop_Box.style.zIndex = "1"; 
		//添加img
		var img = document.createElement("img");
		img.setAttribute("id", "newImg");
		img.src = "./xz.gif";
		img.style.position = "absolute";
		img.width = "40";
		img.height = "40";
		img.style.left= ((div.offsetWidth-img.width)/2)+"px";
		img.style.top= ((div.offsetHeight-img.width)/2)+"px";
		pop_Box.appendChild(img);
		//添加标签元素
		var cue = document.createElement("div");
		cue.style.position = "absolute";
		cue.innerHTML = prompt;
		//alert(cue.innerHTML.length);
		cue.style.left= ((div.offsetWidth-cue.innerHTML.length*16)/2)+"px";
		cue.style.top= ((div.offsetHeight-img.width)/2+40)+"px";
		
		pop_Box.appendChild(cue);
		rePosition_mask(); 
	} 
	//添加img
	var img = document.createElement("img");
	img.setAttribute("id", "newImg");
	img.src = "./xz.gif";
	img.style.position = "absolute";
	img.width = "40";
	img.height = "40";
	img.style.left= ((div.offsetWidth-img.width)/2)+"px";
	img.style.top= ((div.offsetHeight-img.width)/2)+"px";
	exsit.appendChild(img);
	BtShow(showId+"zz"); 
	window.onresize = function(){ 
		w = document.documentElement.offsetWidth + 'px'; // 使用 scrollWidth 不能改变宽度 
		rePosition_mask(); 
	}
}

//打开遮罩层
function openmask(divid,prompt){
	BtPopload(divid,prompt);
}
//关闭遮罩层
function closemask(divid){
	BtHide(divid+"zz");
}


