// Function to fetch and parse the CSV data using Papa Parse
function fetchData() {
    return fetch('new_guyana monthly data visa 12 months - Sheet1.csv') // Update the file path as needed
        .then(response => response.text())
        .then(csvText => {
            return new Promise((resolve, reject) => {
                Papa.parse(csvText, {
                    header: true,
                    dynamicTyping: true,
                    skipEmptyLines: true,
                    complete: results => resolve(results.data),
                    error: reject
                });
            });
        });
}

// Populate the dropdown with merchant categories and process data for sums
function setupData() {
    fetchData().then(data => {
        const categories = new Map(); // To hold unique categories and their data
        data.forEach((item, index) => {
            if (index > 1) { // Skipping the first two metadata rows
                const code = item['Merchant Category Code'];
                const name = item['Merchant Category Name']; // Assuming column name is corrected
                if (!categories.has(code)) {
                    categories.set(code, {
                        name: name,
                        totalAmount: 0,
                        totalCount: 0
                    });
                }
                // Aggregate amounts and counts
                Object.keys(item).forEach(key => {
                    if (key.includes('Transaction Amount')) {
                        categories.get(code).totalAmount += parseFloat(item[key]) || 0;
                    } else if (key.includes('Transaction Count')) {
                        categories.get(code).totalCount += parseInt(item[key]) || 0;
                    }
                });
            }
        });

        populateDropdown(categories);
    }).catch(error => console.error('Failed to fetch and process data:', error));
}

// Fill the dropdown menu with the categories
function populateDropdown(categories) {
    const select = document.getElementById('merchantCategorySelect');
    categories.forEach((info, code) => {
        const option = document.createElement('option');
        option.value = code;
        option.textContent = `${info.name} (${code})`;
        select.appendChild(option);
    });
}

// Display the total volume and count for the selected merchant category
function displayCategoryData() {
    const select = document.getElementById('merchantCategorySelect');
    const selectedCode = select.value;
    if (!selectedCode) return;

    const info = categories.get(selectedCode);
    const dataView = document.getElementById('dataView');
    dataView.innerHTML = `<h3>Total Volume for ${info.name}: ${info.totalAmount.toLocaleString()}</h3>
                          <h3>Total Count for ${info.name}: ${info.totalCount.toLocaleString()}</h3>`;
}

// Initialize the dropdown on page load
document.addEventListener('DOMContentLoaded', setupData);
