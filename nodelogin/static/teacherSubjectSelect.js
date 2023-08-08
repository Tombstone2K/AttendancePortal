function formatDate(dateStr) {
    const dateParts = dateStr.split("-");
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    const day = parseInt(dateParts[2], 10);
    const date = new Date(year, month, day);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const formattedDate = `${day} ${monthNames[month]} ${year}`;
    return formattedDate;
}
  

var app = angular.module('myApp', []);


app.controller('myCtrl', function($scope, $http,$location,$window) {
  $scope.nullFlag = false;

    $http.get('/api/getLectureData').then(function(response) {
      $scope.lectureInfo = response.data;
      if($scope.lectureInfo.length===0){
        $scope.nullFlag = true;
      }
      // $scope.arrayOfSubjects = {};


      //   for (let i = 0; i < $scope.subjectList.length; i++) {
      //       $scope.arrayOfSubjects[$scope.subjectList[i].shortForm] = [0,0];
            
      //   }
    }).catch(function(error) {
      console.log(error);
    });

    $scope.mark = function(index) {
      $scope.imp = $scope.lectureInfo[index];

      $http.post('/submitLecture', $scope.imp)
      .then(function(response) {
        var currentUrl = $location.absUrl();
        var newUrl = currentUrl.replace('/selectLecture', '/markAttendance');
        $window.location.href = newUrl;
        // console.log(response.data);
      }, function(error) {
        // console.log(error);
      });

    };

    // $scope.submitForm = function() {
    //   $http.post('/submitBranch', $scope.selectedBranch);
    //   // .then(function(response) {
    //   //   console.log(response.data);
    //   // }, function(error) {
    //   //   console.log(error);
    //   // });

    //   // console.log("Selected option:", $scope.selectedOption);
    //   // Add any other actions here, such as submitting the form data to a server
    // }
    
    


});

