angular.module('dailydealsApp', []);
angular.
module('dailydealsApp').
component('itemList', {  // This name is what AngularJS uses to match to the `<phone-list>` element.
    template:

        '<li class="span3" ng-repeat="item in $ctrl.items">'  +
        '<div class="thumbnail">' +
        '<i class="tag"></i>' +
        '<a href="product_details.html"><img src= {{item.images}} alt=""></a>' +
        '<div class="caption">' +
        '<h5>{{item.name}}</h5>' +
        ' <h4><a class="btn" href="product_details.html">VIEW</a> <span class="pull-right">{{item.price}} </span> </h4>' +
        '</div>' +
        '</div>' +
        '</li>' ,

    controller: function ItemListController() {
        this.items = [
            {
                images: "../themes/images/products/b2.jpg",
                name: 'Nexus S',
                price: '$200.00'
            },
            {
                images: "../themes/images/products/b3.jpg",
                name: 'b',
                price: '$300.00'
            },
            {
                images: "../themes/images/products/b4.jpg",
                name: 'c',
                price: '$400.00'
            },
            {
                images: "../themes/images/products/b5.jpg",
                name: 'd',
                price: '$500.00'
            },
            {
                images: "../themes/images/products/b6.jpg",
                name: 'Nexus S',
                price: '$600.00'
            },
            {
                images: "../themes/images/products/b7.jpg",
                name: 'e',
                price: '$700.00'
            },
            {
                images: "../themes/images/products/b8.jpg",
                name: 'f',
                price: '$800.00'
            },
            {
                images: "../themes/images/products/b9.jpg",
                name: 'g',
                price: '$900.00'
            },
            {
                images: "../themes/images/products/b9.jpg",
                name: 'g',
                price: '$900.00'
            },

        ];
    }
});

var myApp = angular.module('formCredential', []);
myApp.controller('signinController',  function($scope) {
    $scope.master = {};

    $scope.update = function(user) {
        $scope.master = angular.copy(user);
    };

    $scope.create = function(user) {
        $scope.master = angular.copy(user);
        var jobject = { "id" : $scope.master.length +1,
            "username":$scope.user.name,
            "email":$scope.user.email,
            "firstname":$scope.user.firstname,
            "lastname":$scope.user.lastname,
            "password1":$scope.user.password,
            "password2":$scope.user.password2,
            "useragree":$scope.user.agree};

        $scope.master.push(jobject);
        console.log("added")

        // $http.post('insertDetails.php',jobject).success(function(data){
        //     if (data == true) {
        //         getUser();
        // // Hide details insertion form
        //         $('#signupform').css('display', 'none');
        //     }
        // });
    };
    $scope.reset = function(form) {
        if (form) {
            form.$setPristine();
            form.$setUntouched();
        }
        $scope.user = angular.copy($scope.master);
    };
    $scope.reset();


});

angular.bootstrap(document.getElementById("App2"), ['formCredential']);

