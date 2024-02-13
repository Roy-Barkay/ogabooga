angular.module('hrl')
.directive('onChangeHsgSelect', function ($parse) {
	  return {
	    require: 'select',
	    link: function(scope, elem, attrs, ngSelect) {
	    	 $(elem[0]).on("hsg.dropdown.select",function(){
				 var selectedValue=$(elem[0]).find("option:selected").val();
				 //$scope.selectedClaimReason = $scope.claimReasons[parseInt(claimReasonId)];
				 scope.$root.$broadcast("onChangeHsgSelect",elem[0].id,selectedValue);
			 });
	    }
	  };
	});