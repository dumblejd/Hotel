var app = angular.module('Hotel', ['ngResource', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'pages/index.html',
            controller: 'indexController'
        })

        .when('/register', {
        	templateUrl: 'pages/register.html',
        	controller: 'signUpController'
        })
        .when('/login', {
        	templateUrl: 'pages/login.html'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.controller('indexController',['$location','$scope', 
	function($location, $scope){
		$scope.AccountHref = '/#/login';
		$scope.LoginName = 'Login';
		$scope.login = function(){
			self.location = '/login'
		}
}])

// signUpController
app.controller('signUpController', ['$scope', '$resource',
	function($scope){
		$scope.usernameValidation = function(){
			var reg = /^[0-9a-zA-Z]+$/;
			if (reg.text($scope.username)){
				$scope.usernameMessage = false
			}
			else{
				$scope.usernameMessage = true
			}
			
		}
		$scope.passwordValidation = function(){
			var reg = /^[0-9a-zA-Z]{6，}$/
			if (reg.text($scope.password)){
				$scope.passwordMessage = false
			}
			else{
				$scope.passwordMessage = true
			}
		};
		$scope.emailValidation = function(){
			var reg = /^[0-9a-zA-Z]+@[0-9a-zA-Z]+\.[0-9a-zA-Z]{3}$/;
			if (reg.text($scope.email)){
				$scope.emailMessage = false
			}
			else{
				$scope.emailMessage = true
			}
		};
		$scope.phoneValidation = function(){

		};
	}]);

// singInController
app.controller('singInController', ['$scope', '$resource',
	function(){

	}]);


// 

