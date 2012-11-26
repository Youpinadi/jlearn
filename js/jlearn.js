function CardCtrl($scope, $timeout) {
    $scope.cards =
    [
        {source:'あ', target: 'a', success:0, error: 0},
        {source:'か', target: 'ka', success:0, error: 0},
        {source:'さ', target: 'sa', success:0, error: 0},
        {source:'た', target: 'ta', success:0, error: 0},
        {source:'な', target: 'na', success:0, error: 0},
        {source:'は', target: 'ha', success:0, error: 0},
        {source:'ま', target: 'ma', success:0, error: 0},
    ];
    $scope.to = null;

    $scope.nextCard = function() {
        $scope.input = '';
        $scope.currentIndex = Math.floor(Math.random() * $scope.cards.length);
        $scope.currentCard = $scope.cards[$scope.currentIndex];
    };

    $scope.check = function() {
        // we do the check when the size is ok
        if ($scope.input.length == $scope.currentCard.target.length)
        {
            if($scope.input == $scope.currentCard.target)
            {
                $scope.cards[$scope.currentIndex].success ++;
            }
            else
            {
                $scope.cards[$scope.currentIndex].error ++;
            }
            $timeout($scope.nextCard, 300);
        }
    };

    $scope.getClass = function(card) {
        return card.success > card.error ? 'success' : (card.success < card.error ? 'error' : '');
    };

    $scope.currentCard = null;
    $scope.currentIndex = null;
    $scope.history = [];
    $scope.nextCard();


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