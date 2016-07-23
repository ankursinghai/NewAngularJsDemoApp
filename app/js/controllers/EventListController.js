'use strict';


eventsApp.controller('EventListController',
    function EventListController($scope, eventData) {
        var audio = document.getElementById('audio1');
        var wavsource = document.getElementById('wavsource');
        var txtArea = document.getElementById('textArea');
        var questionText = document.getElementById('questionText');


        var micOptions = {
            bufferSize: 10000
        };
        var mic = new Microphone(micOptions);
        var running = false;
        var speechState = '';

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
        var searchTimeout = 0;



        $scope.loadQuery = function (query) {
            questionText.val(query);
        };

//fill and submit the form with a random example
        $scope.search= function(query, submit) {
            loadQuery(query);
        };

        $scope.speakContent= function(id) {
            // IE and Safari not supported disabled Mic button
            if ($('body').hasClass('ie') || $('body').hasClass('safari')) {
                $('.play').prop('disabled', true);
                $('.ie-speak .arrow-box').show();
                return;
            } else {
                $('.ie-speak .arrow-box').hide();
            }

            $('.play').removeClass('playing');
            $('#' + id).addClass('playing');

            var element = $('#response' + id);
            var text = element.html();
            speech.speak(text);
        }

        $scope.Record = function() {
            alert('#listen record');
            switch (speechState) {
                case 'listening':
                    speech.recognizeAbort();
                    speechState = 'default';
                    setButtonState('default');
                    break;
                case 'speaking':
                    speech.stop();
                    $('.play').removeClass('playing');
                    speechState = 'playing';
                    setButtonState('default');
                    break;
                default:
                    speech.recognize();
                    speechState = 'listening';
                    setButtonState('listening');
                    $('#listen').blur();
                    break;
            }

            return false;
        };
    }
);
