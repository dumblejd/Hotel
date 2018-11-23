var app = angular.module('Hotel', ['ngResource', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'pages/index.html',
            controller: 'indexController'
        })

        .when('/register', {
        	templateUrl: 'pages/register.html',
        	controller: 'registerController'
        })
        .when('/login', {
        	templateUrl: 'pages/login.html',
        	controller: 'loginController'
        })
		.when('/rooms', {
            templateUrl: 'pages/rooms.html',
            controller: 'showRoomController'
		})
        .when('/search', {
            templateUrl: 'pages/search.html',
            controller: ''
        })
        .when('/reserves', {
            templateUrl: 'pages/reserves.html',
            controller: 'showReserveController'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.controller('indexController',['$location','$scope', 
	function($location, $scope){
		//window.alert(sessionStorage.getItem('user'));
		if (sessionStorage.getItem('user')!=null){
			$scope.AccountHref = '#/';
			$scope.LoginName = sessionStorage.getItem('user');
		}
		else{
            $scope.AccountHref = '/#/login';
            $scope.LoginName = 'Login';
		}

		$scope.signOut = function () {
			sessionStorage.clear();
			location.reload();
        }

	}]);

app.controller('loginController',['$location', '$scope', '$resource',
	function($location, $scope, $resource){
		$scope.loginUser = function(){
			var userSignIn = $resource('/users/signIn');
			userSignIn.save({}, {username: $scope.username, password: $scope.password}, function(status){
				if (status.status == true){
					sessionStorage.setItem('user', $scope.username);
					self.location='#/';
				}
				else{
					$scope.failureLogin = true;
				}
			});
		};

		$scope.register = function(){
			self.location = '#/register';
		};

	}]);

// registerController
app.controller('registerController', ['$scope', '$resource', '$location',
	function($scope, $resource){
		var canRegister = false;
		$scope.usernameValidation = function(){
			var reg = /^[0-9a-zA-Z]+$/;
			var usedUsername = $resource('users/username/:username');
			var available = false;

			usedUsername.get({username: $scope.username}, function(user) {
				if (user.status == true){
					available = true;
				}
				else{
					available = false;
				}

                if (reg.test($scope.username) && available == true){
                    $scope.usernameMessage = false
                }
                else{
                    $scope.usernameMessage = true
                }
            });
		};

		$scope.passwordValidation = function(){
			var reg = /^[0-9a-zA-Z]{6,}$/;
			if (reg.test($scope.password)){
				console.log('p');
				$scope.passwordMessage = false
			}
			else{
				console.log('f');
				$scope.passwordMessage = true
			}
		};

		$scope.emailValidation = function(){
			var reg = /^[0-9a-zA-Z]+@[0-9a-zA-Z]+\.[0-9a-zA-Z]{3}$/;
			if (reg.test($scope.email)){
				$scope.emailMessage = false
			}
			else{
				$scope.emailMessage = true
			}
		};

		$scope.phoneValidation = function(){
			var reg = /^[0-9]{10}$/;
            if (reg.test($scope.phone)){
                $scope.phoneMessage = false
            }
            else{
                $scope.phoneMessage = true
            }
		};
		$scope.registerUser = function () {
			if($scope.username==null){
				console.log('kong');
			}
			if (!($scope.username==null||$scope.password==null||$scope.email==null||$scope.usernameMessage||$scope.passwordMessage||$scope.emailMessage)){
                var registerUser = $resource('/users');
                registerUser.save({}, {
                    username: $scope.username,
                    password: $scope.password,
                    email: $scope.email,
                    fullname: $scope.fullname,
                    address: $scope.address,
                    phone: $scope.phone,
                    level: 1
				}, function (status) {
                    if (status.status == true){
                        window.alert('Register successful');
                        self.location = '#/login';
                    }
                });
			}
        }
	}]);

// singInController
app.controller('singInController', ['$scope', '$resource',
	function(){

	}]);


// showRoomController
app.controller('showRoomController',
    function($scope, $resource, $location){
        var Rooms = $resource('/rooms', {});
        Rooms.query(function(rooms){
            $scope.rooms = rooms;
        });
    });

// showReserveController
app.controller('showReserveController',
    function($scope, $resource, $location){
        var Reserves = $resource('/reserves', {});
        Reserves.query(function(reserves){
            $scope.reserves = reserves;
        });
    });

