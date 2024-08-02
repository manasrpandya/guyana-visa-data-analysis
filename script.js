// Function to fetch and parse the CSV data using Papa Parse
function fetchData() {
    return fetch('guyana monthly data visa 12 months - Sheet1.csv') // Ensure the file path matches
        .then(response => response.text())
        .then(csvText => {
            return new Promise((resolve, reject) => {
                Papa.parse(csvText, {
                    header: true,
                    dynamicTyping: true,
                    skipEmptyLines: true,
                    complete: results => resolve(results.data),
                    error: error => reject(error)
                });
            });
        });
}

// Populate the dropdown with merchant categories
function populateDropdown(categories) {
    const selectElement = document.getElementById('merchantCategorySelect');
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.code;
        option.textContent = `${category.name} (${category.code})`;
        selectElement.appendChild(option);
    });
}

// Extract categories from the data
function setupCategories() {
    fetchData().then(data => {
        const uniqueCategories = new Map(); // To avoid duplicates and maintain unique entries

        // Loop through each data row and extract merchant category codes and names
        data.forEach(row => {
            if (row['Merchant Category Code'] && row['Month'] && !uniqueCategories.has(row['Merchant Category Code'])) {
                uniqueCategories.set(row['Merchant Category Code'], row['Month']);
            }
        });

        const categories = Array.from(uniqueCategories, ([code, name]) => ({ code, name }));
        populateDropdown(categories);
    }).catch(error => {
        console.error('Error in setting up categories:', error);
    });
}

// Function to calculate and display selected category data
function displayCategoryData() {
    const selectedCode = document.getElementById('merchantCategorySelect').value;
    if (!selectedCode) return;

    fetchData().then(data => {
        const filteredData = data.filter(item => item['Merchant Category Code'] === parseInt(selectedCode));
        const totalVolume = filteredData.reduce((sum, record) => sum + record['Transaction Amount'], 0);
        const totalCount = filteredData.reduce((sum, record) => sum + record['Transaction Count'], 0);

        const displayDiv = document.getElementById('dataView');
        displayDiv.innerHTML = `<h3>Total Volume: ${totalVolume.toLocaleString()}</h3><h3>Total Count: ${totalCount.toLocaleString()}</h3>`;
    }).catch(error => {
        console.error('Error in displaying category data:', error);
        document.getElementById('dataView').innerHTML = '<p>Error processing data.</p>';
    });
}

// Initial setup
document.addEventListener('DOMContentLoaded', setupCategories);
