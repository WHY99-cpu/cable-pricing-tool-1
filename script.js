// =============================
// GLOBAL PRICING DATA
// =============================
let pricingData = [];


// =============================
// LOAD CSV FILE
// =============================
function loadCSV() {

    fetch("pricing.csv")
        .then(response => response.text())
        .then(data => {

            let rows = data.split("\n");

            rows.slice(1).forEach(row => {

                let cols = row.split(",");

                if (cols.length >= 4) {
                    pricingData.push({
                        type: cols[0].trim(),
                        name: cols[1].trim(),
                        category: cols[2].trim(),
                        price: parseFloat(cols[3])
                    });
                }

            });
        });
}


// =============================
// GET PRICE FROM CSV
// =============================
function getPrice(type, name) {

    let item = pricingData.find(p =>
        p.type === type && p.name === name
    );

    return item ? item.price : 0;
}


// =============================
// UPDATE CABLE OPTIONS (FILTER)
// =============================
function updateCableOptions() {

    let twistType = document.getElementById("twistType").value;
    let cableSelect = document.getElementById("cableType");

    cableSelect.innerHTML = "";

    let cables = pricingData.filter(p =>
        p.type === "cable" && p.category === twistType
    );

    cables.forEach(c => {
        let option = document.createElement("option");
        option.value = c.name;
        option.text = c.name;
        cableSelect.appendChild(option);
    });

}


// =============================
// LENGTH ADDER LOGIC (FROM YOUR MATRIX)
// =============================
function getLengthAdder(length) {

    let adder = 0;

    if (length >= 5000) adder += 0.05505;
    if (length >= 6000) adder += 0.01101;
    if (length >= 7000) adder += 0.01101;
    if (length >= 8000) adder += 0.09909;
    if (length >= 9000) adder += 0.02202;

    return adder;
}


// =============================
// MAIN CALCULATION
// =============================
function calculate() {

    let cable = document.getElementById("cableType").value;
    let length = parseFloat(document.getElementById("length").value);
    let connA = document.getElementById("connA").value;
    let connB = document.getElementById("connB").value;
    let terminal = document.getElementById("terminal").value;
    let qty = parseInt(document.getElementById("qty").value);

    // ===== CABLE COST =====
    let cableCost = getPrice("cable", cable) * (length / 1000);

    // ===== CONNECTORS =====
    let connectorCost =
        getPrice("connector", connA) +
        getPrice("connector", connB);

    // ===== TERMINAL =====
    let terminalCost = getPrice("terminal", terminal);

    // ===== LENGTH ADDER =====
    let lengthAdder = getLengthAdder(length);

    // ===== TOTAL =====
    let unitPrice =
        cableCost +
        connectorCost +
        terminalCost +
        lengthAdder;

    let totalPrice = unitPrice * qty;

    // ===== OUTPUT =====
    document.getElementById("result").innerText =
        "Unit Price: $" + unitPrice.toFixed(4) +
        "\nCable: $" + cableCost.toFixed(4) +
        " | Connector: $" + connectorCost.toFixed(4) +
        " | Terminal: $" + terminalCost.toFixed(4) +
        " | Length Adder: $" + lengthAdder.toFixed(4) +
        "\nQty: " + qty +
        "\nTOTAL: $" + totalPrice.toFixed(2);
}


// =============================
// INITIAL LOAD
// =============================
window.onload = function () {
    loadCSV();

    // Delay to ensure CSV loaded before filtering
    setTimeout(() => {
        updateCableOptions();
    }, 300);
};
