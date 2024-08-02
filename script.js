// Function to fetch and parse the CSV data using Papa Parse
function fetchData() {
    return fetch('guyana monthly data visa 12 months - Sheet1.csv')  // Update the file path as needed
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

// Function to setup dropdown and aggregate data for each category
function setupData() {
    fetchData().then(data => {
        const categoryTotals = data.reduce((acc, row) => {
            const code = row['Merchant Category Code'];
            if (code) {
                if (!acc[code]) {
                    acc[code] = {
                        name: row['Month'],  // Assuming 'Month' contains category names
                        totalAmount: 0,
                        totalCount: 0
                    };
                }
                Object.keys(row).forEach(key => {
                    if (key.includes('Transaction Amount')) {
                        acc[code].totalAmount += row[key];
                    }
                    if (key.includes('Transaction Count')) {
                        acc[code].totalCount += row[key];
                    }
                });
            }
            return acc;
        }, {});

        populateDropdown(categoryTotals);
    }).catch(error => console.error('Error fetching and processing data:', error));
}

// Populate dropdown with categories
function populateDropdown(categories) {
    const select = document.getElementById('merchantCategorySelect');
    Object.entries(categories).forEach(([code, info]) => {
        const option = document.createElement('option');
        option.value = code;
        option.textContent = `${info.name} (${code})`;
        select.appendChild(option);
    });
}

// Display the total volume and count for the selected merchant category
function displayCategoryData() {
    const selectedCode = document.getElementById('merchantCategorySelect').value;
    if (!selectedCode) return;

    fetchData().then(data => {
        const categoryData = data.filter(item => item['Merchant Category Code'] === parseInt(selectedCode))
            .reduce((acc, item) => {
                Object.keys(item).forEach(key => {
                    if (key.includes('Transaction Amount')) {
                        acc.totalAmount += item[key];
                    }
                    if (key.includes('Transaction Count')) {
                        acc.totalCount += item[key];
                    }
                });
                return acc;
            }, { totalAmount: 0, totalCount: 0 });

        const dataView = document.getElementById('dataView');
        dataView.innerHTML = `<h3>Total Volume: ${categoryData.totalAmount.toLocaleString()}</h3>
                              <h3>Total Count: ${categoryData.totalCount.toLocaleString()}</h3>`;
    }).catch(error => {
        console.error('Error displaying category data:', error);
        document.getElementById('dataView').innerHTML = 'Error displaying data.';
    });
}

document.addEventListener('DOMContentLoaded', setupData);
