document.addEventListener("DOMContentLoaded", function() {
    const merchants = [
        { code: "1", name: "ALL AIRLINES" },
        { code: "2", name: "LODGING" },
        { code: "3", name: "AUTO RENTAL" },
        { code: "742", name: "VETERINARY SERVICES" },
        { code: "1520", name: "GEN CONTRACTORS RESIDENTL/COML" },
        { code: "4111", name: "LOCAL COMMUTER TRANSPORT" },
        { code: "4214", name: "MOTOR FREIGHT CARRIERS" },
        { code: "4215", name: "COURIER SERVICES" },
        { code: "4468", name: "MARINAS, SERVICE & SUPPLY" },
        { code: "4582", name: "AIRPORTS/FIELDS/TERMINALS" },
        { code: "4722", name: "TRAVEL AGENCIES" },
        { code: "4789", name: "TRANSPORTATION SVCS - DEFAULT" },
        { code: "4812", name: "TELECOMMUNICATION EQUIPMENT" },
        { code: "4814", name: "TELECOMMUNICATION SERVICES" },
        { code: "4816", name: "COMPUTER NETWORK/INFO SVCS" },
        { code: "4899", name: "CABLE, SAT, PAY TV/RADIO SVCS" },
        { code: "4900", name: "UTILITIES/ELEC/GAS/H2O/SANI" },
        { code: "5013", name: "MOTOR VEHICLE SUPPLY/NEW PARTS" },
        { code: "5039", name: "CONSTRUCTION MATERIALS - DEF" },
        { code: "5045", name: "COMPUTERS/PERIPHERALS/SOFTWARE" },
        { code: "5046", name: "COMMERCIAL EQUIPMENT - DEFAULT" },
        { code: "5065", name: "ELECTRICAL PARTS/EQUIPMENT" },
        { code: "5072", name: "HARDWARE EQUIPMENT/SUPPLIES" },
        { code: "5085", name: "INDUSTRIAL SUPPLIES - DEF" },
        { code: "5094", name: "PRECIOUS STONES/METALS/JEWELRY" },
        { code: "5111", name: "STATIONERY/OFFICE SUPPLIES" },
        { code: "5122", name: "DRUGS/DRUGGISTS SUNDRIES" },
        { code: "5137", name: "UNIFORMS & COMMERCIAL CLOTHING" },
        { code: "5139", name: "COMMERCIAL FOOTWEAR" },
        { code: "5169", name: "CHEMICALS/ALLIED PRODS - DEF" },
        { code: "5172", name: "PETROLEUM/PETROLEUM PRODUCTS" },
        { code: "5198", name: "PAINT, VARNISHES & SUPPLIES" },
        { code: "5200", name: "HOME SUPPLY WAREHOUSE STORES" },
        { code: "5211", name: "LUMBER/BUILD. SUPPLY STORES" },
        { code: "5231", name: "GLASS/PAINT/WALLPAPER STORES" },
        { code: "5251", name: "HARDWARE STORES" },
        { code: "5309", name: "DUTY FREE STORES" },
        { code: "5311", name: "DEPARTMENT STORES" },
        { code: "5331", name: "VARIETY STORES" },
        { code: "5399", name: "MISC GENERAL MERCHANDISE" },
        { code: "5411", name: "GROCERY STORES/SUPERMARKETS" },
        { code: "5422", name: "FREEZER/MEAT LOCKERS" },
        { code: "5462", name: "BAKERIES" },
        { code: "5499", name: "MISC FOOD STORES - DEFAULT" },
        { code: "5511", name: "CAR & TRUCK DEALERS/NEW/USED" },
        { code: "5521", name: "CAR & TRUCK DEALERS/USED ONLY" },
        { code: "5533", name: "AUTOMOTIVE PARTS STORES" },
        { code: "5541", name: "SERVICE STATIONS" },
        { code: "5599", name: "MISC AUTO DEALERS - DEFAULT" },
        { code: "5621", name: "WOMENS READY TO WEAR STORES" },
        { code: "5631", name: "WOMENS ACCESS/SPECIALTY" },
        { code: "5641", name: "CHILDREN/INFANTS WEAR STORES" },
        { code: "5651", name: "FAMILY CLOTHING STORES" },
        { code: "5655", name: "SPORTS/RIDING APPAREL STORES" },
        { code: "5661", name: "SHOE STORES" },
        { code: "5691", name: "MENS/WOMENS CLOTHING STORES" },
        { code: "5697", name: "TAILOR/SEAMSTRESS/ALTERS" },
        { code: "5699", name: "MISC APPAREL/ACCESS STORES" },
        { code: "5712", name: "FURNITURE/EQUIP STORES" },
        { code: "5713", name: "FLOOR COVERING STORES" },
        { code: "5714", name: "DRAPERY & UPHOLSTERY STORES" },
        { code: "5719", name: "MISC HOME FURNISHING SPECIALTY" },
        { code: "5722", name: "HOUSEHOLD APPLIANCE STORES" },
        { code: "5732", name: "ELECTRONICS STORES" },
        { code: "5734", name: "COMPUTER SOFTWARE STORES" },
        { code: "5812", name: "EATING PLACES AND RESTAURANTS" },
        { code: "5813", name: "BARS/TAVERNS/LOUNGES/DISCOS" },
        { code: "5814", name: "FAST FOOD RESTAURANTS" },
        { code: "5912", name: "DRUG STORES & PHARMACIES" },
        { code: "5921", name: "PKG STORES/BEER/WINE/LIQUOR" },
        { code: "5941", name: "SPORTING GOODS STORES" },
        { code: "5942", name: "BOOK STORES" },
        { code: "5943", name: "STATIONERY STORES" },
        { code: "5944", name: "JEWELRY STORES" },
        { code: "5945", name: "HOBBY, TOY & GAME STORES" },
        { code: "5947", name: "GIFT, CARD, NOVELTY STORES" },
        { code: "5965", name: "COMBINATION CATALOG & RETAIL" },
        { code: "5970", name: "ARTIST/CRAFT SHOPS" },
        { code: "5977", name: "COSMETIC STORES" },
        { code: "5983", name: "FUEL DEALERS" },
        { code: "5992", name: "FLORISTS" },
        { code: "5999", name: "MISC SPECIALTY RETAIL" },
        { code: "6300", name: "INSURANCE SALES/UNDERWRITE" },
        { code: "6513", name: "REAL EST AGNTS & MGRS RENTALS" },
        { code: "7032", name: "SPORTING/RECREATIONAL CAMPS" },
        { code: "7211", name: "LAUNDRIES-FAMILY/COMMERCIAL" },
        { code: "7217", name: "CARPET/UPHOLSTERY CLEANING" },
        { code: "7230", name: "BEAUTY/BARBER SHOPS" },
        { code: "7261", name: "FUNERAL SERVICE/CREMATORIES" },
        { code: "7298", name: "HEALTH & BEAUTY SPAS" },
        { code: "7311", name: "ADVERTISING SERVICES" },
        { code: "7333", name: "COMMERCIAL PHOTO/ART/GRAPH" },
        { code: "7338", name: "QUICK COPY/REPRO SERVICES" },
        { code: "7349", name: "CLEAN/MAINT/JANITORIAL SERV" },
        { code: "7379", name: "COMPUTER MAINT/SVCS - DEF" },
        { code: "7392", name: "MGMT/CONSULT/PUBLIC REL SER" },
        { code: "7393", name: "DETECTIVE/PROTECTIVE AGEN" },
        { code: "7394", name: "EQUIP/FURN RENT/LEASE SERV" },
        { code: "7399", name: "BUSINESS SERVICES - DEFAULT" },
        { code: "7538", name: "AUTO SERVICE SHOPS/NON DEALER" },
        { code: "7623", name: "AIR COND/REFRIG REPAIR SHOP" },
        { code: "7629", name: "SMALL APPLIANCE REPAIR DEF" },
        { code: "7832", name: "MOTION PICTURE THEATRES" },
        { code: "7941", name: "COMMERCIAL/PRO SPORTS" },
        { code: "7991", name: "TOURIST ATTRACTIONS AND XHBT" },
        { code: "7995", name: "BETTING/TRACK/CASINO/LOTTO" },
        { code: "8021", name: "DENTISTS/ORTHODONTISTS" },
        { code: "8043", name: "OPTICIANS" },
        { code: "8062", name: "HOSPITALS" },
        { code: "8071", name: "MEDICAL/DENTAL LABS" },
        { code: "8099", name: "MED/HEALTH SERVICES - DEF" },
        { code: "8211", name: "ELEMENTARY/SECONDARY SCHOOLS" },
        { code: "8220", name: "COLLEGES/UNIV/JC/PROFESSION" },
        { code: "8244", name: "BUSINESS/SECRETARIAL SCHOOL" },
        { code: "8299", name: "SCHOOLS - DEFAULT" },
        { code: "8641", name: "CIVIC/SOCIAL/FRATERNAL ASSC" },
        { code: "8911", name: "ARCHITECTURAL/ENG/SURVEY" },
        { code: "8999", name: "PROFESSIONAL SERVICES - DEF" },
        { code: "9311", name: "TAX PAYMENTS" },
        { code: "9399", name: "GOV'T SERV - DEFAULT" }
    ];
    const merchantList = document.getElementById("merchantList");
    const plotContainer = document.getElementById("plotContainer");
    const modal = document.getElementById("myModal");
    const btn = document.getElementById("openModal");
    const span = document.getElementsByClassName("close")[0];

    merchants.forEach(merchant => {
        const listItem = document.createElement("li");
        listItem.textContent = `${merchant.code} (${merchant.name})`;
        listItem.addEventListener("click", () => {
            displayPlot(merchant.code);
            modal.style.display = "none";
        });
        merchantList.appendChild(listItem);
    });

    function displayPlot(code) {
        plotContainer.innerHTML = `<img src="merchant_plots/${code}.png" alt="Plot for merchant ${code}">`;
    }

    // When the user clicks the button, open the modal
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});

