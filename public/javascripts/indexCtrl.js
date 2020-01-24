var app = angular.module("indexDetails", []);
app.controller("indexCtrl", function($scope, $http, $location) {
    
    $scope.changePage = function(whichPage)
    {
        console.log(whichPage);
        $scope.pageLink = whichPage;
        location.reload();
    };
});