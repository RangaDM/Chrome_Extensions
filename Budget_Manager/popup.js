$(function() {
    // Function to initialize the values from storage
    function initializeValues() {
        chrome.storage.sync.get(['total', 'limit'], function(budget) {
            $('#total').text(budget.total || 0);
            $('#limit').text(budget.limit || 0);
            
            var remainingLimit = budget.limit - (budget.total || 0);
            $('#Rlimit').text(remainingLimit);
        });
    }

    // Initialize values when the popup is opened
    initializeValues();

    // Click event listener for spendAmount button
    $('#spendAmount').click(function() {
        chrome.storage.sync.get(['total', 'limit'], function(budget) {
            var newTotal = parseInt(budget.total) || 0;
            var amount = parseInt($('#amount').val()) || 0;
            var limit = parseInt(budget.limit) || 0;

            var newTotalWithAmount = newTotal + amount;
            var remainingLimit = limit - newTotalWithAmount;

            if (amount && newTotalWithAmount <= limit) {
                chrome.storage.sync.set({ 'total': newTotalWithAmount }, function() {
                    $('#total').text(newTotalWithAmount);
                    $('#Rlimit').text(remainingLimit);
                    $('#amount').val('');
                });
            }
        });
    });

    // Click event listener for reset button
    $('#resetValues').click(function() {
        chrome.storage.sync.remove(['total', 'limit'], function() {
            initializeValues(); // Reset and initialize values again
        });
    });
});
