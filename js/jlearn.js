function CardCtrl($scope, $timeout, $filter) {
    $scope.cards = hiraganaCards;
    $scope.random = true;
    $scope.consecutiveGoodAnswers = 0;
    $scope.currentCard = null;
    $scope.repeatLastCard = false;
    $scope.input = '';

    $scope.nextCard = function(index) {
        $scope.input = '';
        $('#input').val('');

        if ($scope.repeatLastCard)
        {
            console.log('fsdf');
            $scope.repeatLastCard = false;
        }
        else if (typeof index != 'undefined')
        {
            $scope.currentIndex = index;
        }
        else
        {
            if ($scope.random)
            {
                $scope.currentIndex = Math.floor(Math.random() * $scope.cards.length);
            }
            else
            {
                var nextIndex = $scope.currentIndex + 1;
                $scope.currentIndex = nextIndex < $scope.cards.length - 1 ? nextIndex + 1 : 0;
            }
        }
        $scope.currentCard = $scope.cards[$scope.currentIndex];
    };

    $scope.answer = function(event)
    {
        if (event.keyCode == 32)
        {
            $scope.answer = {status: 'learn', card: $scope.cards[$scope.currentIndex]};
            $scope.repeatLastCard = true;
            $('#input').val($scope.currentCard.target);
            $timeout($scope.nextCard, 500);
        }
    }

    $scope.check = function() {
        // we do the check when the size is ok
        if ($scope.input.length == $scope.currentCard.target.length)
        {
            if($scope.input == $scope.currentCard.target)
            {
                $scope.answer = {status: 'success', card: $scope.cards[$scope.currentIndex]};
                $scope.cards[$scope.currentIndex].success ++;
                $scope.consecutiveGoodAnswers ++;
            }
            else
            {
                $scope.answer = {status: 'error', card: $scope.cards[$scope.currentIndex]};
                $scope.cards[$scope.currentIndex].error ++;
                $scope.consecutiveGoodAnswers = 0;
                $scope.repeatLastCard = true;
            }
            localStorage['cards'] = $filter('json')($scope.cards);
            $timeout($scope.nextCard, 300);
        }
    };


    $scope.getErrorClass = function(card) {
        return $scope.answer.success;
    };

    $scope.getClass = function(card) {
        return $scope.getStats(card) >= 50 ? 'success' : (card.success < card.error ? 'error' : '');
    };

    $scope.getStats = function(card) {
        res = Math.floor(card.success / (card.error + card.success) * 100);
        return isNaN(res) ? 0 : res;
    };

    $('#input').focus();
    $('#input').keyup($.proxy($scope.answer, $scope));

    if (localStorage.cards)
    {
        $scope.cards = $.parseJSON(localStorage.cards);
    }
    $scope.nextCard(!$scope.random ? 0 : undefined);
}