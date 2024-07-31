// Function to fetch and parse the CSV data
function fetchData() {
    return fetch('data.csv')  // Make sure this path matches the CSV file's location in your repository
        .then(response => response.text())
        .then(data => Papa.parse(data, { header: true, dynamicTyping: true }).data);
}

// Function to display the full data in a table
function loadFullData() {
    fetchData().then(data => {
        const dataView = document.getElementById('dataView');
        let html = '<table class="table"><thead><tr>';

        // Create table headers from keys
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
    });
}

// Function to display data month-by-month using Chart.js
function loadMonthlyData() {
    fetchData().then(data => {
        const months = [...new Set(data.map(item => item.Month))];
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
                }
            }
        });
    });
}

// Function to display data segmented by category (similar structure to loadMonthlyData)
function loadSegmentData() {
    fetchData().then(data => {
        const categories = [...new Set(data.map(item => item['Merchant Category Code']))];
        const totalsByCategory = categories.map(cat =>
            data.filter(item => item['Merchant Category Code'] === cat).reduce((acc, cur) => acc + cur['Transaction Amount'], 0)
        );

        const ctx = document.createElement('canvas');
        document.getElementById('dataView').innerHTML = '';
        document.getElementById('dataView').appendChild(ctx);

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: categories,
                datasets: [{
                    label: 'Total Transaction Amount by Category',
                    data: totalsByCategory,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    });
}

// Function to calculate and display average ticket prices (similar to other load functions)
function loadAverageTicket() {
    fetchData().then(data => {
        const categories = [...new Set(data.map(item => item['Merchant Category Code']))];
        const averageTickets = categories.map(cat => {
            const filteredData = data.filter(item => item['Merchant Category Code'] === cat);
            const totalAmount = filteredData.reduce((acc, cur) => acc + cur['Transaction Amount'], 0);
            const totalCount = filteredData.reduce((acc, cur) => acc + cur['Transaction Count'], 0);
            return totalAmount / totalCount;
        });

        const ctx = document.createElement('canvas');
        document.getElementById('dataView').innerHTML = '';
        document.getElementById('dataView').appendChild(ctx);

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: categories,
                datasets: [{
                    label: 'Average Ticket Price by Category',
                    data: averageTickets,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    });
}
