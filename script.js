// Function to fetch and parse the CSV data using Papa Parse
function fetchData() {
    return fetch('guyana monthly data visa 12 months - Sheet1.csv') // Ensure the file path matches
        .then(response => response.text())
        .then(csv => Papa.parse(csv, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            transformHeader: header => header.trim(),
            complete: function (results) {
                return results.data;
            }
        }))
        .then(results => results.data);
}

// Populate the dropdown with merchant categories
function populateDropdown(categories) {
    const select = document.getElementById('merchantCategorySelect');
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.code;
        option.textContent = `${category.name} (${category.code})`;
        select.appendChild(option);
    });
}

// Load data and handle dropdown population
document.addEventListener('DOMContentLoaded', function() {
    fetchData().then(data => {
        const categories = data.map(item => ({
            code: item['Merchant Category Code'],
            name: item['Month']  // Assuming 'Month' column has the category names
        })).filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.code === value.code && t.name === value.name
            ))
        );

        populateDropdown(categories);
    });
});

// Display category data when a merchant category is selected
function displayCategoryData() {
    const selectedCategory = document.getElementById('merchantCategorySelect').value;
    if (!selectedCategory) return; // Skip if "Select a Merchant Category" is chosen

    fetchData().then(data => {
        const filteredData = data.filter(item => item['Merchant Category Code'] === parseInt(selectedCategory));
        const totalVolume = filteredData.reduce((acc, cur) => acc + cur['Transaction Amount'], 0);
        const totalCount = filteredData.reduce((acc, cur) => acc + cur['Transaction Count'], 0);

        const dataView = document.getElementById('dataView');
        dataView.innerHTML = `<h3>Total Volume: ${totalVolume}</h3>
                              <h3>Total Count: ${totalCount}</h3>`;
    });
}
