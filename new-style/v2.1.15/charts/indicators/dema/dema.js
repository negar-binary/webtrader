define(["jquery","jquery-ui","color-picker","ddslick"],function(a){function b(){a(this).dialog("close"),a(this).find("*").removeClass("ui-state-error")}function c(c,e){require(["css!charts/indicators/dema/dema.css"]),require(["text!charts/indicators/dema/dema.html","text!charts/indicators/indicators.json"],function(f,g){var h="#cd0a0a";f=a(f),f.appendTo("body"),g=JSON.parse(g);var i=g.dema;f.attr("title",i.long_display_name),f.find(".dema-description").html(i.description),f.find("input[type='button']").button(),f.find("#dema_stroke").colorpicker({showOn:"click",position:{at:"right+100 bottom",of:"element",collision:"fit"},part:{map:{size:128},bar:{size:128}},select:function(b,c){a("#dema_stroke").css({background:"#"+c.formatted}).val(""),h="#"+c.formatted},ok:function(b,c){a("#dema_stroke").css({background:"#"+c.formatted}).val(""),h="#"+c.formatted}});var j="Solid";a("#dema_dashStyle").ddslick({imagePosition:"left",width:150,background:"white",onSelected:function(b){a("#dema_dashStyle .dd-selected-image").css("max-height","5px").css("max-width","115px"),j=b.selectedData.value}}),a("#dema_dashStyle .dd-option-image").css("max-height","5px").css("max-width","115px"),f.dialog({autoOpen:!1,resizable:!1,width:350,height:400,modal:!0,my:"center",at:"center",of:window,dialogClass:"dema-ui-dialog",buttons:[{text:"OK",click:function(){var c=a(".dema_input_width_for_period");if(!_.isInteger(_.toNumber(c.val()))||!_.inRange(c.val(),parseInt(c.attr("min")),parseInt(c.attr("max"))+1))return require(["jquery","jquery-growl"],function(a){a.growl.error({message:"Only numbers between "+c.attr("min")+" to "+c.attr("max")+" is allowed for "+c.closest("tr").find("td:first").text()+"!"})}),void c.val(c.prop("defaultValue"));var e={period:parseInt(f.find(".dema_input_width_for_period").val()),stroke:h,strokeWidth:parseInt(f.find("#dema_strokeWidth").val()),dashStyle:j,appliedTo:parseInt(f.find("#dema_appliedTo").val())};d&&d(),a(a(".dema").data("refererChartID")).highcharts().series[0].addIndicator("dema",e),b.call(f)}},{text:"Cancel",click:function(){b.call(this)}}]}),f.find("select").selectmenu({width:150}),a.isFunction(e)&&e(c)})}var d=null;return{open:function(b,e){var f=function(){d=e,a(".dema").data("refererChartID",b).dialog("open")};0==a(".dema").length?c(b,this.open):f()}}});