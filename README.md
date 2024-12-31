# Value Comparison Tool

## Overview
The Value Comparison Tool is a web-based application designed to help users compare the prices of products by calculating the price per unit. It supports dynamic unit conversions, making it easy to compare items with different measurement units. This tool is ideal for shoppers, businesses, or anyone who needs quick and accurate price comparisons.

## Features
- **Dynamic Unit Conversion**: Automatically converts quantities between compatible units (e.g., grams to kilograms, milliliters to liters).
- **Add/Delete Products**: Easily add or remove product entries for comparison.
- **Validation**: Ensures all inputs are valid (e.g., positive numbers, no division by zero).
- **Real-Time Updates**: Automatically updates available units and recalculates results dynamically.
- **Responsive Design**: Works seamlessly on both desktop and mobile devices.

## How It Works
1. Input the price, quantity, and unit for Product 1.
2. Add additional products as needed, ensuring their units are compatible with Product 1.
3. Click "Calculate" to see the price per unit for all products, normalized to the unit of Product 1.
4. Optionally, delete products to refine your comparison.

## File Structure

### 1. `index.html`
The main HTML file contains the structure of the application, including:
- A form for inputting product details.
- Buttons to add products and calculate results.
- A results section for displaying the calculated price per unit.

### 2. `styles.css`
Handles the visual design, ensuring a clean and user-friendly interface. Key elements include:
- Styling for the product input blocks and buttons.
- Responsive design for different screen sizes.

### 3. `script.js`
Contains the core functionality of the application, organized into modular functions:

#### Key Functions
- **`convertUnits(quantity, fromUnit, toUnit)`**
  Converts a given quantity from one unit to another using predefined conversion factors.

- **`populateUnitDropdown(selectElement, baseUnit)`**
  Populates the unit dropdowns dynamically based on the selected base unit.

- **`addProduct(productContainer, baseUnit)`**
  Adds a new product entry with fields for price, quantity, and unit, along with a delete button.

- **`calculatePrices(productContainer, baseUnit)`**
  Validates inputs and calculates the price per unit for each product, converting quantities as needed.

- **`validateInputs(price, quantity, unit)`**
  Ensures that price and quantity are positive numbers and that all fields are filled correctly.



#### Event Listeners
- **Base Unit Change**: Updates all unit dropdowns when the base unit changes.
- **Add Product**: Adds a new product block, ensuring unit compatibility.
- **Calculate Prices**: Computes and displays the price per unit for all products.

## Usage Instructions
1. Clone the repository:
   ```bash
   git clone [https://github.com/yourusername/value-comparison-tool.git](https://github.com/ggEnrique/ValueComparisonTool)
   ```
2. Navigate to the project folder:
   ```bash
   cd value-comparison-tool
   ```
3. Open `index.html` in your browser to start using the tool.

## Future Enhancements
- Support for more complex unit hierarchies (e.g., volume vs. weight).
- Add a "Reset" button to clear all inputs and start fresh.
- Save and load product lists for persistent comparisons.
- Advanced analytics, such as highlighting the best value automatically.

## Contributing
Contributions are welcome! If you'd like to improve this project:
1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Submit a pull request with a detailed explanation of your changes.

## License
This project is licensed under the MIT License. See `LICENSE` for details.
