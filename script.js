function calculateTotalPrice() {
    var foodItems = document.querySelectorAll('.food-item');
    var totalPrice = 0;
    
    foodItems.forEach(function(foodItem) {
        var foodSelect = foodItem.querySelector('.food');
        var quantityInput = foodItem.querySelector('.quantity');

        var foodPrice = getFoodPrice(foodSelect.value);
        var quantity = parseInt(quantityInput.value) || 0;

        totalPrice += foodPrice * quantity;
    });

    return totalPrice;
}

function getFoodPrice(food) {
    switch (food) {
        case 'Burger':
            return 60;
        case 'Fries':
            return 50;
        case 'Fishball':
            return 20;
        case 'Kikiam':
            return 25;
        default:
            return 0;
    }
}

function addFoodItem() {
    var foodContainer = document.getElementById('foodContainer');
    var foodItem = document.createElement('div');
    foodItem.classList.add('food-item');
    foodItem.innerHTML = `
        <div>
            <label for="food"><p>Choice</p></label>
            <select class="food">
                <option value="Burger">Burger</option>
                <option value="Fries">Fries</option>
                <option value="Fishball">Fishball</option>
                <option value="Kikiam">Kikiam</option>                   
            </select>
            <label for="quantity"><p>Quantity</p></label>
            <input type="number" class="quantity" min="0">
            <button class="delete-btn">Delete</button>
        </div>
    `;
    foodContainer.appendChild(foodItem);

    // Add event listener to the newly created quantity input field
    var quantityInput = foodItem.querySelector('.quantity');
    quantityInput.addEventListener('input', updateTotalPrice);

    // Add event listener to the delete button
    var deleteButton = foodItem.querySelector('.delete-btn');
    deleteButton.addEventListener('click', function() {
        foodItem.remove();
        updateTotalPrice();
    });
}

function updateTotalPrice() {
    var foodItems = document.querySelectorAll('.food-item');
    var totalPrice = 0;
    
    foodItems.forEach(function(foodItem) {
        var foodSelect = foodItem.querySelector('.food');
        var quantityInput = foodItem.querySelector('.quantity');

        var foodPrice = getFoodPrice(foodSelect.value);
        var quantity = parseInt(quantityInput.value) || 0;

        totalPrice += foodPrice * quantity;
    });

    // Display the total price
    document.getElementById('totalPrice').innerText = 'Total Price: ' + totalPrice + ' pesos';
}

// Event listener for form submission (payment)
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    
    var totalPrice = calculateTotalPrice();
    var paidAmount = parseInt(document.getElementById('money').value) || 0;
    var change = paidAmount - totalPrice;
    
    if (change >= 0) {
        alert("THANK YOU FOR YOUR ORDER.\nYour change is: " + change + " pesos");
        window.location.reload();
    } else {
        alert("Please provide enough cash to pay for your order.");
    }
});

// Event listener for adding a food item
document.getElementById('addFoodItem').addEventListener('click', addFoodItem);
