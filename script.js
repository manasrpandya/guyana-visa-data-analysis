// Function to fetch and parse the CSV data using Papa Parse
function fetchData() {
    return fetch('new_guyana monthly data visa 12 months - Sheet1.csv')  // Adjust the path as necessary
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

// Function to setup data and populate the dropdown
function setupData() {
    fetchData().then(data => {
        const categories = new Map(); // To hold unique categories

        // Process each row to populate the categories map with sums
        data.forEach(row => {
            const code = row['Merchant Category Code'];
            if (code && !categories.has(code)) {
                categories.set(code, {
                    name: row['Merchant Category Name'], // Ensure column name for category names is correct
                    totalAmount: 0,
                    totalCount: 0
                });
            }
            if (categories.has(code)) { // Only add amounts if the code exists to avoid undefined entries
                Object.keys(row).forEach(key => {
                    if (key.includes('Transaction Amount')) {
                        categories.get(code).totalAmount += parseFloat(row[key]) || 0;
                    }
                    if (key.includes('Transaction Count')) {
                        categories.get(code).totalCount += parseInt(row[key]) || 0;
                    }
                });
            }
        });

        populateDropdown(categories);
    }).catch(error => console.error('Error fetching and processing data:', error));
}

// Fill the dropdown menu with the categories
function populateDropdown(categories) {
    const select = document.getElementById('merchantCategorySelect');
    // Clear existing options first
    select.innerHTML = '<option value="">Select a Merchant Category</option>';
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
    if (!selectedCode) {
        document.getElementById('dataView').innerHTML = 'Please select a merchant category.';
        return;
    }

    fetchData().then(data => {
        const filteredData = data.filter(item => item['Merchant Category Code'] === selectedCode);
        let totalAmount = 0;
        let totalCount = 0;

        filteredData.forEach(item => {
            Object.keys(item).forEach(key => {
                if (key.includes('Transaction Amount')) {
                    totalAmount += parseFloat(item[key]) || 0;
                }
                if (key.includes('Transaction Count')) {
                    totalCount += parseInt(item[key]) || 0;
                }
            });
        });

        const dataView = document.getElementById('dataView');
        dataView.innerHTML = `<h3>Total Volume for ${select.options[select.selectedIndex].text}: ${totalAmount.toLocaleString()}</h3>
                              <h3>Total Count for ${select.options[select.selectedIndex].text}: ${totalCount.toLocaleString()}</h3>`;
    }).catch(error => {
        console.error('Error displaying category data:', error);
        document.getElementById('dataView').innerHTML = 'Error displaying data.';
    });
}

document.addEventListener('DOMContentLoaded', setupData);
