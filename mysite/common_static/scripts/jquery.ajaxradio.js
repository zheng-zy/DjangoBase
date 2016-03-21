/**
 * 作者：郑文
 * 从服务端获取json动态创建radio
 * json格式：
 * [
 *   {
 *       "text": "是",
 *       "value": "1"
 *   },
 *   {
 *       "text": "否",
 *       "value": "0",
 *       "checked": true
 *   }
 * ]
 */
;
(function($, window, document, undefined) {
	var methods = {
		init : function(options) {

		},
		ajaxRadio : function(options) {
			var $div = this;
			var $parent = $div.parent();
			var defaults = {
				url : "",
				data : {},
				name : "ajaxRadio",
				textField:'text',
				valueField:'value',
				disabled:false
			};
			var opts = $.extend({}, defaults, options);
			$.getJSON(opts.url, opts.data, function(jsonarr){
					var type = jQuery.type(jsonarr);
					if(type === 'array'){
						$div.detach();
						//动态创建radio
						$.each( jsonarr, function(index, json){
								var text = json[opts.textField];
								var value = json[opts.valueField];
								var isChecked = json.checked;
								$radio = $("<input type='radio' name='"+opts.name+"' value='"+value+"'>"+text+"&nbsp;&nbsp;</input>");
								if(isChecked){
									$radio.attr('checked',true);
								}
								$radio.appendTo($div);
							});
						if($('input:radio',$div).length > 0){
							if($('input:radio:checked',$div).length <= 0){
								$('input:radio',$div).first().attr('checked',true);
							}
							$('input:radio',$div).attr('disabled',opts.disabled);
						}
						$div.appendTo($parent);
					} else {
						$.error('返回的数据格式不正确！');
					}
				});
		}
	};

	$.fn.ajaxRadio = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('方法 ' + method + '在ajaxRadio中不存在！');
		}

	};
})(jQuery, window, document);