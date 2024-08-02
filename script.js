// Function to fetch and parse the CSV data using Papa Parse
function fetchData() {
    return fetch('new_guyana monthly data visa 12 months - Sheet1.csv')  // Update the file path as needed
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

// Display the total volume and count for a specific merchant category
function displayCategoryData() {
    fetchData().then(data => {
        const categorySelect = document.getElementById('merchantCategorySelect');
        const selectedCode = categorySelect.value;
        if (!selectedCode) return;

        const filteredData = data.filter(item => item['Unnamed: 0'] == selectedCode);
        let totalAmount = 0;
        let totalCount = 0;

        filteredData.forEach(item => {
            Object.keys(item).forEach(key => {
                if (key.includes('Transaction Amount')) {
                    totalAmount += parseFloat(item[key].replace(/,/g, '')) || 0;
                }
                if (key.includes('Transaction Count')) {
                    totalCount += parseInt(item[key].replace(/,/g, '')) || 0;
                }
            });
        });

        const dataView = document.getElementById('dataView');
        dataView.innerHTML = `<h3>Total Volume for ${filteredData[0]['Unnamed: 1']}: ${totalAmount.toLocaleString()}</h3>
                              <h3>Total Count for ${filteredData[0]['Unnamed: 1']}: ${totalCount.toLocaleString()}</h3>`;
    }).catch(error => {
        console.error('Failed to process data:', error);
    });
}

// Populate dropdown with categories on page load
document.addEventListener('DOMContentLoaded', function() {
    fetchData().then(data => {
        const select = document.getElementById('merchantCategorySelect');
        data.forEach(item => {
            if (item['Unnamed: 0'] && !document.querySelector(`option[value="${item['Unnamed: 0']}"]`)) {
                const option = document.createElement('option');
                option.value = item['Unnamed: 0'];
                option.textContent = `${item['Unnamed: 1']} (${item['Unnamed: 0']})`;
                select.appendChild(option);
            }
        });
    }).catch(error => {
        console.error('Error fetching and processing data:', error);
    });
});
