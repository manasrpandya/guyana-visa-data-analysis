document.addEventListener("DOMContentLoaded", function() {
    // FlowCatalyst Dashboard - MMG and Visa Sections
    const dashboardContainer = document.getElementById("dashboard");
    const visaSection = document.getElementById("searchContainer");
    const mmgOptions = document.getElementById("mmgOptions");
    const visaPlotContainer = document.getElementById("plotContainer");
    const backButton = document.getElementById("backButton");



    const segments = {
    "overall": {
        categories: [
            { code: "0000", name: "do not click on this, click the option ABOVE" }
        ]
    },
    "AIRLINES": {
        categories: [
            { code: "4511", name: "AIRLINES, AIR CARRIERS" }
        ]
    },
    "APPAREL & ACCESSORIES": {
        categories: [
            { code: "5621", name: "WOMENS READY TO WEAR STORES" },
            { code: "5631", name: "WOMENS ACCESS/SPECIALTY" },
            { code: "5641", name: "CHILDREN/INFANTS WEAR STORES" },
            { code: "5651", name: "FAMILY CLOTHING STORES" },
            { code: "5655", name: "SPORTS/RIDING APPAREL STORES" },
            { code: "5661", name: "SHOE STORES" },
            { code: "5691", name: "MENS/WOMENS CLOTHING STORES" },
            { code: "5698", name: "WIG AND TOUPEE STORES" },
            { code: "5699", name: "MISC APPAREL/ACCESS STORES" }
        ]
    },
    "AUTOMOTIVE": {
        categories: [
            { code: "5013", name: "MOTOR VEHICLE SUPPLY/NEW PARTS" },
            { code: "5511", name: "CAR & TRUCK DEALERS/NEW/USED" },
            { code: "5521", name: "CAR & TRUCK DEALERS/USED ONLY" },
            { code: "5533", name: "AUTOMOTIVE PARTS STORES" },
            { code: "5571", name: "MOTORCYCLE DEALERS" },
            { code: "5599", name: "MISC AUTO DEALERS - DEFAULT" },
            { code: "7538", name: "AUTO SERVICE SHOPS/NON DEALER" }
        ]
    },
    "BUSINESS TO BUSINESS": {
        categories: [
            { code: "5021", name: "COMMERCIAL FURNITURE" },
            { code: "5039", name: "CONSTRUCTION MATERIALS - DEF" },
            { code: "5046", name: "COMMERCIAL EQUIPMENT - DEFAULT" },
            { code: "5065", name: "ELECTRICAL PARTS/EQUIPMENT" },
            { code: "5072", name: "HARDWARE EQUIPMENT/SUPPLIES" },
            { code: "5085", name: "INDUSTRIAL SUPPLIES - DEF" },
            { code: "5099", name: "DURABLE GOODS - DEFAULT" },
            { code: "5111", name: "STATIONERY/OFFICE SUPPLIES" },
            { code: "5137", name: "UNIFORMS & COMMERCIAL CLOTHING" },
            { code: "5139", name: "COMMERCIAL FOOTWEAR" },
            { code: "5169", name: "CHEMICALS/ALLIED PRODS - DEF" },
            { code: "7311", name: "ADVERTISING SERVICES" },
            { code: "7379", name: "COMPUTER MAINT/SVCS - DEF" },
            { code: "7399", name: "BUSINESS SERVICES - DEFAULT" }
        ]
    },
    "DEPARTMENT STORES": {
        categories: [
            { code: "5311", name: "DEPARTMENT STORES" }
        ]
    },
    "DRUG STORES & PHARMACIES": {
        categories: [
            { code: "5912", name: "DRUG STORES AND PHARMACIES" }
        ]
    },
    "EDUCATION & GOVERNMENT": {
        categories: [
            { code: "8211", name: "ELEMENTARY/SECONDARY SCHOOLS" },
            { code: "8220", name: "COLLEGES/UNIVERSITIES" },
            { code: "8241", name: "CORRESPONDENCE SCHOOLS" },
            { code: "8249", name: "VOCATIONAL/TRADE SCHOOLS" },
            { code: "8299", name: "SCHOOLS/EDUCATION SVC - DEF" }
        ]
    },
    "ELECTRONICS": {
        categories: [
            { code: "5732", name: "ELECTRONICS STORES" }
        ]
    },
    "ENTERTAINMENT": {
        categories: [
            { code: "7832", name: "MOTION PICTURE THEATRES" },
            { code: "7911", name: "DANCE HALLS, STUDIOS, AND SCHOOLS" },
            { code: "7922", name: "THEATRICAL PRODUCERS" },
            { code: "7929", name: "BANDS, ORCHESTRAS, AND VARIOUS ENTERTAINERS" }
        ]
    },
    "FOOD & GROCERY": {
        categories: [
            { code: "5411", name: "GROCERY STORES" }
        ]
    },
    "FUEL": {
        categories: [
            { code: "5541", name: "SERVICE STATIONS" }
        ]
    },
    "HEALTH CARE": {
        categories: [
            { code: "8011", name: "DOCTORS" },
            { code: "8021", name: "DENTISTS" },
            { code: "8031", name: "OSTEOPATHIC PHYSICIANS" },
            { code: "8041", name: "CHIROPRACTORS" },
            { code: "8042", name: "OPTOMETRISTS" },
            { code: "8043", name: "OPTICIANS" },
            { code: "8049", name: "PODIATRISTS AND OTHER MEDICAL SPECIALISTS" },
            { code: "8062", name: "HOSPITALS" },
            { code: "8099", name: "MEDICAL SERVICES AND HEALTH PRACTITIONERS" }
        ]
    },
    "HOME IMPROVEMENT & SUPPLY": {
        categories: [
            { code: "1520", name: "GENERAL CONTRACTORS-RESIDENTIAL AND COMMERCIAL" },
            { code: "5200", name: "HOME SUPPLY WAREHOUSE STORES" },
            { code: "5211", name: "LUMBER AND BUILDING MATERIALS STORES" },
            { code: "5231", name: "PAINT AND WALLPAPER STORES" },
            { code: "5251", name: "HARDWARE STORES" },
            { code: "5261", name: "LAWN AND GARDEN SUPPLY STORES" },
            { code: "5712", name: "FURNITURE, HOME FURNISHINGS, AND EQUIPMENT STORES" },
            { code: "5713", name: "FLOOR COVERING STORES" },
            { code: "5719", name: "MISCELLANEOUS HOME FURNISHING SPECIALTY STORES" }
        ]
    },
    "INSURANCE": {
        categories: [
            { code: "6300", name: "INSURANCE SALES, UNDERWRITING, AND PREMIUMS" }
        ]
    },
    "LODGING": {
        categories: [
            { code: "7011", name: "HOTELS AND MOTELS" }
        ]
    },
    "PERSONAL SERVICES": {
        categories: [
            { code: "7230", name: "BEAUTY AND BARBER SHOPS" },
            { code: "7261", name: "FUNERAL SERVICES AND CREMATORIES" },
            { code: "7299", name: "MISCELLANEOUS PERSONAL SERVICES" }
        ]
    },
    "PROFESSIONAL SERVICES": {
        categories: [
            { code: "8931", name: "ACCOUNTING, AUDITING, AND BOOKKEEPING SERVICES" }
        ]
    },
    "QSR": {
        categories: [
            { code: "5814", name: "FAST FOOD RESTAURANTS" }
        ]
    },
    "REAL ESTATE": {
        categories: [
            { code: "6513", name: "REAL ESTATE AGENTS AND MANAGERS - RENTALS" }
        ]
    },
    "RETAIL GOODS": {
        categories: [
            { code: "5941", name: "SPORTING GOODS STORES" },
            { code: "5945", name: "HOBBY, TOY, AND GAME SHOPS" },
            { code: "5977", name: "COSMETIC STORES" }
        ]
    },
    "RETAIL SERVICES": {
        categories: [
            { code: "7210", name: "LAUNDRY, CLEANING, AND GARMENT SERVICES" },
            { code: "7211", name: "LAUNDRIES - FAMILY AND COMMERCIAL" }
        ]
    },
       "RESTAURANTS": {
        categories: [
            { code: "5812", name: "EATING PLACES AND RESTAURANTS" },
            { code: "5813", name: "BARS/TAVERNS/LOUNGES/DISCOS" }
        ]
    },
    "RETAIL SERVICES": {
        categories: [
            { code: "4214", name: "MOTOR FREIGHT CARRIERS" },
            { code: "4215", name: "COURIER SERVICES" },
            { code: "5697", name: "TAILOR/SEAMSTRESS/ALTERS" },
            { code: "7210", name: "LAUNDRY/CLEANING/GARMENT SV" },
            { code: "7211", name: "LAUNDRIES-FAMILY/COMMERCIAL" },
            { code: "7230", name: "BEAUTY/BARBER SHOPS" },
            { code: "7261", name: "FUNERAL SERVICE/CREMATORIES" },
            { code: "7298", name: "HEALTH & BEAUTY SPAS" },
            { code: "7333", name: "COMMERCIAL PHOTO/ART/GRAPH" },
            { code: "7338", name: "QUICK COPY/REPRO SERVICES" }
        ]
    },
    "TELECOM/UTILITIES": {
        categories: [
            { code: "4812", name: "TELECOMMUNICATION EQUIPMENT" },
            { code: "4814", name: "TELECOMMUNICATION SERVICES" },
            { code: "4899", name: "CABLE, SAT, PAY TV/RADIO SVCS" },
            { code: "4900", name: "UTILITIES/ELEC/GAS/H2O/SANI" }
        ]
    },
    "TRANSPORTATION": {
        categories: [
            { code: "4582", name: "AIRPORTS/FIELDS/TERMINALS" },
            { code: "4789", name: "TRANSPORTATION SVCS - DEFAULT" }
        ]
    },
    "TRAVEL SERVICES": {
        categories: [
            { code: "4722", name: "TRAVEL AGENCIES" }
        ]
    },
    "VEHICLE RENTAL": {
        categories: [
            { code: "3355", name: "SIXT CAR RENTAL" },
            { code: "7512", name: "AUTOMOBILE RENTAL AGENCY" },
            { code: "7519", name: "MOTOR HOME/RV RENTALS" }
        ]
    }
};
    // Define the 'segments' object (you can add more segments later)
    

    // Function to show Visa Section and hide others
    function showVisaSection() {
        dashboardContainer.style.display = "none";  // Hide dashboard
        visaSection.style.display = "block";        // Show Visa analysis section
        backButton.style.display = "block";         // Show back button
        mmgOptions.style.display = "none";          // Hide MMG options
    }

    // Function to show MMG Section and hide others
    function showMmgOptions() {
        dashboardContainer.style.display = "none";  // Hide dashboard
        mmgOptions.style.display = "block";         // Show MMG options
        backButton.style.display = "block";         // Show back button
        visaSection.style.display = "none";         // Hide Visa analysis section
    }

    // Back button functionality to return to the dashboard
    backButton.addEventListener("click", () => {
        visaSection.style.display = "none";         // Hide Visa analysis section
        mmgOptions.style.display = "none";          // Hide MMG options
        visaPlotContainer.innerHTML = "";           // Clear plot container
        dashboardContainer.style.display = "block"; // Show dashboard
        backButton.style.display = "none";          // Hide back button
    });

    // Show Visa Merchants Data when Visa button is clicked
    document.getElementById("visaMerchants").addEventListener("click", showVisaSection);

    // Show MMG Merchants Data when MMG button is clicked
    document.getElementById("mmgMerchants").addEventListener("click", showMmgOptions);
});

    // Visa Data Functions
document.addEventListener("DOMContentLoaded", function() {
    const searchBoxSegment = document.getElementById("searchBoxSegment");
    const segmentList = document.getElementById("segmentList");
    const searchBoxCategory = document.getElementById("searchBoxCategory");
    const categoryList = document.getElementById("categoryList");

    // Function to show Visa Merchants Data when search box is focused
    searchBoxSegment.addEventListener("focus", () => {
        segmentList.style.display = "block";
        filterSegments("");  // Show all segments initially
    });

    // Filter segments when input changes
    searchBoxSegment.addEventListener("input", () => {
        const searchTerm = searchBoxSegment.value.toLowerCase();
        filterSegments(searchTerm);  // Filter based on search term
    });

    // Function to filter segments and display them in the list
    function filterSegments(searchTerm) {
        segmentList.innerHTML = "";  // Clear the current list
        const filteredSegments = Object.keys(segments).filter(segment => 
            segment.toLowerCase().includes(searchTerm)
        );
        if (filteredSegments.length > 0) {
            filteredSegments.forEach(segment => {
                const listItem = document.createElement("li");
                listItem.textContent = segment;
                listItem.addEventListener("click", () => {
                    displayCategories(segment);
                    segmentList.style.display = "none";  // Hide the segment list after selection
                    searchBoxSegment.value = segment;    // Set the search box value to the selected segment
                });
                segmentList.appendChild(listItem);
            });
        } else {
            segmentList.innerHTML = `<li>No segments found</li>`;
        }
        segmentList.style.display = "block";  // Ensure the list is visible
    }

    // Function to display categories for the selected segment
    function displayCategories(segment) {
        searchBoxCategory.style.display = "block";  // Show category input box
        categoryList.style.display = "block";       // Show the category list
        searchBoxCategory.value = "";               // Clear the category search box
        filterCategories(segment, "");              // Show all categories for the selected segment

        searchBoxCategory.addEventListener("input", () => {
            const searchTerm = searchBoxCategory.value.toLowerCase();
            filterCategories(segment, searchTerm);  // Filter categories based on input
        });
    }

    // Function to filter categories and display them in the list
    function filterCategories(segment, searchTerm) {
        categoryList.innerHTML = "";  // Clear current list
        const filteredCategories = segments[segment].categories.filter(category =>
            category.code.toLowerCase().includes(searchTerm) || 
            category.name.toLowerCase().includes(searchTerm)
        );
        if (filteredCategories.length > 0) {
            filteredCategories.forEach(category => {
                const listItem = document.createElement("li");
                listItem.textContent = `${category.code} (${category.name})`;
                listItem.addEventListener("click", () => {
                    searchBoxCategory.value = category.name;  // Set the search box to the selected category
                    categoryList.style.display = "none";  // Hide the category list after selection
                });
                categoryList.appendChild(listItem);
            });
        } else {
            categoryList.innerHTML = `<li>No categories found</li>`;
        }
        categoryList.style.display = "block";  // Ensure the list is visible
    }

    // Hide the lists if clicked outside the search box
    document.addEventListener("click", (event) => {
        if (!searchBoxSegment.contains(event.target) && !segmentList.contains(event.target)) {
            segmentList.style.display = "none";
        }
        if (!searchBoxCategory.contains(event.target) && !categoryList.contains(event.target)) {
            categoryList.style.display = "none";
        }
    });

    // Prevent the list from hiding when clicking inside the search box
    searchBoxSegment.addEventListener("click", (event) => {
        event.stopPropagation();
    });

    searchBoxCategory.addEventListener("click", (event) => {
        event.stopPropagation();
    });
});
// MMG Merchants Data - Show map or plot view
document.addEventListener("DOMContentLoaded", function() {
    const visaPlotContainer = document.getElementById("plotContainer");

    // MMG Map View
    document.getElementById("mmgMapView").addEventListener("click", () => {
        visaPlotContainer.innerHTML = `
            <h2>MMG Merchants Data - Map View</h2>
            <div class="plot-image">
                <img src="mmg_map.png" alt="MMG Map Data">
            </div>
        `;
    });

    // MMG Plot View
    document.getElementById("mmgPlotView").addEventListener("click", () => {
        visaPlotContainer.innerHTML = `
            <h2>MMG Merchants Data - State and City Views</h2>
            <div class="plot-image">
                <img src="mmg_state_data.png" alt="MMG State Data">
            </div>
            <div class="plot-image">
                <img src="mmg_city_data.png" alt="MMG City Data">
            </div>
        `;
    });
});


    
