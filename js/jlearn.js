function CardCtrl($scope, $timeout, $filter) {
    $scope.random = true;
    $scope.consecutiveGoodAnswers = 0;
    $scope.currentCard = null;
    $scope.repeatLastCard = false;
    $scope.input = '';
    $scope.inputClass = '';

    $scope.decks = [hiragana, capitals];
    $scope.deck = $scope.decks[0];

    $scope.test = function(data)
    {
        $scope.nextCard();
    }

    $scope.nextCard = function(index) {
        $scope.input = '';
        $scope.inputClass = '';
        $('#input').val('');

        if ($scope.repeatLastCard)
        {
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
                $scope.currentIndex = Math.floor(Math.random() * $scope.deck.cards.length);
            }
            else
            {
                var nextIndex = $scope.currentIndex + 1;
                $scope.currentIndex = nextIndex < $scope.deck.cards.length - 1 ? nextIndex + 1 : 0;
            }
        }
        $scope.currentCard = $scope.deck.cards[$scope.currentIndex];
    };

    $scope.answer = function(event)
    {
        console.log($scope.input.length);
        if (event.keyCode == 32 && !$scope.input.length > 0)
        {
            $scope.answer = {status: 'learn', card: $scope.deck.cards[$scope.currentIndex]};
            $scope.repeatLastCard = true;
            $scope.consecutiveGoodAnswers = 0;
            $('#input').val($scope.currentCard.target);
            $timeout($scope.nextCard, 500);
        }
    }

    $scope.check = function() {
        if (!$scope.deck.cards[$scope.currentIndex].success)
        {
            $scope.deck.cards[$scope.currentIndex]['success'] = 0;
        }
        if (!$scope.deck.cards[$scope.currentIndex].error)
        {
            $scope.deck.cards[$scope.currentIndex]['error'] = 0;
        }


        //live check
        if ($scope.input.length >= 1)
        {
            if ($scope.currentCard.target.toLowerCase().indexOf($scope.input.toLowerCase()) == 0)
            {
                $scope.inputClass = 'ok';
            }
            else
            {
                $scope.inputClass = 'error';
            }
        }
        else
        {
            $scope.inputClass = '';
        }

        // we do the check when the size is ok
        if ($scope.input.length == $scope.currentCard.target.length)
        {
            if($scope.input.toLowerCase() == $scope.currentCard.target.toLowerCase())
            {
                $scope.answer = {status: 'success', card: $scope.deck.cards[$scope.currentIndex]};
                $scope.deck.cards[$scope.currentIndex].success ++;
                $scope.consecutiveGoodAnswers ++;
            }
            else
            {
                $scope.answer = {status: 'error', card: $scope.deck.cards[$scope.currentIndex]};
                $scope.deck.cards[$scope.currentIndex].error ++;
                $scope.consecutiveGoodAnswers = 0;
                $scope.repeatLastCard = true;
            }
            console.log($scope.deck.cards[$scope.currentIndex]['error']);
            localStorage['cards'] = $filter('json')($scope.deck.cards);
            $timeout($scope.nextCard, 300);
        }
    };


    $scope.cardContainerClass = function()
    {
        return $scope.currentCard.source.length > 3 || $scope.currentCard.target.length > 3 ? 'small' : 'big';
    }

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

    // loadDeck = function(deck)
    // {
    //     for (i in deck.cards)
    //     {
    //         for (j in deckData.cards[i])
    //         {
    //             var card = {};
    //             card['source'] = j;
    //             card['target'] = deckData.cards[i][j];
    //             card['success'] = 0;
    //             card['error'] = 0;
    //             $scope.deck.cards.push(card);
    //         }
    //     }
    //     console.log($scope.deck.cards);
    // }

    // loadDeck($scope.deck);

    $('#input').focus();
    $('#input').keyup($.proxy($scope.answer, $scope));

    // if (localStorage.cards)
    // {
    //     $scope.deck.cards = $.parseJSON(localStorage.cards);
    // }
    $scope.nextCard(!$scope.random ? 0 : undefined);
}