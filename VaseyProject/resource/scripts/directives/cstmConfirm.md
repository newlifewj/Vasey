# cstmConfirm

### Author ~Jian Wang~
[e2e test solution] (/_doc/readme?readme=/dev/e2e/README.md)
### Summary

It's a common requirement to provide waring for dangerous operation. So users have chance
to re-consider their actions and choose 'Continue' or 'Cancel'.
This directive can be added to a clicking entrance as attribute. Then clicking the target
entrance will lead to a pop-over and the screen is masked. Users are forced to 'Confirm' 
current operation. Nothing happened if user select 'Cancel' or click elsewhere to close 
the pop-over.
    
#### Example

	<Any cstm-confirm="doSth(...)" cstm-info="Are you sure about ..."></Any>
	
#### Explain

_**doSth():**_ The action will be performed after choosing 'Confirm'. This method should locate
in current scope or supper-scopes.

_**catm-info:**_ The warning info displaying in pop-over.
    
#### Note

Using embedded markups, just too bad!!! I'll fix that later ----
	
#### Code
    
    /**
     *  cstmConfirm
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