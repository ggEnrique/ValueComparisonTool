// Centralized unit conversion factors
const unitConversionFactors = {
    "ml": { "ml": 1, "L": 0.001, "fl oz": 0.033814 },
    "L": { "ml": 1000, "L": 1, "fl oz": 33.814 },
    "fl oz": { "ml": 29.5735, "L": 0.0295735, "fl oz": 1 },
    "g": { "g": 1, "kg": 0.001, "oz": 0.035274, "lb": 0.00220462 },
    "kg": { "g": 1000, "kg": 1, "oz": 35.274, "lb": 2.20462 },
    "oz": { "g": 28.3495, "kg": 0.0283495, "oz": 1, "lb": 0.0625 },
    "lb": { "g": 453.592, "kg": 0.453592, "oz": 16, "lb": 1 }
};

// Helper function to convert units
function convertUnits(quantity, fromUnit, toUnit) {
    if (fromUnit === toUnit) return quantity;
    const conversionFactor = unitConversionFactors[fromUnit]?.[toUnit];
    if (!conversionFactor) {
        alert(`Cannot convert from ${fromUnit} to ${toUnit}`);
        return null;
    }
    return quantity * conversionFactor;
}

// Populate unit dropdown options
function populateUnitDropdown(selectElement, baseUnit) {
    const compatibleUnits = Object.keys(unitConversionFactors[baseUnit] || {});
    selectElement.innerHTML = `<option value="" disabled>Select unit</option>`;
    compatibleUnits.forEach(unit => {
        const option = document.createElement('option');
        option.value = unit;
        option.textContent = unit;
        selectElement.appendChild(option);
    });
    selectElement.value = baseUnit; // Default to base unit
}

// Add a new product block
function addProduct(productContainer, baseUnit) {
    const productCount = productContainer.children.length + 1;
    const newProduct = document.createElement('div');
    newProduct.className = 'product';
    newProduct.innerHTML = `
        <h2>Product ${productCount}</h2>
        <label for="price${productCount}">Price:</label>
        <input type="number" id="price${productCount}" step="0.01" name="price${productCount}" required>
        <label for="quantity${productCount}">Quantity:</label>
        <input type="number" id="quantity${productCount}" step="0.01" name="quantity${productCount}" required>
        <label for="unit${productCount}">Unit:</label>
        <select id="unit${productCount}" class="unit-select" name="unit${productCount}" required></select>
        <button type="button" class="delete-product-btn">Delete</button>
    `;
    productContainer.appendChild(newProduct);

    // Populate unit dropdown
    const unitDropdown = newProduct.querySelector('.unit-select');
    populateUnitDropdown(unitDropdown, baseUnit);

    // Add event listener to delete button
    const deleteButton = newProduct.querySelector('.delete-product-btn');
    deleteButton.addEventListener('click', () => {
        productContainer.removeChild(newProduct);
        renumberProducts(productContainer); // Optional renumbering
    });
}

// Optional: Renumber products after deletion
function renumberProducts(productContainer) {
    const products = productContainer.querySelectorAll('.product');
    products.forEach((product, index) => {
        const productNumber = index + 1;
        product.querySelector('h2').textContent = `Product ${productNumber}`;
        product.querySelectorAll('label').forEach(label => {
            label.setAttribute('for', label.getAttribute('for').replace(/\d+$/, productNumber));
        });
        product.querySelectorAll('input, select').forEach(input => {
            input.setAttribute('id', input.getAttribute('id').replace(/\d+$/, productNumber));
            input.setAttribute('name', input.getAttribute('name').replace(/\d+$/, productNumber));
        });
    });
}

function validateInputs(price, quantity, unit) {
    if (isNaN(price) || isNaN(quantity) || !unit) {
        alert("All fields (price, quantity, and unit) must be filled out correctly.");
        return false;
    }
    if (price <= 0) {
        alert("Price must be a positive number.");
        return false;
    }
    if (quantity <= 0) {
        alert("Quantity must be a positive number greater than zero.");
        return false;
    }
    return true;
}


// Calculate and display price per unit for all products
function calculatePrices(productContainer, baseUnit) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    const products = productContainer.querySelectorAll('.product');
    products.forEach((product, index) => {
        const price = parseFloat(product.querySelector('input[name^="price"]').value);
        const quantity = parseFloat(product.querySelector('input[name^="quantity"]').value);
        const unit = product.querySelector('select[name^="unit"]').value;

        if (!validateInputs(price, quantity, unit)) {
            return; // Skip this product if validation fails
        }

        const normalizedQuantity = convertUnits(quantity, unit, baseUnit);
        if (normalizedQuantity === null) return;

        const pricePerUnit = price / normalizedQuantity;
        resultDiv.innerHTML += `<p>Product ${index + 1}: $${pricePerUnit.toFixed(5)} per ${baseUnit}</p>`;
    });
}

// Event listeners
window.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('products');
    const baseUnitDropdown = document.getElementById('unit1');
    const addProductBtn = document.getElementById('add-product-btn');
    const calculateBtn = document.getElementById('calculate-btn');

    // Populate initial unit dropdown
    baseUnitDropdown.addEventListener('change', () => {
        const baseUnit = baseUnitDropdown.value;
        const unitDropdowns = document.querySelectorAll('.unit-select');
        unitDropdowns.forEach((dropdown, index) => {
            if (index === 0) return; // Skip base product
            populateUnitDropdown(dropdown, baseUnit);
        });
    });

    // Add new product
    addProductBtn.addEventListener('click', () => {
        const baseUnit = baseUnitDropdown.value;
        if (!baseUnit) {
            alert('Please select a unit for Product 1 before adding another product.');
            return;
        }
        addProduct(productContainer, baseUnit);
    });

    // Calculate prices
    calculateBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const baseUnit = baseUnitDropdown.value;
        if (!baseUnit) {
            alert('Please select a unit for Product 1.');
            return;
        }
        calculatePrices(productContainer, baseUnit);
    });
});
