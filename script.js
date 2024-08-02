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
                    name: row['Merchant Category Name'], // Assuming there's a column for names
                    totalAmount: 0,
                    totalCount: 0
                });
            }
            Object.keys(row).forEach(key => {
                if (key.includes('Transaction Amount')) {
                    categories.get(code).totalAmount += parseFloat(row[key]) || 0;
                }
                if (key.includes('Transaction Count')) {
                    categories.get(code).totalCount += parseInt(row[key]) || 0;
                }
            });
        });

        populateDropdown(categories);
    }).catch(error => console.error('Error fetching and processing data:', error));
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

    fetchData().then(data => {
        const categoryInfo = {
            totalAmount: 0,
            totalCount: 0
        };

        data.filter(item => item['Merchant Category Code'] === selectedCode).forEach(item => {
            Object.keys(item).forEach(key => {
                if (key.includes('Transaction Amount')) {
                    categoryInfo.totalAmount += parseFloat(item[key]) || 0;
                }
                if (key.includes('Transaction Count')) {
                    categoryInfo.totalCount += parseInt(item[key]) || 0;
                }
            });
        });

        const dataView = document.getElementById('dataView');
        dataView.innerHTML = `<h3>Total Volume for ${select.selectedOptions[0].textContent}: ${categoryInfo.totalAmount.toLocaleString()}</h3>
                              <h3>Total Count for ${select.selectedOptions[0].textContent}: ${categoryInfo.totalCount.toLocaleString()}</h3>`;
    }).catch(error => {
        console.error('Error displaying category data:', error);
        document.getElementById('dataView').innerHTML = 'Error displaying data.';
    });
}

document.addEventListener('DOMContentLoaded', setupData);
