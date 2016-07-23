/**
 * Created by Ankur on 20-07-2016.
 */
'use strict';

eventsApp.controller('EditProfileController',
    function EditProfileController($scope, gravatarUrlBuilder) {
        $scope.user = {};

        $scope.getGravatarUrl = function (email) {
            return gravatarUrlBuilder.buildGravatarUrl(email);
        }

    }
);