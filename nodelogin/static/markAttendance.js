

var app = angular.module('myApp', []);


app.controller('myCtrl', function($scope, $http,$location,$window) {

  $scope.todaysDate = "3 April 2023";
    $http.get('/api/studentList').then(function(response) {
        $scope.studentList = response.data;
        $scope.arrayOfStudents = {};


        for (let i = 0; i < $scope.studentList.length; i++) {
            $scope.arrayOfStudents[$scope.studentList[i].sapid] = [false,$scope.studentList[i].name,$scope.studentList[i].rollno];
            
        }
        
  
      });

      $scope.submitToServer = function(){
        $http.post('/submitAttendance', $scope.arrayOfStudents)
        .then(function(response) {
            var currentUrl = $location.absUrl();
            var newUrl = currentUrl.replace('/markAttendance','/selectLecture');
            $window.location.href = newUrl;
        })
        .catch(function(error) {
            console.error(error);
        });
    }

      $scope.getValueClass = function(value) {
        if (!value) {
          return 'red';
        } else {
          return '';
        }
      };


      $scope.allSelected = false;

      $scope.checkAllFunc = function() {
        for (var i in $scope.arrayOfStudents) {
            $scope.arrayOfStudents[i][0] = $scope.checkAll;
        }

        
    };


  });

