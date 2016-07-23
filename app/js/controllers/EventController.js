'use strict';

eventsApp.controller('EventController',
    function EventController($scope, eventData, $log, $routeParams) {
        $scope.snippet = '<span style="color:red">hi there</span>';
        $scope.boolValue = true;
        $scope.myStyle = {color: 'red'};
        $scope.myClass = "blue";
        $scope.buttonDisabled = true;

        $scope.sortorder = 'name';

        eventData.getEvent($routeParams.eventId)
            .$promise
            .then(
                function (event) {
                    $scope.event = event;
                    console.log(event);
                })
            .catch(
                function (response) {
                    console.log(response);
                });
        /*eventData.getEvent()
         .success(function (event) {
         $scope.event = event;
         })
         .error(function (data, status, headers, config) {
         $log.warn(data, status, headers(), config);
         });*/

        $scope.upVoteSession = function (session) {
            session.upVoteCount++;
        }
        $scope.downVoteSession = function (session) {
            session.upVoteCount--;
        }
    });