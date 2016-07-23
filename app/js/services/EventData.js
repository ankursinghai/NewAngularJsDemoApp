/**
 * Created by Ankur on 20-07-2016.
 */
'use strict';
eventsApp.factory('eventData', function ($resource)/*($http)*/ {
    var resource = $resource('/data/event/:id', {id: '@id'});
    var resource1 = $resource('/api/speechToText');
    var resource2 = $resource('/api/textToSpeech');
    return {
        getEvent: function (eventId) {
            //return $http({method: 'GET', url: '/data/event/1'}) ;
            return resource.get({id: eventId});
        },
        save: function (event) {
            event.id = 999;
            return resource.save(event);
        },
        getAllEvents: function () {
            return resource.query();
        },
        getSpeechToText: function () {
            //return $http({method: 'GET', url: '/data/event/1'}) ;
            return resource1.get();
        },
        getTextToSpeech: function (text) {
            //return $http({method: 'GET', url: '/data/event/1'}) ;
            return resource2.get({text: text});
        }
    };
});