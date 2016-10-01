define(["jquery", 'common/rivetsExtra', 'text!charts/indicators/indicators.json', "lodash", 'ddslick', 
	"jquery-growl", 'css!charts/indicators/indicatorBuilder/indicatorBuilder.css'], function( $, rv, ind_json, _ ) {

		class IndicatorWindow {
			constructor(containerIDWithHash, ind_shrt, before_add_cb){
				const curr_ind = JSON.parse(ind_json)[ind_shrt],
					win = this.init_window(containerIDWithHash, curr_ind, before_add_cb);

				this.state = this.init_state(win, curr_ind, containerIDWithHash);
				this.view = rv.bind(win, this.state);
			}

			init_window(containerIDWithHash, ind, before_add_callback){
				const cls_obj = this;
				return $(
					'<div>\
    				<table width="100%">\
    					<tr>\
			          <td colspan="2" rv-text="description">\
			          </td>\
			        </tr>\
			      </table>\
			     </div>'
			  ).attr('title',ind.long_display_name).dialog({
			  	autoOpen: true,
          resizable: false,
          width: 350,
          height:400,
          modal: true,
          my: 'center',
          at: 'center',
          of: window,
          dialogClass:'ind-ui-dialog',
          buttons: [
            {
              text: "OK",
              click: function() {
                  const is_valid = cls_obj.checks.length === 1 ? cls_obj.checks[0]() : cls_obj.checks.reduce((a,b)=>{return a() && b();});
                  
                  if(!is_valid) return;
                  
                  const options = cls_obj.state.options;
                  
                  before_add_callback && before_add_callback();
                  
                  console.log(options);
                  //Add ATR for the main series
                  $(containerIDWithHash).highcharts().series[0].addIndicator(ind.short_display_name.toLowerCase(), options);

                  $(this).dialog("close");
                  cls_obj.unbind();
              }
            },
            {
              text: "Cancel",
              click: function() {
                  $(this).dialog("close");
                  cls_obj.unbind();
              }
            }
          ]
			  });
			}
		
			init_state(root, indicator, containerIDWithHash){
				const table = $(root).find("table"),
					state = {},
					checks = [];

				const creatElement = {
					row: (field_name, elem) => {
						const row = $("<tr></tr>");
						field_name && row.append("<td><strong>" + field_name + "</strong></td>");
						row.append(elem.appendTo($("<td></td>")));
						table.append(row);
					},
					input: (f) => {
						state.options[f.option_name] = f.default;
						const elem = $("<input type='number' rv-value='options." + f.option_name + " | parseInt'>");
						elem.attr("min", f.min).attr("max", f.max);
						checks.push(() => {
							if(!_.inRange(this.state.options[f.option_name], f.min, f.max+1)){
								$.growl.error({
									message: "Only numbers between " + f.min + " to " + f.max + " is allowed for " + f.name + "!"
								});
								return false;
							}
							return true;
						});
						return elem;
					},
					color: (f) => {
						state.options[f.option_name] = f.default;
						const elem = $("<input type='button' class='stroke' rv-colorpicker='options." + f.option_name + "'>").button();
						elem.css("background",f.default);
						return elem;
					},
					strokeWidth: (f) => {
						state.options[f.option_name] = f.default;
						const elem = $('\
							<select rv-selectmenu="options.' + f.option_name + ' | parseInt" rv-selectmenu-width="150">\
                <option value="1">1</option>\
                <option value="2">2</option>\
                <option value="3">3</option>\
                <option value="4">4</option>\
                <option value="5">5</option>\
                <option value="6">6</option>\
                <option value="7">7</option>\
                <option value="8">8</option>\
                <option value="9">9</option>\
                <option value="10">10</option>\
              </select>');
						return elem;
					},
					dashStyle: (f) => {
						state.options[f.option_name] = f.default;
						const elem = $('\
							<select class="dash" rv-ddslick="options.' + f.option_name + '">\
                <option value="Solid" data-imagesrc="images/dashstyle/Solid.svg" title="Solid"></option>\
                <option value="ShortDash" data-imagesrc="images/dashstyle/ShortDash.svg"></option>\
                <option value="ShortDot" data-imagesrc="images/dashstyle/ShortDot.svg"></option>\
                <option value="ShortDashDot" data-imagesrc="images/dashstyle/ShortDashDot.svg"></option>\
                <option value="ShortDashDotDot" data-imagesrc="images/dashstyle/ShortDashDotDot.svg"></option>\
                <option value="Dot" data-imagesrc="images/dashstyle/Dot.svg"></option>\
                <option value="Dash" data-imagesrc="images/dashstyle/Dash.svg"></option>\
                <option value="LongDash" data-imagesrc="images/dashstyle/LongDash.svg"></option>\
                <option value="DashDot" data-imagesrc="images/dashstyle/DashDot.svg"></option>\
                <option value="LongDashDot" data-imagesrc="images/dashstyle/LongDashDot.svg"></option>\
                <option value="LongDashDotDot" data-imagesrc="images/dashstyle/LongDashDotDot.svg"></option>\
              </select>');
						return elem;
					},
					appliedTo: (f) => {
						state.options[f.option_name] = f.default;
						const elem = $('\
							<select rv-selectmenu="options.' + f.option_name + ' | parseInt" rv-selectmenu-width="150">\
	              <option value="0">OPEN</option>\
	              <option value="1">HIGH</option>\
	              <option value="2">LOW</option>\
	              <option value="3" selected>CLOSE</option>\
              </select>\
						');
						return elem;
					},
					levels: (f) => {
						state.options[f.option_name] = f.default;
						const elem = $('\
							<td colspan="2">\
								<div id="levels">\
									<table rv-level="options.levels" class="display">\
		                <thead>\
		                  <tr>\
		                    <td>Level</td>\
		                    <td>Stroke</td>\
		                    <td>Stroke width</td>\
		                    <td>Dash style</td>\
		                  </tr>\
		                </thead>\
		                <tbody>\
		                </tbody>\
		              </table>\
		             </div>\
	             </td>\
						');
						const buttons = $('\
							<tr>\
		            <td><button id="level_delete" rv-on-click="levels.delete">Delete level(s)</button></td>\
		            <td><button id="level_add" rv-on-click="levels.add">Add level</button></td>\
			        </tr>\
						');
						table.append(buttons);
						return elem;
					}
				} 

				state.description = indicator.description;
				state.options = {};
				indicator.fields.forEach((field) => {
					creatElement.row(field.name, creatElement[field.type](field));
				});
				state.levels = {
					add: (event,scope) => {
						require(["indicator_levels"], (lvl) => {
							lvl.open(containerIDWithHash,(levels) => {
								scope.options.levels.push(levels[0]);
							});
						});
					},
					delete: (event, scope) => {
						const levels = $.find(".levels_selected");
						if(levels.length == 0){
							$.growl.error({
								message: "Select level(s) to delete!"
							});
						}
						let lvl_cpy = scope.options.levels.slice();
						$.each(levels, (index, ele) =>{
							lvl_cpy.splice($(ele).data("index")-index,1); //Weird, huh? :D
						});
						console.log(lvl_cpy);
						scope.options.levels = lvl_cpy;
					}
				}
		    /*binder for ddslick-select-menu*/
		    rv.binders.ddslick = {
		        priority: 102,
		        publishes: true,
		        bind: function(el) {
		            var publish = this.publish;
		            $(el).ddslick({
		                imagePosition: "left",
		                width: 151,
		                background: "white",
		                onSelected: function(data) {
		                    publish(data.selectedData.value);
		                }
		            });
		        },
		        unbind: function(el) {
		            $(el).ddslick('destroy');
		        }
		    };

		    rv.binders.level = {
		    	priority: 102,
		    	publishes: true,
		    	routine: (el, levels) => {
		    		console.log("called",levels);
		    		el = $(el);

		    		//Remove existing values on change
		    		el.find("tr").each((index, row) => {
		    			//Avoid removing heading.
		    			if(index==0)
		    				return;
		    			$(row).remove();
		    		});

		    		if(levels.length==0){
		    			el.append($('<tr><td colspan="4"><div class="no-data">No data available in table</div></td></tr>'));
		    			return;
		    		}
		    		$.each(levels, (index, value) => {
		    			const row = $('\
		    				<tr>\
			    				<td>' + value.level + '</td>\
			    				<td><div style="background-color: ' + value.stroke + ';width:100%;height:20px;"></div></td>\
			    				<td>' + value.strokeWidth + '</td>\
			    				<td><div style="width:50px;overflow:hidden;margin: 0 auto;height: 20px;"><img src="images/dashstyle/' + value.dashStyle + '.svg" /></div</td>\
			    			</tr>\
		    			');
		    			row.click( function() {
		    				$(this).toggleClass("levels_selected");
		    			}).data("index",index);
		    			el.append(row);
		    		});
		    	}
		    }

		    // Covert value to int
		    rv.formatters.parseInt = {
		        publish: function(value) {
		            return parseInt(value);
		        }
		    };

				this.checks = checks;

				return state;
			}

			unbind() {
	      this.view && this.view.unbind();
	      this.view = null;
	    }

		}

		return {
			open: (containerIDWithHash, ind_shrt, before_add_cb) => new IndicatorWindow(containerIDWithHash, ind_shrt, before_add_cb)
		}
});
