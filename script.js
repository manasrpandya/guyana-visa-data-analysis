// Function to fetch and parse the CSV data using Papa Parse
function fetchData() {
    return fetch('guyana monthly data visa 12 months - Sheet1.csv') // Ensure the file path matches
        .then(response => response.text())
        .then(csv => Papa.parse(csv, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: function (results) {
                return results.data;
            }
        }))
        .then(results => results.data.filter(row => row['Merchant Category Code'] && !isNaN(row['Merchant Category Code'])));
}

// Populate the dropdown with merchant categories
function populateDropdown() {
    fetchData().then(data => {
        const categories = [];
        data.forEach(item => {
            if (!categories.some(category => category.code === item['Merchant Category Code'])) {
                categories.push({
                    code: item['Merchant Category Code'],
                    name: item['Month'] // Assuming 'Month' has category names
                });
            }
        });

        const select = document.getElementById('merchantCategorySelect');
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.code;
            option.textContent = `${category.name} (${category.code})`;
            select.appendChild(option);
        });
    }).catch(error => {
        console.error('Error fetching data:', error);
    });
}

// Display category data when a merchant category is selected
function displayCategoryData() {
    const selectedCategory = document.getElementById('merchantCategorySelect').value;
    if (!selectedCategory) return; // Skip if default option is selected

    fetchData().then(data => {
        const filteredData = data.filter(item => item['Merchant Category Code'].toString() === selectedCategory);
        const totalVolume = filteredData.reduce((acc, cur) => acc + parseFloat(cur['Transaction Amount']), 0);
        const totalCount = filteredData.reduce((acc, cur) => acc + parseInt(cur['Transaction Count']), 0);

        const dataView = document.getElementById('dataView');
        dataView.innerHTML = `<h3>Total Volume: ${totalVolume.toFixed(2)}</h3>
                              <h3>Total Count: ${totalCount}</h3>`;
    }).catch(error => {
        console.error('Error processing category data:', error);
        document.getElementById('dataView').innerHTML = '<p>Error processing data.</p>';
    });
}

// Initialize dropdown on page load
document.addEventListener('DOMContentLoaded', populateDropdown);
