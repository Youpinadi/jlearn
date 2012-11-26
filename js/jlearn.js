function CardCtrl($scope, $timeout) {
    $scope.cards = hiraganaCards;

    $scope.consecutiveGoodAnswers = 0;

    $scope.nextCard = function() {
        $scope.input = '';

        if ($scope.random)
        {
            $scope.currentIndex = Math.floor(Math.random() * $scope.cards.length);
        }
        else
        {
            $scope.currentIndex = $scope.currentIndex < $scope.cards.length - 1 ? $scope.currentIndex + 1 : 0;
        }
        $scope.currentCard = $scope.cards[$scope.currentIndex];
    };

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
            }
            $timeout($scope.nextCard, 300);
        }
    };


    $scope.getErrorClass = function(card) {
        return $scope.answer.success;
    };

    $scope.getClass = function(card) {
        return card.success > card.error ? 'success' : (card.success < card.error ? 'error' : '');
    };

    $scope.currentCard = null;
    $scope.currentIndex = null;
    $scope.history = [];
    $scope.nextCard();

    $scope.$on('viewContentLoaded', function(){
        console.log('fds');
    });

    // $scope.addToHistory = function() {
    //     $scope.history.push({text:$scope.todoText, done:false});
    //     $scope.todoText = '';
    // };

    // $scope.remaining = function() {
    //     var count = 0;
    //     angular.forEach($scope.todos, function(todo) {
    //         count += todo.done ? 0 : 1;
    //     });
    //     return count;
    // };

    // $scope.archive = function() {
    //     var oldTodos = $scope.todos;
    //     $scope.todos = [];
    //     angular.forEach(oldTodos, function(todo) {
    //         if (!todo.done) $scope.todos.push(todo);
    //     });
    // };
}

$(document).ready(function(){
    $('#input').focus();
});