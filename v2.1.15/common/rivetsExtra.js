define(["lodash","jquery","rivets","moment","jquery-ui","jquery-sparkline","color-picker"],function(a,b,c,d){function e(a){var b=(""+a).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);return b?Math.max(0,(b[1]?b[1].length:0)-(b[2]?+b[2]:0)):0}function f(b,c){setTimeout(function(){for(var d=0;d<c.length;++d){var e=c[d],f=a.last(e.split(".")),g=b.observers[f];g&&b.componentView.observe(e,function(a){g.setValue(a)})}},0)}return rivets._.View.prototype.observe=function(a,b){for(var c,d=this.models;-1!==(c=a.indexOf("."));)d=d[a.substring(0,c)],a=a.substring(c+1);this.adapters["."].observe(d,a,function(){b(d[a])})},c.formatters.i18n=function(a){return"string"==typeof a?a.i18n():a},c.formatters.prop=function(a,b){return a&&a[b]},c.formatters["one-of"]=function(){for(var a=[].slice.call(arguments,0),b=a[0],c=1;c<a.length;++c)if(a[c]===b)return!0;return!1},c.formatters.trim=function(b){return a.trim(b)},c.formatters.negate=function(a){return!a},c.formatters.eq=function(a,b){return a===b},c.formatters["not-eq"]=function(a,b){return a!==b},c.formatters.or=function(a,b){return a||b},c.formatters["or-not"]=function(a,b){return a||!b},c.formatters.and=function(a,b){return a&&b},c.formatters["and-not"]=function(a,b){return a&&!b},c.formatters.gt=function(a,b){return a>b},c.formatters.lt=function(a,b){return b>a},c.formatters.capitalize={read:function(b){return a.capitalize(b)},publish:function(a){return a.toLowerCase()}},c.formatters["to-fixed"]=function(a,c){return b.isNumeric(a)&&b.isNumeric(c)?(1*a).toFixed(c||2):void 0},c.formatters["format-price"]=function(a,b){return a?formatPrice(a,b):void 0},c.formatters.notify=function(){for(var b=[].slice.call(arguments,0),c=b[0],d=1;d<b.length;++d)a.defer(b[d],c);return c},c.formatters.checkbox={read:function(b,c){return b=a.trim(b," '\""),b===c},publish:function(b,c,d){return c=a.trim(c," '\""),d=a.trim(d," '\""),b?c:d}},c.formatters.bind=function(a,b){return a.bind(void 0,b)},c.formatters.map=function(b,c){return a.map(b,c)},c.formatters.prepend=function(a,b){return b&&a?b+a:a},c.formatters.append=function(a,b){return b&&a?a+b:a},c.formatters.ternary=function(a,b,c){return a?b:c},c.formatters.currency=function(a,b){var c={USD:"$",EUR:"€",CRC:"₡",GBP:"£",ILS:"₪",INR:"₹",JPY:"¥",KRW:"₩",NGN:"₦",PHP:"₱",PLN:"zł",PYG:"₲",THB:"฿",UAH:"₴",VND:"₫"};return a?(c[b]||b)+a:a},c.formatters["utc-time"]=function(a){var b=new Date(1e3*a);return("00"+b.getUTCHours()).slice(-2)+":"+("00"+b.getUTCMinutes()).slice(-2)+":"+("00"+b.getUTCSeconds()).slice(-2)},c.formatters.moment=function(a,b){return b=b||"YYYY-MM-DD HH:mm:ss",a&&d.utc(1e3*a).format(b)},c.formatters["moment-humanize"]=function(b,c){if(!b||!c)return void 0;var e="",f=c-b,g=d.duration(f,"seconds");return g.days()>0&&(e+=" "+g.days()+" "+(g.days()>1?"days":"day")),g.hours()>0&&(e+=" "+g.hours()+" "+(g.hours()>1?"hours":"hour")),g.minutes()>0&&(e+=" "+g.minutes()+" "+(g.minutes()>1?"minutes":"minute")),g.seconds()>0&&600>f&&(e+=" "+g.seconds()+" "+(g.seconds()>1?"seconds":"second")),a.trim(e).i18n()},c.formatters["bold-last-character"]=function(b){return b+="",b.substring(0,b.length-1)+"<strong>"+a.last(b)+"</strong>"},c.formatters["percent-of"]=function(a,b){return void 0!==a&&b?(100*(a-b)/b).toFixed(2)+"%":void 0},c.formatters["is-valid-email"]=function(a){return""===a||validateEmail(a)},c.formatters["is-valid-date"]=function(a,b){return b=b||"YYYY-MM-DD",d(a,b,!0).isValid()},c.formatters["is-valid-regex"]=function(a,b){return b=new RegExp(b),b.test(a)},c.formatters.debounce=function(a,b,c){return c=c||250,clearTimeout(b._timer_notify),b._timer_notify=setTimeout(b.bind(void 0,a),c),a},c.binders.colorpicker={priority:101,publishes:!0,bind:function(a){var c=this.publish;b(a).colorpicker({showOn:"click",position:{at:"right+100 bottom",of:"element",collision:"fit"},part:{map:{size:128},bar:{size:128}},select:function(a,b){b.formatted&&c(b.formatted)},ok:function(a,b){c(b.formatted)}})},unbind:function(a){b(a).colorpicker("destroy")},routine:function(a,c){c=-1!=c.indexOf("#")?c:"#"+c,b(a).val(c).css("background",c).css("color",c)}},c.binders.selectmenu={priority:100,publishes:!0,bind:function(a){var c=this.publish,d=b(a);d.selectmenu({change:function(){c(d.val()),d.trigger("change")}})},unbind:function(a){b(a).selectmenu("destroy")},routine:function(a,c){a=b(a),a.val(c),a.find("option[value='"+c+"']").length>0&&a.selectmenu("refresh")}},c.binders["selectmenu-*"]=function(a,c){b(a).selectmenu("option",this.args[0],c)},c.binders.selectrefresh={priority:99,routine:function(a,c){a=b(a),("string"!=typeof c||(a.val(c),0!==a.find("option[value='"+c+"']").length))&&a.selectmenu("refresh")}},b.widget("ui.webtrader_spinner",b.ui.spinner,{_buttonHtml:function(){var a=function(a,b,c,d,e){return b="ui-icon-"+b+"-1-"+("up"===a?"n":"s"),e="right: "+(e||"0px")+";",d=d||"5px",d="border-radius: 0 "+("up"==a?d+" 0":"0 "+d)+" 0","<button step='"+c+"' class='ui-spinner-button ui-spinner-"+a+"' style='"+e+d+"'><span class='ui-icon "+b+"'>&#9650;</span></button>"},b="";return b+=a("up","triangle",this.options.step_big||this.options.step,"5px"),b+=a("down","triangle","-"+(this.options.step_big||this.options.step),"5px")}}),c.binders.spinner={priority:98,publishes:!0,bind:function(a){var c=(this.model,this.publish),d=b(a);d.webtrader_spinner({stop:function(){var a=d.val();c(1*a)},spin:function(a){var c=b(a.currentTarget).attr("step")+"",d=(c.split(".")[1]||[]).length;value=1*b(this).val()+1*c,b(this).val(value.toFixed(d)),a.preventDefault()},step:d.attr("step")||1,step_big:d.attr("step-big")||null})},unbind:function(a){b(a).webtrader_spinner("destroy")},routine:function(a,c){b(a).webtrader_spinner("value",1*c)}},c.binders["spinner-*"]=function(a,c){b(a).webtrader_spinner("option",this.args[0],c)},c.binders.tooltip={priority:97,bind:function(a){b(a).attr("title"," "),b(a).tooltip()},unbind:function(a){b(a).tooltip().tooltip("destroy")},routine:function(a,c){c?b(a).tooltip("enable").tooltip("option","content",c):b(a).tooltip("disable")}},c.binders["tooltip-*"]=function(a,c){b(a).tooltip("option",this.args[0],c)},c.binders["dialog-*"]=function(a,c){b(a).dialog("option",this.args[0],c)},c.binders.datepicker={priority:94,publishes:!0,bind:function(a){var c=b(a),d=this.publish,e=this.model,f={marginTop:c.attr("marginTop")||"0px",marginLeft:c.attr("marginLeft")||"0px"},g={showOn:e.showOn||"focus",numberOfMonths:1*c.attr("numberOfMonths")||2,dateFormat:e.dateFormat||"yy-mm-dd",showAnim:e.showAnim||"drop",showButtonPanel:void 0!==e.showButtonPanel?e.showButtonPanel:!0,changeMonth:e.changeMonth||!0,changeYear:e.changeYear||!0,onSelect:function(){b(this).change()},beforeShow:function(a,b){b.dpDiv.css(f)}};e.yearRange?g.yearRange=e.yearRange:(g.maxDate=e.maxDate||null,g.minDate=e.minDate||0);c.datepicker(g);c.on("change",function(){var a=c.val();d(a),c.blur()}),b.datepicker._gotoToday=function(a){b(a).datepicker("setDate",new Date).change().datepicker("hide")}},unbind:function(a){b(a).datepicker("destroy")},routine:function(a,c){b(a).datepicker("setDate",c)}},c.binders.timepicker={priority:93,publishes:!0,bind:function(a){var c=b(a),d=this.publish,e=this.model,f=function(){return!0},g={marginTop:c.attr("marginTop")||"0px",marginLeft:c.attr("marginLeft")||"0px"},h=function(){var a=c.val();d(a)};c.timepicker({showPeriod:e.showPeriod||!1,showLeadingZero:e.showLeadingZero||!0,showCloseButton:e.showCloseButton||!0,showNowButton:e.showNowButton||!1,onHourShow:e.onHourShow||f,onMinuteShow:e.onMinuteShow||f,beforeShow:function(a,b){b.tpDiv.css(g)},onClose:h,onSelect:h})},unbind:function(a){b(a).timepicker("destroy")},routine:function(a,c){b(a).val(c)}},c.binders["jq-class"]={priority:92,routine:function(a,c){a=b(a);var d=b("#"+a.attr("id")+"-menu");d.removeClass(a.data("jq-class")),a.data({"jq-class":c}),d.addClass(c)}},c.binders["input-default-btn"]=function(a,c){b(a).keyup(function(a){13==a.keyCode&&b(c).click()})},c.binders["css-*"]=function(a,c){var d={};d[this.args[0]]=c,b(a).css(d)},c.binders.show=function(a,b){return a.style.display=b?"":"none",b},c.binders.visible=function(a,b){return a.style.visibility=b?"visible":"hidden",b},c.binders.disabled=function(a,c){c?b(a).attr("disabled","disabled"):b(a).removeAttr("disabled")},c.binders["auto-scroll-bottom"]={priority:91,routine:function(a){b(a).animate({scrollTop:a.scrollHeight-b(a).height()},"slow")}},c.binders["decimal-round"]={priority:3001,routine:function(a,c){var d={0:1,1:10,2:100,3:1e3,4:1e4,5:1e5}[c];a=b(a),a.on("input",function(){var b=a.attr("prefered-sign")||"",f=a.attr("no-symbol"),g=a.val();if(""!==g&&"-"!==g&&("+"!==g||f)){var h=e(g);if(!(h&&c>=h)){var i=g.endsWith(".")?".":"",j=g[0];j="+"===j||"-"===j?j:"",g=g.replace(/[^\d.-]/g,""),g=Math.round(g*d)/d,g=Math.abs(g),isNaN(g)||(b&&""===j&&(j=b),f&&(j=""),a.val(j+g+i))}}})}},c.binders["attr-*"]={priority:1e4,routine:function(a,b){a.setAttribute(this.args[0],b)}},c.binders.sparkline=function(a,c){var d=b(a),e={type:"line",lineColor:"#606060",fillColor:!1,spotColor:"#00f000",minSpotColor:"#f00000",maxSpotColor:"#0000f0",highlightSpotColor:"#ffff00",highlightLineColor:"#000000",spotRadius:1.25};setTimeout(function(){d.sparkline(c,e),c.length?d.show():d.hide()},0)},c.binders["indicative-color"]=function(a,c){var d=1*(a._perv_indicative_color||0),e="#d71818",f="#02920e",g="black";b.isNumeric(c)?d!==1*c&&b(a).css({color:1*c>d?f:e}):b(a).css({color:g}),a._perv_indicative_color=c},rivets.components["price-spinner"]={"static":["class","min","decimals"],template:function(){return'<span class="ui-spinner ui-widget ui-widget-content ui-corner-all"><input rv-class="data.class" type="text" rv-value="data.value" rv-decimal-round="data.decimals | or 5" no-symbol="no-symbol" /><button rv-on-click="increment" step="1" class="ui-spinner-button ui-spinner-up ui-button ui-widget ui-state-default ui-button-text-only" style="right: 0px;border-radius: 0 5px 0 0" tabindex="-1" role="button"><span class="ui-button-text"> <span class="ui-icon ui-icon-triangle-1-n">▲</span> </span></button><button rv-on-click="decrement" step="-1" class="ui-spinner-button ui-spinner-down ui-button ui-widget ui-state-default ui-button-text-only" style="right: 0px;border-radius: 0 0 5px 0" tabindex="-1" role="button"><span class="ui-button-text"> <span class="ui-icon ui-icon-triangle-1-s">▼</span> </span></button></span>'},initialize:function(a,b){var c=1*(b.decimals||2),d=1*(b.min||0);return f(this,["data.value"]),{data:b,increment:function(){var a=1*b.value;a=1>a?a+.1:a+1,(0|a)!==a&&(a=a.toFixed(c)),b.value=a},decrement:function(){var a=1*b.value;a=a>1?a-1:a-.1,(0|a)!==a&&(a=a.toFixed(c)),a>d&&(b.value=a)}}}},c});