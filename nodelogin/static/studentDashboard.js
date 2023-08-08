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


app.controller('myCtrl', function($scope, $http) {

    $http.get('/api/subjectList').then(function(response) {
      // First HTTP request success callback function
      $scope.subjectList = response.data;
      $scope.arrayOfSubjects = {};


        for (let i = 0; i < $scope.subjectList.length; i++) {
            $scope.arrayOfSubjects[$scope.subjectList[i].shortForm] = [0,0,$scope.subjectList[i].courseName];
            
        }
      return  $http.get('/api/attendance');
    }).then(function(response) {
      // Second HTTP request success callback function
      $scope.attendanceRecords = response.data;
      
      let present = 0;
      let total = 0;
      
      for (let i = 0; i < $scope.attendanceRecords.length; i++) {
        $scope.arrayOfSubjects[$scope.attendanceRecords[i].shortForm][1] +=1;

        $scope.attendanceRecords[i].textDate = formatDate($scope.attendanceRecords[i].datee);
        total += 1;
        if ($scope.attendanceRecords[i].status === 'P') {
          $scope.arrayOfSubjects[$scope.attendanceRecords[i].shortForm][0] +=1;
          present += 1;
        }
      }
      
      $scope.attendancePercentage = present / total*100;

      let progressBar = document.querySelector(".circular-progress");
        let valueContainer = document.querySelector(".value-container");

        let progressValue = 0;
        let progressEndValue =parseInt($scope.attendancePercentage) ;
        let speed = 30;

        let progress = setInterval(() => {
          progressValue++;
          valueContainer.textContent = `${progressValue}%`;
          progressBar.style.background = `conic-gradient(
              #4d5bf9 ${progressValue * 3.6}deg,
              #cadcff ${progressValue * 3.6}deg
          )`;
          if (progressValue == progressEndValue) {
            clearInterval(progress);
          }
        }, speed);

        
      if($scope.attendancePercentage>= 80.00){
          $scope.status= "NO";
      }
      else{
          $scope.status= "YES";
      }
    }).catch(function(error) {
      // Error callback function
      console.log(error);
    });
    
    // $http.get('/api/attendance').then(function(response) {
    //   $scope.attendanceRecords = response.data;
      
    //   let present = 0;
    //   let total = 0;
      
    //   for (let i = 0; i < $scope.attendanceRecords.length; i++) {

    //     $scope.attendanceRecords[i].textDate = formatDate($scope.attendanceRecords[i].datee);
    //     total += 1;
    //     if ($scope.attendanceRecords[i].status === 'P') {
    //       present += 1;
    //     }
    //   }
      
    //   $scope.attendancePercentage = present / total*100;
    //   if($scope.attendancePercentage>= 80.00){
    //       $scope.status= "NO";
    //   }
    //   else{
    //       $scope.status= "YES";
    //   }
      

    // });

    $scope.getValueClass = function(value) {
      if ((value[0]/value[1]) < 0.8) {
        return 'red';
      } else {
        return 'green';
      }
    };

});

