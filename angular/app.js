
// first we have to declare the module. note that [] is where we will declare the dependecies later. Right now we are leaving it blank
var myApp = angular.module('blogApp', ['ngRoute']); 


// this is without $scope
myApp.controller('mainController',['$http',function($http) {

  //create a context
  var main = this;


  this.pageHeading = 'SoftTech Blog';
  this.pageSubHeading = 'Fetching blogs from edwisors API'
  
  // i knew the result is going to be array, so i declared an empty array to initialize
  this.blogs = [];
  console.log(this.blogs);

  //this.baseUrl = 'http://ec2-52-77-247-196.ap-southeast-1.compute.amazonaws.com:3000/api/blogs';
  this.baseUrl = 'https://projectsapi.edwisor.com/api/blogs';


  this.loadAllBlogs = function(){
   
      $http({
        method: 'GET',
        url: main.baseUrl+'/all'
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          console.log(response);
          main.blogs = response.data.data;
          console.log(main.blogs);

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);

        });


  }// end load all blogs
 

   
}]); // end controller





myApp.controller('singleBlogController',['$http','$routeParams',function($http,$routeParams) {

  //create a context
  var main = this;


  this.pageHeading = '';
  this.pageSubHeading = ''
 

  this.blogId = $routeParams.blogId;
  console.log(this.blogId);


  //this.baseUrl = 'http://ec2-52-77-247-196.ap-southeast-1.compute.amazonaws.com:3000/api/blogs';
  this.baseUrl = 'https://projectsapi.edwisor.com/api/blogs';

  this.loadSingeBlog = function(){
   
      $http({
        method: 'GET',
        url: main.baseUrl+'/'+main.blogId
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          //console.log(response);
          main.blog = response.data.data;
          console.log(main.blog);

          main.pageHeading = main.blog.heading;
          main.pageSubHeading = main.blog.subHeading;
          

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);
        });


  }// end load single blogs
   


	//Method to delete post
	this.deleteBlog = function(){
  

	      $http({
		method: 'POST',
		data  : main.blog,
		url: main.baseUrl+ '/' + main.blogId +'/remove'
	      }).then(function successCallback(response) {
		  // this callback will be called asynchronously
		  // when the response is available
		  
		  
		  console.log(response);
		  alert(main.blog.heading +" deleted successfully");
		  window.location = '#/';
		  

		}, function errorCallback(response) {
		  // called asynchronously if an error occurs
		  // or server returns response with an error status.
		  alert("some error occurred. Check the console.");
		  console.log(response);
		});


  	}// end delete post

}]); // end controller



myApp.controller('blogCreateController',['$http',function($http) {

  //create a context
  var main = this;


  this.pageHeading = 'Create a blog post';
  this.pageSubHeading = 'please fill all the data'
 

  //this.baseUrl = 'http://ec2-52-77-247-196.ap-southeast-1.compute.amazonaws.com:3000/api/blogs';
  this.baseUrl = 'https://projectsapi.edwisor.com/api/blogs';

  this.createPost = function(){

      var myData ={

          heading     : main.heading,
          subHeading  : main.subHeading,
          bodyHtml    : main.bodyHtml,
          author      : main.author


      }

      console.log(myData);
   
      $http({
        method: 'POST',
        data  : myData,
        url: main.baseUrl+'/create'
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          //console.log(response);
          alert("blog created successfully");
          window.location = '#/blog/'+response.data.data.blogId;
          

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);
        });


  }// end create post
   


}]); // end controller


myApp.controller('blogEditController',['$http','$routeParams',function($http,$routeParams) {

  	//create a context
  	var main = this;
	
	//Load the blog data into the given feilds

	this.blogId = $routeParams.blogId;
  	console.log(this.blogId);
	this.blog = undefined;

  	//this.baseUrl = 'http://ec2-52-77-247-196.ap-southeast-1.compute.amazonaws.com:3000/api/blogs';
  	this.baseUrl = 'https://projectsapi.edwisor.com/api/blogs';

  	this.loadSingeBlog = function(){
   
      	$http({
        	method: 'GET',
        	url: main.baseUrl+'/'+main.blogId
      	}).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          //console.log(response);
          main.blog = response.data.data;
          console.log(main.blog);

          main.pageHeading = main.blog.heading;
          main.pageSubHeading = main.blog.subHeading;
          

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);
        });


  }// end load single blogs
   
	//Edit blog


  this.editPost = function(){

      var myData ={

          heading     : main.pageHeading,
          subHeading  : main.pageSubHeading,
          bodyHtml    : main.blog.bodyHtml,
          author      : main.blog.author


      }

      console.log(myData);
   
      $http({
        method: 'PUT',
        data  : myData,
        url: main.baseUrl+ '/' + main.blogId +'/edit'
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
	  
          
	  console.log(response);
          alert("blog Updated successfully");
          window.location = '#/blog/'+main.blogId;
          

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);
        });


  }// end edit post


   
}]); // end controller






