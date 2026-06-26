// ===== UPDATE CABLE OPTIONS (FILTER) =====
function updateCableOptions() {

    let twistType = document.getElementById("twistType").value;
    let cableSelect = document.getElementById("cableType");

    cableSelect.innerHTML = "";

    let cables = {
        twisted: [
            { name: "FLRY-A 2x0.35 M3130", value: "FLRY-A-2x035-M3130-T" },
            { name: "FLRY-A 2x0.5 M3130", value: "FLRY-A-2x05-M3130-T" },
            { name: "FLRY-A 2x0.75 M3130", value: "FLRY-A-2x075-M3130-T" },
            { name: "FLRY-A 2x0.35 M3345", value: "FLRY-A-2x035-M3345-T" },
            { name: "FLRY-A 2x0.5 M3345", value: "FLRY-A-2x05-M3345-T" },
            { name: "FLRY-A 2x0.75 M3345", value: "FLRY-A-2x075-M3345-T" }
        ],
        untwisted: [
            { name: "FLRY-A 2x0.35 M3130", value: "FLRY-A-2x035-M3130-U" },
            { name: "FLRY-A 2x0.5 M3130", value: "FLRY-A-2x05-M3130-U" },
            { name: "FLRY-A 2x0.75 M3130", value: "FLRY-A-2x075-M3130-U" },
            { name: "FLRY-A 2x0.35 M3345", value: "FLRY-A-2x035-M3345-U" },
            { name: "FLRY-A 2x0.5 M3345", value: "FLRY-A-2x05-M3345-U" },
            { name: "FLRY-A 2x0.75 M3345", value: "FLRY-A-2x075-M3345-U" }
        ]
    };

    cables[twistType].forEach(c => {
        let option = document.createElement("option");
        option.value = c.value;
        option.text = c.name;
        cableSelect.appendChild(option);
    });
}


// ===== CALCULATE PRICING =====
function calculate() {

    let cable = document.getElementById("cableType").value;
    let length = parseFloat(document.getElementById("length").value);
    let connA = document.getElementById("connA").value;
    let connB = document.getElementById("connB").value;
    let terminal = document.getElementById("terminal").value;
    let qty = parseInt(document.getElementById("qty").value);

    // ===== CABLE MATRIX ($/meter) =====
    const cableMatrix = {
        "FLRY-A-2x035-M3130-T": 0.17988,
        "FLRY-A-2x05-M3130-T": 0.19488,
        "FLRY-A-2x075-M3130-T": 0.21288,
        "FLRY-A-2x035-M3345-T": 0.19988,
        "FLRY-A-2x05-M3345-T": 0.21488,
        "FLRY-A-2x075-M3345-T": 0.23288,

        "FLRY-A-2x035-M3130-U": 0.15988,
        "FLRY-A-2x05-M3130-U": 0.17488,
        "FLRY-A-2x075-M3130-U": 0.19288,
        "FLRY-A-2x035-M3345-U": 0.17988,
        "FLRY-A-2x05-M3345-U": 0.19488,
        "FLRY-A-2x075-M3345-U": 0.21288
    };

    let cableCost = cableMatrix[cable] * (length / 1000);

    // ===== CONNECTOR =====
    const connectorMatrix = {
        FOL180: 0.54367,
        FPB90: 0.37988,
        FPB180: 0.43988,
        FOL90: 0.42256
    };

    let connectorCost =
        connectorMatrix[connA] +
        connectorMatrix[connB];

    // ===== TERMINAL =====
    const terminalMatrix = {
        "15448539": 0.11750,
        "15448540": 0.11198,
        "35039876": 0.08885
    };

    let terminalCost = terminalMatrix[terminal];

    // ===== LENGTH ADDER =====
    let lengthAdder = 0;

    if (length >= 5000) lengthAdder += 0.05505;
    if (length >= 6000) lengthAdder += 0.01101;
    if (length >= 7000) lengthAdder += 0.01101;
    if (length >= 8000) lengthAdder += 0.09909;
    if (length >= 9000) lengthAdder += 0.02202;

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
        "\nTotal: $" + totalPrice.toFixed(2);
}


// ===== INITIAL LOAD =====
window.onload = function () {
    updateCableOptions();
};