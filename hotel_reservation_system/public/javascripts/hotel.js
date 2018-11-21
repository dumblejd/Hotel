var app = angular.module('Hotel', ['ngResource', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html'
        })

        .when('/signUp', {
        	templateUrl: '',
        	controller:

        })
        .otherwise({
            redirectTo: '/'
        });
}]);

// signUpController
app.controller('signUpController', ['$scope', '$resource', 
	function(){
		$scope.usernameValidation = signUpValidation.usernameValidation($scope.username);
		$scope.passwordValidation = signUpValidation.passwordValidation($scope.password);
		$scope.emailValidation = signUpValidation.emailValidation($scope.email);
		$scope.phoneValidation = signUpValidation.phoneValidation($scope.phone)
	}]);

// singInController
app.controller('singInController', ['$scope', '$resource',
	function(){

	}]);

// signUpService
app.service('signUpValidation', function(){
	this.passwordValidation = function(password){
		var reg = /^[0-9a-zA-Z]{6，}$/
		if (reg.text(password)){
			return true
		}
		else{
			return false
		}
	}

	this.usernameValidation = function(username){
		var reg = /^[0-9a-zA-Z]+$/;
		if (reg.text(password)){
			return true
		}
		else{
			return false
		}
	}

	this.emailValidation = function(email){

	}

	this.phoneValidation = function(phone){

	}

	this.filledValidation = function(){

	}
});

// signInService
app.service('signInValidation', function(){
	this.accountValidation = function(){

	}

	this.filledValidation = function(){

	}
});

// 

