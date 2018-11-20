var app = angular.module('Vidzy', ['ngResource', 'ngRoute']);

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
		var users = $resource('/users')
		users.query()
	}]);

// singInController
app.controller('singInController', ['$scope', '$resource',
	function(){

	}]);

// signUpService
app.service('signUpValidation', function(){
	this.passwordValidation = function(password){
		
	}

	this.usernameValidation = function(username){

	}

	this.emailValidation = function(email){

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

