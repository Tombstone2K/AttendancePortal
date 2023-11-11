f// Fetch all branches associated with the teacher and pass on teacher's branch choice to select Lecture
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

    $http.get('/api/getBranchList').then(function(response) {
      // First HTTP request success callback function
      $scope.branchInfo = response.data;

    }).catch(function(error) {
      console.log(error);
    });

    $scope.submitForm = function() {
      $http.post('/submitBranch', $scope.selectedBranch)
        .then(function(response) {
          var currentUrl = $location.absUrl();
          var newUrl = currentUrl.replace('/teacher', '/selectLecture');
          $window.location.href = newUrl;
        })
        .catch(function(error) {
          console.log('Error occurred while making HTTP request:', error);
        });
    };
});

