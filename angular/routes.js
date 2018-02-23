myApp.config(['$routeProvider',function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl  : "views/index-view.html",
        controller   : "mainController",
        controllerAs : "myBlog"
    })
    .when("/create", {
        templateUrl  : "views/create-view.html",
        controller   : "blogCreateController",
        controllerAs : "currentBlog"
    })
    .when("/blog/:blogId", {
        templateUrl  : "views/post-view.html",
        controller   : "singleBlogController",
        controllerAs : "singleBlog"
    })
    .when("/blog/:blogId/edit", {
        templateUrl  : "views/edit-view.html",
        controller   : "blogEditController",
        controllerAs : "currentBlog"
    })
    .otherwise({template : '<h1> 404 Page not found </h1>'});
    
    
}]);
