/**
 * All the custom directives are included in same module
 */


/*
 * 	Custom directives, maybe need separate them into 2 groups:  
 * 	1, system_directives for vaselite;  2,  app_directives for all Sites
 */

var cstmDirectives = angular.module("cstmDirectives", []);

	/*
	 * The example for the custom click event handle directive, cstm-click.
	 */
	/*cstmDirectives.directive('cstmClick', function($parse){
		return function(scope, el, attrs){
					var fn = $parse(attrs.cstmClick);
					el.on('click', function(event){
						scope.$apply(function() {
			            fn(scope, {$event:event});});
					});
		};
	});*/
	
	/*
	 * Define multiple drag-events handlers by a loop
	 */

	angular.forEach(['cstmDragstart','cstmDragover','cstmDragenter','cstmDragleave','cstmDragend','cstmDrop'],function(eventName){
		cstmDirectives.directive(eventName, function($parse){
			return function(scope, el, attrs){
						var fn = $parse(attrs[eventName]);
						el.on(angular.lowercase(eventName.substring(4)), function(event){
							//Apply a function (or expression) upon a scope. $apply will perform the internal data-binding mechanism.
							scope.$apply(function() {
								fn(scope, {$event:event}); 
				            });
						});
			};
		});
	});
	
	
	/*
	 * ---- Directive for Config Toolkit ----
	 * Nmae: widgetConfig
	 * Usage: 	As attribute for an empty container: [data-]style-config="(position-code)". e.g. <Any data-style-config="lefttop"></Any>
	 * 			The position-code can be: 'leftTop', 'leftBottom', 'rightTop', 'rightBottom', ....
	 * 			e.g. 'rightTop' means deploy the pop-trigger in the right-top corner and the pop-panel will expend from right-top to left-bottom
	 * Explain:	Once this directive attribute was set for an element, a style-config component will be added in it.
	 * 			There will be a config-trigger -- a cog icon appear in it. Click the cog trigger, a config-panel will pop out.
	 * 			The styConfig component is driven by an object "config" which is often passed form parent scope - the config target.
	 * 			And the config-target should guarantee styles changing dynamically according current configuration. 
	 * 			Anyway, the widgetConfig directive only change the $scope.config object in current scope.
	 * Example: 
	 * 			<Any cstm-widgetConfig="rightTop" ng-controller="_scopeCtrl" ng-init="config=targetConfig">...</Any>
	 * 			//Config-trigger locate right-top of "Any" element and the config-panel expend to left-bottom.
	 * 			//The target config-object is "$scope.targetConfig" located in 'Any' scope.
	 * 			//!!! However, the "Done" button handler should be defined in current scope.
	 * 			//Or we can use a not-empty controller to defined a 'Done' handler for this config-panel:
	 * 			<Any cstm-widgetConfig="rightTop" ng-controller="[dedicate-controller]" ng-init="config=targetConfig">...</Any>
	 * 
	 */
	cstmDirectives.directive('widgetConfig', function(){
		
		return {
					templateUrl: 'partials/ffCfgToolkit',
					
					link: function(scope, element, attrs){
						
						if(attrs.widgetConfig == 'rightTop'){
							element.addClass('abs-right-top');
							element.find('.pop-panel').addClass('abs-right-top');
						}else if(attrs.widgetConfig == 'rightBottom'){
							element.addClass('abs-right-bottom');
							element.find('.pop-panel').addClass('abs-right-bottom');
						}else if(attrs.widgetConfig == 'leftBottom'){
							element.addClass('abs-left-bottom');
							element.find('.pop-panel').addClass('abs-left-bottom');
						}else{
							element.addClass('abs-left-top');
							element.find('.pop-panel').addClass('abs-left-top');
						}
						/*
						 * Create local font constant object for font-config component.
						 */
						scope.font = {
								fontSizes: ['9px','10px','12px','14px','16px','18px','24px','28px','32px','36px','48px','72px'],
								fontStyles: ['normal','italic','oblique','initial'],
								fontFamilies: ['Arial','Time','Georgia','Geneva','Helvetica','Impact','Verdana','cursive','Courier','Monaco','Consolas'],
								fontWeights: ['100','200','300','400','500','600','700','800','900'],
						};
						
						//Click the popout-trigger (cog) to show tha pop panel
						scope.showPopPanel = function(event){
							$('.pop-panel').css({'display':'none'});	//erase all at first
							$(event.target).siblings('.pop-panel').toggle();
							event.stopPropagation();	//prevent clicking the trigger also hide the popout
						};
						
						scope.toggleDropdownMenu = function(event){
							$(event.target).closest('.form-group').find('.dropdown-select').toggle();
						};
						
						scope.stepIncrease = function(item,step,max,event){
							if(parseInt(item.value)+parseInt(step) <= parseInt(max)){
								item.value += parseInt(step);
							}
						};
						scope.stepDecrease = function(item,step,min,event){
							if(parseInt(item.value)-parseInt(step) >= parseInt(min)){
								item.value -= parseInt(step);
							}
						};
						scope.activateTab = function(tabName,event){
							$(event.target).closest('li').siblings().removeClass('active');
							$(event.target).closest('li').addClass('active');
							$(event.target).closest('ul').siblings('ul').addClass('hidden');
							$(event.target).closest('ul').siblings('.font-'+tabName+'-soup').removeClass('hidden');
						};
					}
				};
	});
	
	
	/*
	 * Directive for click-operation confirm. -- It's a jQuery pattern implementation
	 * For critical operations triggered by click, we need user confirm it through this pop-over panel.
	 * At first, add mask over the window so user can't perform other operations. Then render the confirm-board.
	 * The warning information is passed by another attribute defined in same element: confirm-info.
	 * Click Cancel do nothing, Click Confirm go ahead to perform this operation.
	 * Example:
	 * 		<Any cstm-confirm="doSth(...)" cstm-info="Are you sure about ..."></Any>
	 * 		So, click <Any... element lead a screen masking pop-over, select "Confirm" will execute $scope.doSth(...); "Concel" do nothing.
	 * 		The handler -- doSth(...) can pass $event and any other arguments in scope, e.g. doSth(user.id,'String',$event).
	 * 
	 */

	cstmDirectives.directive('cstmConfirm', ['$parse','$rootScope', '$window',function($parse,$rootScope,$window){
		
		$rootScope._maskingScrn = false;
		$rootScope._popScrnUrl = null;
		$rootScope._removeScrnMask = function(event){
			$rootScope._maskingScrn=false;
			//destroy the popView, both static-pop and ajax-pop
			//$("#_staticPop").empty();
			var _staticPop = document.getElementById('_staticPop');
			_staticPop.innerHTML = '';
			$rootScope._popScrnUrl=null;
			if(event){event.stopPropagation()};
		};
		
		return function(scope, el, attrs){
					var fn = $parse(attrs['cstmConfirm']);
					var confirmInfo = attrs['cstmInfo'];
					el.on('click', function(event){
						event.preventDefault();
						//calculate the position of the pop-over panel
						var windowWidth = $window.innerWidth;
						var windowHeight = $window.innerHeight;
						var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
						var scrollLeft = (document.documentElement && document.documentElement.scrollLeft) || document.body.scrollLeft;
						var topOffset = (windowHeight/2 - 120 + scrollTop) +'px';
						var leftOffset = (windowWidth/2 - 160 + scrollLeft) + 'px';
						
						//Add pop-over panel (which not inside _mask but over it), add handler to 'Cancel' and 'Confirm' button
						
						/*
						$('#_staticPop').empty().prepend(
								'<div class="panel panel-shadow" style="width:320px">'
									+'<div class="title-md">Confirm</div>'
									+'<p style="padding:5px 30px;margin-top:10px">' +confirmInfo+ '</p>'
									+'<div style="width:100%;padding:0px 30px 25px 30px">'
										+'<button href="" class="btn btn-default pull-right btn-confirm-cancel">Cancel</button>'
										+'<button href="" class="btn btn-warning btn-confirm-confirm">Confirm</button>'
									+'</div>'
								+'</div>'
						);*/
						var _staticPop = document.getElementById('_staticPop');
						_staticPop.innerHTML = 
								'<div class="panel panel-shadow" style="width:320px">'
								+'<div class="title-md">Confirm</div>'
								+'<p style="padding:5px 30px;margin-top:10px">' +confirmInfo+ '</p>'
								+'<div style="width:100%;padding:0px 30px 25px 30px">'
									+'<button href="" class="btn btn-default pull-right btn-confirm-cancel">Cancel</button>'
									+'<button href="" class="btn btn-warning btn-confirm-confirm">Confirm</button>'
								+'</div>'
								+'</div>';
						
						var btnCancel = angular.element(_staticPop.getElementsByClassName('btn-confirm-cancel')[0]);
						btnCancel.bind('click',function(){
							$rootScope._removeScrnMask();
						});
						/*$('#_staticPop .btn-confirm-cancel').click(function(){
							//$rootScope._maskingScrn = false;
							$rootScope._removeScrnMask();
						});*/
						
						var btnConfirm = angular.element(_staticPop.getElementsByClassName('btn-confirm-comfirm')[0]);
						btnConfirm.bind('click',function(){
							scope.$apply(function() {
								fn(scope, {$event:event}); 			//Invoke the method passed by the directive
				            });
							//$rootScope._maskingScrn = false;
							$rootScope._removeScrnMask();
						});
						
						/*$('#_staticPop .btn-confirm-confirm').click(function(){
							scope.$apply(function() {
								fn(scope, {$event:event}); 			//Invoke the method passed by the directive
				            });
							//$rootScope._maskingScrn = false;
							$rootScope._removeScrnMask();
						});*/
						
						var _overMask = document.getElementById('_overMask');
						angular.element(_overMask).css({'top':topOffset,'left':leftOffset});
						//$("#_overMask").css({'top':topOffset,'left':leftOffset});
						//$rootScope._popScrnUrl = null;		//clear possible dynamic pop-over by popUrl
						$rootScope._maskingScrn = true;
						
					});
		};
	}]);
	
	
	/*
	 * This ditective can't be implemented independently, there should be fixed elements existing in the be begin of body.
	 * 		<body>
	 * 			<div id="_mask" data-ng-show="_maskingScrn==true" data-ng-click="_removeScrnMask($event)"></div>
	 *			<div id="_overMask" data-ng-controller="_scopeCtrl" data-ng-show="_maskingScrn==true">
	 *				<div id="_staticPop"></div>
	 *				<div data-ng-include="_popScrnUrl"></div>
	 *			</div>
	 *			<!-- Other elements for actual application -->
	 * 		</body>
	 * Example:
	 * 		<Any ng-controller="_scopeCtrl" cstm-popscreen="{url:popUrl,model:'MODEL',width:300,height:400}" ng-init="model=obj">
	 * 		It's a click handler, the popView loaded through popUrl will pop over the masking screen,
	 * 		The model will pass to the popView. We should provide the estimating size of the popView.
	 */
	cstmDirectives.directive('cstmPopscreen', ['$parse','$rootScope','$window',function($parse, $rootScope, $window){
		
		$rootScope._maskingScrn = false;
		$rootScope._popScrnUrl = null;
		$rootScope._removeScrnMask = function(event){
			$rootScope._maskingScrn=false;
			//destroy the popView, both static-pop and ajax-pop
			var _staticPop = document.getElementById('_staticPop');
			_staticPop.innerHTML = '';
			
			$rootScope._popScrnUrl=null;
			if(event){event.stopPropagation()};
		};
		
		return function(scope,el,attrs){
					
					el.on('click', function(event){
						event.preventDefault();
						
						/*
						 * $parse("textual-object")(obj) --- parse textual object with 'obj', the variables are populated by retrieving obj.
						 * For example: $parse("{name:'Mark',age:35}")({}). //All values are constant (string or number), so we can use an empty obj.
						 * But: $parse("{name:'Mark',age:user.age}")(scope).	//There is a variable $scope.user.age in the parsing object.
						 * It's harmless using $parse("{name:'Mark',age:user.age}")(scope) even if one value need to be retrieved from scope.!!!
						 */
						var arg = $parse(attrs.cstmPopscreen)({});
						
						//calculate the position of the pop-over panel
						var windowWidth = $window.innerWidth;
						var windowHeight = $window.innerHeight;
						var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
						var scrollLeft = (document.documentElement && document.documentElement.scrollLeft) || document.body.scrollLeft;
						
						/*
						var topOffset = (windowHeight/2 - 120 + scrollTop) +'px';
						var leftOffset = (windowWidth/2 - 160 + scrollLeft) + 'px';
						*/
						var topOffset = '20px';
						var leftOffset = '20px';
						
						if(arg.height<windowHeight){
							topOffset = (windowHeight/2 - arg.height/2 + scrollTop) +'px';
						}
						if(arg.width<windowWidth){
							leftOffset = (windowWidth/2 - arg.width/2 + scrollLeft) + 'px';
						}
						
						
						//Clear the model because maybe the previous 'MODEL' is still remained in $("#_overMask") scope
						var _overMask = document.getElementById('_overMask');
						angular.element(_overMask).scope()[arg.model] = null;
						angular.element(_overMask).css({'top':topOffset,'left':leftOffset});
						//$("#_overMask").css({'top':topOffset,'left':leftOffset});
						
						/*
						 * If an abstract model was passed to the pop-template, e.g. ng-init="model=dataInCurrentScope".
						 * We must make it available in the _overMask scope, because the pop-template is rendered under $("#_overMask") scope.
						 */
						if(attrs.ngInit){
							var a = attrs.ngInit.replace(/\s+/g, '').split(';');
							angular.forEach(a,function(v,k){
								var aa = v.replace(/\s+/g, '').split('=');
								angular.element(_overMask).scope()[aa[0]]=scope[aa[0]];	//access scope by element selector.
							});
						}
						
						//$("#_staticPop").empty();	//clear possible static pop-over with immediate markup
						//2 root variable for screen masking and popping template-url
						$rootScope._popScrnUrl = arg.url;
						$rootScope._maskingScrn = true;
						
					});
				};
		
	}]);
	
	/*
	cstmDirectives.directive('cstmMarkdown', function () {
	    var converter = new Showdown.converter();
	    console.log("markdown")
	    return {
	        restrict: 'A',
	        link: function (scope, element, attrs) {
	            var htmlText = converter.makeHtml(element.text());
	            element.html(htmlText);
	        }
	    };

	});*/
	
	cstmDirectives.directive('cstmMessage', function($parse){
		
		return {
			template: '<div class="form-group" data-ng-show="_message.Status">'
							+ '<div class="alert alert-sm" data-ng-class="{\'alert-success\':_message.Status==\'SUCCESS\', \'alert-warning\':_message.Status==\'FAILURE\', \'alert-info\':_message.Status==\'TEXT\'}">'
								+ '<i class="glyphicon font-bg" data-ng-class="{\'glyphicon-saved\':_message.Status==\'SUCCESS\', \'text-green\':_message.Status==\'SUCCESS\', \'glyphicon-warning-sign\':_message.Status==\'FAILURE\', \'text-red\':_message.Status==\'FAILURE\', \'glyphicon-info-sign\':_message.Status==\'TEXT\', \'text-gery\':_message.Status==\'TEXT\'}">&nbsp;</i>{{_message.Info}}'
							+ '</div>'
					 +'</div>',
			link: function(scope,el,attrs){
					if(scope['_message']!=null){
						console.log("Conflict ---> Directive cstmMessage find $scope._message existed in current scope");
						return;
					}
					if(attrs.cstmMessage && attrs.cstmMessage.replace(/\s+/g, '')!=''){
						scope._message = scope[attrs.cstmMessage.replace(/\s+/g, '')];
					}else{
						scope._message = {Status:null, Info:''};
					}
			}
		}
	});
	
//---------------------------------- TEST BELOW, not used -----------------------------------------------------	
	
	//Still not work. The problem is the controller in template can't access the scope of directive!!!!
	/*
	 * Directive to transfer data to this directive scope from parent scope.
	 * Here used to assign an object in parent scope to $scope.wgtModel in directive $scope.
	 * The the widget will access it as the model argument in order to make the widget reusable.
	 * Example:		<div id="usersCtner" ng-include="userThrumbnail" wgt-model="project.members"></div>
	 * 				Now the 'userThrumbnail' widget is instantiated in the '#userCtner' container.
	 * 				We create an object '$scope.wgtModel' in the directive scope and assign value to it with '$scope.project.members' in parent scopes.
	 * 				All standard widgets will access the fixed '$scope.wgtModel' as its own model, so the value of '$scope.project.members' was transferred.
	 * 				See, the abstract-model in widget and the actual-model outside are isolated by this directive
	 */
	cstmDirectives.directive('instWidget',function(){
		
		return {
			restrict: "E",
			
			templateUrl: function(el,attrs) {
				alert(attrs['wgtName']);
				return attrs['wgtName'] || 'widgets/noWgt';
			},
			
			//template: "<div ng-controller='wgtWrap'><div ng-controller='testWgtController'><p>{{model.name}}</p></div></div>",
			
			link: function(scope,el,attrs){
				if(attrs['wgtModel']){
					scope.model = scope[attrs['wgtModel']];
				}
			}
		};
	});
	
	
	//It a good idea but doesn't work!!!!!!! !!!!
	//Because the 'ng-include' and 'ng-controller' attributes are appended after rendering. Angualar doesn't evaluate them!!!! 
				/*
				 * Directive to instantiate a widget immediately
				 * Usage:	<Any data-inst-widget="[widget-code],[model]"></Any>
				 * 			The module js file (the controller) should be included already and the Controller should be named: [widget-code]+Controller
				 * 			The path of the widget template should be defined as a root-variable: $scope._widgetPath.
				 * For example:
				 * 			<div data-inst-widget="logoBrand, _categoryTree"></div>
				 * 			Instantiate "logoBrand" widget and transfer "$scope._categoryTree" as model for it.
				 * 			"$scope._categoryTree" should be available outside this "logoBrand" widget scope.
				 */
				cstmDirectives.directive('instWidget', function(){
					return function(scope,el,attrs){
									var args = attrs['instWidget'].replace(/\s+/g, '').split(',');
									
									//Include the view -- loading the template markups
									el.attr('ng-include', scope._widgetPath+args[0]);
									
									//Add controller of this widget
									el.attr('ng-controller', args[0]+'Controller');
									
									if(args[1] != null && args[1] != ''){
										//Transfer model object to widget by its internal $scope.init() method.
										el.attr('ng-init', 'init('+args[1]+')');
									};
								};
				});
		
	
	