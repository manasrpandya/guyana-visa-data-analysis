document.addEventListener("DOMContentLoaded", function() {
    const visaDataButton = document.getElementById('visaDataButton');
    const mmgDataButton = document.getElementById('mmgDataButton');
    const mmgBarPieButton = document.getElementById('mmgBarPieButton');
    const mmgMapButton = document.getElementById('mmgMapButton');
    const backButton = document.getElementById('backButton');
    
    const mainView = document.getElementById('mainView');
    const visaDataView = document.getElementById('visaDataView');
    const mmgDataView = document.getElementById('mmgDataView');
    const mmgBarPieView = document.getElementById('mmgBarPieView');
    const mmgMapView = document.getElementById('mmgMapView');

    // Helper function to show/hide views
    function showView(view) {
        mainView.style.display = 'none';
        visaDataView.style.display = 'none';
        mmgDataView.style.display = 'none';
        mmgBarPieView.style.display = 'none';
        mmgMapView.style.display = 'none';
        backButton.style.display = 'block'; // Show back button
        view.style.display = 'block';
    }

    // Back button to return to main view
    backButton.addEventListener('click', () => {
        visaDataView.style.display = 'none';
        mmgDataView.style.display = 'none';
        mmgBarPieView.style.display = 'none';
        mmgMapView.style.display = 'none';
        mainView.style.display = 'block';
        backButton.style.display = 'none'; // Hide back button
    });

    // When Visa Data button is clicked
    visaDataButton.addEventListener('click', () => {
        showView(visaDataView);
    });

    // When MMG Data button is clicked
    mmgDataButton.addEventListener('click', () => {
        showView(mmgDataView);
    });

    // When MMG Bar/Pie Charts button is clicked
    mmgBarPieButton.addEventListener('click', () => {
        showView(mmgBarPieView);
    });

    // When MMG Map button is clicked, go to mmg_map.html
    mmgMapButton.addEventListener('click', () => {
        window.location.href = 'mmg_map.html'; // Redirect to mmg_map.html
    });
});
