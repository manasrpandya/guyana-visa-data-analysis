// Function to fetch and parse the CSV data using Papa Parse
function fetchData() {
    return fetch('guyana monthly data visa 12 months - Sheet1.csv')  // Ensure the file path matches
        .then(response => response.text())
        .then(data => Papa.parse(data, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            transformHeader: header => header.trim(),
            complete: function(results) {
                return results.data;
            }
        }));
}

// Function to display the full data in a table format
function loadFullData() {
    fetchData().then(data => {
        const dataView = document.getElementById('dataView');
        let html = '<table class="table table-striped"><thead class="table-dark"><tr>';

        // Create table headers from the first data row keys
        Object.keys(data[0]).forEach(key => {
            html += `<th>${key}</th>`;
        });
        html += '</tr></thead><tbody>';

        // Create table rows from data
        data.forEach(row => {
            html += '<tr>';
            Object.values(row).forEach(val => {
                html += `<td>${val}</td>`;
            });
            html += '</tr>';
        });

        html += '</tbody></table>';
        dataView.innerHTML = html;
    }).catch(error => {
        console.error('Error loading the data:', error);
    });
}

// Example function to display monthly data using Chart.js
function loadMonthlyData() {
    fetchData().then(data => {
        const months = [...new Set(data.map(item => item.Month))].sort();
        const transactionCounts = months.map(month =>
            data.filter(item => item.Month === month).reduce((acc, cur) => acc + cur['Transaction Count'], 0)
        );

        const ctx = document.createElement('canvas');
        document.getElementById('dataView').innerHTML = '';
        document.getElementById('dataView').appendChild(ctx);

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [{
                    label: 'Total Transactions by Month',
                    data: transactionCounts,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }).catch(error => {
        console.error('Error processing monthly data:', error);
    });
}

// Additional functions for segment data and average ticket prices can be modeled similarly
