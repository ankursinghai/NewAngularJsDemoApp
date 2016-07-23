'use strict';


eventsApp.controller('EventListController',
    function EventListController($scope, eventData) {
        var audio = document.getElementById('audio');
        var wavsource = document.getElementById('wavsource');
        var txtArea = document.getElementById('textArea');
        var micOptions = {
            bufferSize: 10000
        };
        var mic = new Microphone(micOptions);
        var running = false;
        $scope.events = eventData.getAllEvents();
        var recordButton = document.getElementById('microphoneIcon');//$('#recordButton');

        //txtArea.value = eventData.getSpeechToText();

        $scope.SpeakText = function() {
            alert  ("Hi TextToSpeech");

            wavsource.src = '/api/speak?text='+txtArea.value;
            audio.load();
            audio.play();
        };

        $scope.TextToSpeech = function() {
            alert  ("Hi TextToSpeech");

            wavsource.src = '/api/sample';
            audio.load();
            audio.play();
        };

        $scope.RecordSpeech = function () {
            alert  ("Record Button Clicked");
            if (!running) {
                mic.record();
                running = true;
                //recordButton.src = 'images/microphone_running.svg';
                recordButton.attr('src', 'images/stop.svg');
                alert  (recordButton.src.pathname);
            }
            else {
                mic.stop();
                running = false;
                recordButton.src = 'images/microphone.svg';
            }
        };
    }
);
