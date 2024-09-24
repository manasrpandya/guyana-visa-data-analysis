document.addEventListener("DOMContentLoaded", function() {
    const visaDataButton = document.getElementById('visaDataButton');
    const mmgDataButton = document.getElementById('mmgDataButton');
    const mmgBarPieButton = document.getElementById('mmgBarPieButton');
    const mmgMapButton = document.getElementById('mmgMapButton');
    const growthVisaButton = document.getElementById('growthVisaButton');
    const domesticButton = document.getElementById('domesticButton');
    const internationalButton = document.getElementById('internationalButton');
    const backButton = document.getElementById('backButton');
    
    const mainView = document.getElementById('mainView');
    const visaDataView = document.getElementById('visaDataView');
    const mmgDataView = document.getElementById('mmgDataView');
    const mmgBarPieView = document.getElementById('mmgBarPieView');
    const mmgMapView = document.getElementById('mmgMapView');
    const growthVisaView = document.getElementById('growthVisaView');
    const growthVisaDataView = document.getElementById('growthVisaDataView');
    const growthVisaImg1 = document.getElementById('growthVisaImg1');
    const growthVisaImg2 = document.getElementById('growthVisaImg2');
    const growthVisaImg3 = document.getElementById('growthVisaImg3');
    const growthVisaImg4 = document.getElementById('growthVisaImg4');

    // Helper function to show/hide views
    function showView(view) {
        mainView.style.display = 'none';
        visaDataView.style.display = 'none';
        mmgDataView.style.display = 'none';
        mmgBarPieView.style.display = 'none';
        mmgMapView.style.display = 'none';
        growthVisaView.style.display = 'none';
        growthVisaDataView.style.display = 'none';
        backButton.style.display = 'block'; // Show back button
        view.style.display = 'block';
    }

    // Back button to return to main view
    backButton.addEventListener('click', () => {
        visaDataView.style.display = 'none';
        mmgDataView.style.display = 'none';
        mmgBarPieView.style.display = 'none';
        mmgMapView.style.display = 'none';
        growthVisaView.style.display = 'none';
        growthVisaDataView.style.display = 'none';
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

    // When Growth Visa 6 Month Data button is clicked
    growthVisaButton.addEventListener('click', () => {
        showView(growthVisaView);
    });

    // When Domestic Data button is clicked
    domesticButton.addEventListener('click', () => {
        growthVisaImg1.src = 'Growth_data/dom_placeholder1.png';
        growthVisaImg2.src = 'Growth_data/dom_placeholder2.png';
        growthVisaImg3.src = 'Growth_data/dom_placeholder3.png';
        growthVisaImg4.src = 'Growth_data/dom_placeholder4.png';
        showView(growthVisaDataView);
    });
    
    // When International Data button is clicked
    internationalButton.addEventListener('click', () => {
        growthVisaImg1.src = 'Growth_data/in_placeholder1.png';
        growthVisaImg2.src = 'Growth_data/in_placeholder2.png';
        growthVisaImg3.src = 'Growth_data/in_placeholder3.png';
        growthVisaImg4.src = 'Growth_data/in_placeholder4.png';
        showView(growthVisaDataView);
    });

});
