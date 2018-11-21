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
		.when('/add-room', {
            templateUrl: 'pages/room-form.html',
            controller: 'AddRoomController'
		})
		.when('/room/edit/:id', {
            templateUrl: 'pages/room-edit.html',
            controller: 'EditRoomController'
		})
		.when('/room/delete/:id', {
            templateUrl: 'pages/room-delete.html',
            controller: 'DeleteRoomController'
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
		$scope.AccountHref = '/#/login';
		$scope.LoginName = 'Login';
	}]);

app.controller('loginController',['$location', '$scope', '$resource',
	function($location, $scope, $resource){
		$scope.loginUser = function(){
			var userSignIn = $resource('/users/signIn');
			userSignIn.save({}, {username: $scope.username, password: $scope.password}, function(status){
				if (status.status == true){
					window.alert('1');
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
app.controller('registerController', ['$scope', '$resource',
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

		};
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

// AddRoomController
app.controller('AddRoomController', ['$scope', '$resource', '$location',
    function($scope, $resource, $location){
        $scope.save = function(){
            var Rooms = $resource('/rooms');
            Rooms.save($scope.room, function(){
                $location.path('/rooms');
            });
        };
    }]);

// EditRoomController
app.controller('EditRoomController', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams){
        var Rooms = $resource('/rooms/:id', { id: '@_id' }, {
            update: { method: 'PUT' }
        });

        Rooms.get({ id: $routeParams.id }, function(room){
            $scope.room = room;
        });

        $scope.save = function(){
            Rooms.update($scope.room, function(){
                $location.path('/rooms');
            });
        }
    }]);

// DeleteRoomController
app.controller('DeleteRoomController', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams){
        var Rooms = $resource('/rooms/:id');

        Rooms.get({ id: $routeParams.id }, function(room){
            $scope.room = room;
        })

        $scope.delete = function(){
            Rooms.delete({ id: $routeParams.id }, function(room){
                $location.path('/rooms');
            });
        }
    }]);

// showReserveController
app.controller('showReserveController',
    function($scope, $resource, $location){
        var Reserves = $resource('/reserves', {});
        Reserves.query(function(reserves){
            $scope.reserves = reserves;
        });
    });


