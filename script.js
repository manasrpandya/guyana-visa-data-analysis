document.addEventListener("DOMContentLoaded", function() {
    // Data structure for segments, categories, and merchant codes
    const segments = {
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
        "EDUCATION": {
            categories: [
                { code: "8211", name: "ELEMENTARY/SECONDARY SCHOOLS" },
                { code: "8220", name: "COLLEGES/UNIVERSITIES" },
                { code: "8241", name: "CORRESPONDENCE SCHOOLS" },
                { code: "8249", name: "VOCATIONAL/TRD SCHOOLS" },
                { code: "8299", name: "SCHOOLS/EDUCATION SVC - DEF" }
            ]
        },
        "ENTERTAINMENT & LEISURE": {
            categories: [
                { code: "7832", name: "MOTION PICTURE THEATRES" },
                { code: "7911", name: "DANCE HALL/STUDIOS/SCHOOLS" },
                { code: "7922", name: "THEATRICAL PRODUCERS" },
                { code: "7929", name: "ENTERTAINMENT VENUES - DEF" }
            ]
        },
        "FOOD & BEVERAGE": {
            categories: [
                { code: "5812", name: "EATING PLACES AND RESTAURANTS" },
                { code: "5813", name: "BARS/TAVERNS/LOUNGES/DISCOS" }
            ]
        },
        "HEALTH CARE": {
            categories: [
                { code: "742", name: "VETERINARY SERVICES" },
                { code: "8011", name: "DOCTORS" },
                { code: "8021", name: "DENTISTS" },
                { code: "8031", name: "OSTEOPATHIC PHYSICIANS" },
                { code: "8041", name: "CHIROPRACTORS" },
                { code: "8042", name: "OPTOMETRISTS" },
                { code: "8043", name: "OPTICIANS" },
                { code: "8049", name: "OTHER MEDICAL SPECIALISTS" },
                { code: "8099", name: "HEALTH PRACTITIONERS" },
                { code: "8062", name: "HOSPITALS" }
            ]
        },
        "HOME IMPROVEMENT & SUPPLY": {
            categories: [
                { code: "1520", name: "GEN CONTRACTORS RESIDENTL/COML" },
                { code: "1731", name: "ELECTRICAL CONTRACTORS" },
                { code: "1799", name: "SPECIAL TRADE CONTRACTORS" },
                { code: "5211", name: "LUMBER/BUILDING MATERIALS" },
                { code: "5231", name: "GLASS/PAINT/WALLPAPER STORES" },
                { code: "5251", name: "HARDWARE STORES" },
                { code: "5261", name: "LAWN/GARDEN SUPPLY/NURSERY" },
                { code: "5712", name: "FURNITURE/HOME FURNISHINGS" },
                { code: "5713", name: "FLOOR COVERING STORES" },
                { code: "5719", name: "MISC HOME FURNISHING SPECIALTY" }
            ]
        },
        "INSURANCE": {
            categories: [
                { code: "5960", name: "DIRECT MARKETING INSURANCE" },
                { code: "6300", name: "INSURANCE SALES/UNDERWRITE" }
            ]
        },
        "PERSONAL SERVICES": {
            categories: [
                { code: "7230", name: "BEAUTY/BARBER SHOPS" },
                { code: "7261", name: "FUNERAL SERVICE/CREMATORIES" },
                { code: "7299", name: "MISC PERSONAL SERVICES" }
            ]
        },
        "REAL ESTATE": {
            categories: [
                { code: "6513", name: "REAL ESTATE AGENTS/RENTALS" },
                { code: "6536", name: "TIMESHARES" }
            ]
        },
        "RETAIL GOODS": {
            categories: [
                { code: "4468", name: "MARINAS, SERVICE & SUPPLY" },
                { code: "5094", name: "PRECIOUS STONES/METALS/JEWELRY" },
                { code: "5309", name: "DUTY FREE STORES" },
                { code: "5941", name: "SPORTING GOODS STORES" },
                { code: "5943", name: "STATIONERY STORES" },
                { code: "5944", name: "JEWELRY STORES" },
                { code: "5945", name: "HOBBY, TOY & GAME STORES" },
                { code: "5947", name: "GIFT, CARD, NOVELTY STORES" },
                { code: "5970", name: "ARTIST/CRAFT SHOPS" },
                { code: "5977", name: "COSMETIC STORES" },
                { code: "5992", name: "FLORISTS" }
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
    const searchBoxSegment = document.getElementById("searchBoxSegment");
    const segmentList = document.getElementById("segmentList");
    const searchBoxCategory = document.getElementById("searchBoxCategory");
    const categoryList = document.getElementById("categoryList");
    const plotContainer = document.getElementById("plotContainer");

    // Show all segments when the search box is focused
    searchBoxSegment.addEventListener("focus", () => {
        segmentList.style.display = "block";
        filterSegments(""); // Show all segments
    });

    // Filter the segment list based on search input
    searchBoxSegment.addEventListener("input", () => {
        const searchTerm = searchBoxSegment.value.toLowerCase();
        filterSegments(searchTerm);
    });

    // Show all categories when the search box is focused
    searchBoxCategory.addEventListener("focus", () => {
        categoryList.style.display = "block";
    });

    // Hide the segment or category list if clicked outside
    document.addEventListener("click", (event) => {
        if (!searchBoxSegment.contains(event.target) && !segmentList.contains(event.target)) {
            segmentList.style.display = "none";
        }
        if (!searchBoxCategory.contains(event.target) && !categoryList.contains(event.target)) {
            categoryList.style.display = "none";
        }
    });

    // Stop propagation of clicks inside the search boxes or lists
    searchBoxSegment.addEventListener("click", (event) => {
        event.stopPropagation();
    });

    searchBoxCategory.addEventListener("click", (event) => {
        event.stopPropagation();
    });

    segmentList.addEventListener("click", (event) => {
        event.stopPropagation();
    });

    categoryList.addEventListener("click", (event) => {
        event.stopPropagation();
    });

    // Populate the segment list based on the search term
    function filterSegments(searchTerm) {
        segmentList.innerHTML = ""; // Clear current list
        const filteredSegments = Object.keys(segments).filter(segment =>
            segment.toLowerCase().includes(searchTerm)
        );
        if (filteredSegments.length > 0) {
            filteredSegments.forEach(segment => {
                const listItem = document.createElement("li");
                listItem.textContent = segment;
                listItem.addEventListener("click", () => {
                    displayCategories(segment);
                    segmentList.style.display = "none"; // Hide list after selection
                    searchBoxSegment.value = segment; // Set search box to selected segment
                });
                segmentList.appendChild(listItem);
            });
        } else {
            segmentList.innerHTML = `<li>No segments found</li>`;
        }
        segmentList.style.display = "block"; // Ensure the list is visible
    }

    // Display categories for the selected segment
    function displayCategories(segment) {
        searchBoxCategory.style.display = "block";
        categoryList.style.display = "block";
        searchBoxCategory.value = ""; // Clear the category search box
        filterCategories(segment, ""); // Show all categories in the segment

        searchBoxCategory.addEventListener("input", () => {
            const searchTerm = searchBoxCategory.value.toLowerCase();
            filterCategories(segment, searchTerm);
        });
    }

    // Populate the category list based on the search term
    function filterCategories(segment, searchTerm) {
        categoryList.innerHTML = ""; // Clear current list
        const filteredCategories = segments[segment].categories.filter(category =>
            category.code.toLowerCase().includes(searchTerm) || 
            category.name.toLowerCase().includes(searchTerm)
        );
        if (filteredCategories.length > 0) {
            const overallListItem = document.createElement("li");
            overallListItem.textContent = `OVERALL ${segment}`;
            overallListItem.addEventListener("click", () => {
                displaySegmentOptions(segment);
                categoryList.style.display = "none";
                searchBoxCategory.value = `OVERALL ${segment}`;
            });
            categoryList.appendChild(overallListItem);

            filteredCategories.forEach(category => {
                const listItem = document.createElement("li");
                listItem.textContent = `${category.code} (${category.name})`;
                listItem.addEventListener("click", () => {
                    displayCategoryOptions(segment, category.code);
                    categoryList.style.display = "none";
                    searchBoxCategory.value = category.name;
                });
                categoryList.appendChild(listItem);
            });
        } else {
            categoryList.innerHTML = `<li>No categories found</li>`;
        }
        categoryList.style.display = "block"; // Ensure the list is visible
    }

    function displaySegmentOptions(segment) {
        let plotHtml = `<h2>Overall Segment: ${segment}</h2>`;
        plotHtml += `
            <button onclick="displaySegmentDetail('${segment}', 'print')">Yearly Data (Overall)</button>
            <button onclick="displaySegmentDetail('${segment}', 'plot_transaction_count')">Monthly Data - Transaction Count</button>
            <button onclick="displaySegmentDetail('${segment}', 'plot_transaction_amount')">Monthly Data - Transaction Amount</button>
            <button onclick="displaySegmentDetail('${segment}', 'plot_ticket_size')">Monthly Data - Ticket Size</button>
            <button onclick="displaySegmentDetail('${segment}', 'plot_merchant_activity')">Monthly Data - Merchant Activity</button>
            <button onclick="displaySegmentDetail('${segment}', 'plot_heatmap')">Monthly Data - Heatmap</button>
        `;
        plotContainer.innerHTML = plotHtml;
    }

    window.displaySegmentDetail = function(segment, type) {
        let plotHtml = `<h2>Overall Segment: ${segment}</h2>`;
        if (type === 'print') {
            plotHtml += `<img src="new_merchant_segment_plots/${segment}_print_statement.png" alt="Yearly Data">`;
        } else {
            plotHtml += `<img src="new_merchant_segment_plots/${segment}_${type}.png" alt="${type.replace('_', ' ')}">`;
        }
        plotContainer.innerHTML = plotHtml + plotContainer.innerHTML;
    }

    function displayCategoryOptions(segment, code) {
        let plotHtml = `<h2>${segment} - ${code}</h2>`;
        plotHtml += `
            <button onclick="displayCategoryDetail('${segment}', '${code}', 'print')">Yearly Data (Overall)</button>
            <button onclick="displayCategoryDetail('${segment}', '${code}', 'transaction_count')">Monthly Data - Transaction Count</button>
            <button onclick="displayCategoryDetail('${segment}', '${code}', 'transaction_amount')">Monthly Data - Transaction Amount</button>
            <button onclick="displayCategoryDetail('${segment}', '${code}', 'average_ticket_size')">Monthly Data - Average Ticket Size</button>
            <button onclick="displayCategoryDetail('${segment}', '${code}', 'merchant_ticket_size')">Monthly Data - Merchant Ticket Size</button>
            <button onclick="displayCategoryDetail('${segment}', '${code}', 'merchant_counts')">Monthly Data - Merchant Counts</button>
            <button onclick="displayCategoryDetail('${segment}', '${code}', 'heatmap')">Monthly Data - Heatmap</button>
        `;
        plotContainer.innerHTML = plotHtml;
    }

    window.displayCategoryDetail = function(segment, code, type) {
        let plotHtml = `<h2>${segment} - ${code}</h2>`;
        if (type === 'print') {
            plotHtml += `<img src="new_merchant_category_plots/${code}_print_statement.png" alt="Yearly Data">`;
        } else {
            plotHtml += `<img src="new_merchant_category_plots/${code}_${type}.png" alt="${type.replace('_', ' ')}">`;
        }
        plotContainer.innerHTML = plotHtml + plotContainer.innerHTML;
    }
});


