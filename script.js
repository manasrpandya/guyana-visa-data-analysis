function fetchData() {
    return fetch('guyana monthly data visa 12 months - Sheet1.csv') // Correct the path as needed
        .then(response => response.text())
        .then(csvText => Papa.parse(csvText, { header: true, dynamicTyping: true, skipEmptyLines: true }))
        .then(parsed => parsed.data);
}

function populateDropdown() {
    fetchData().then(data => {
        const select = document.getElementById('merchantCategorySelect');
        const categories = new Map();

        data.forEach(row => {
            const code = row['Merchant Category Code'];
            const name = row['Month'];
            if (code && !categories.has(code)) {
                categories.set(code, name);
            }
        });

        categories.forEach((name, code) => {
            const option = document.createElement('option');
            option.value = code;
            option.textContent = `${name} (${code})`;
            select.appendChild(option);
        });
    }).catch(error => console.error('Failed to populate dropdown:', error));
}

function displayCategoryData() {
    const code = document.getElementById('merchantCategorySelect').value;
    if (!code) {
        document.getElementById('dataView').innerHTML = 'Please select a merchant category.';
        return;
    }

    fetchData().then(data => {
        const filtered = data.filter(item => item['Merchant Category Code'] === +code);
        const totalVolume = filtered.reduce((acc, curr) => acc + curr['Transaction Amount'], 0);
        const totalCount = filtered.reduce((acc, curr) => acc + curr['Transaction Count'], 0);

        const resultsHTML = `<h3>Total Transaction Volume: ${totalVolume}</h3><h3>Total Transaction Count: ${totalCount}</h3>`;
        document.getElementById('dataView').innerHTML = resultsHTML;
    }).catch(error => {
        console.error('Failed to display category data:', error);
        document.getElementById('dataView').innerHTML = 'Error displaying data.';
    });
}

document.addEventListener('DOMContentLoaded', populateDropdown);
