// Fetch all subject taught by the teacher in that branch
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
});

