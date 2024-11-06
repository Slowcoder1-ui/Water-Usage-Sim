// Constants for water usage (liters per MW per day)
const WATER_USE_HYDRO = 1200;
const WATER_USE_CSP = 900;
const WATER_USE_PV = 100;
const EVAPORATION_MULTIPLIER = 1.15; // Lake Kivu's environment adjustment

// Function to calculate daily water usage based on energy type
function calculateDailyWaterUsage(energyType, evaporationFactor) {
    let dailyUsage;
    if (energyType === "hydropower") {
        dailyUsage = WATER_USE_HYDRO * evaporationFactor;
    } else if (energyType === "csp") {
        dailyUsage = WATER_USE_CSP * evaporationFactor;
    } else if (energyType === "pv") {
        dailyUsage = WATER_USE_PV * evaporationFactor;
    } else {
        throw new Error("Unknown energy type!");
    }
    return dailyUsage;
}

// Function to simulate water usage over specified days
function simulateWaterUsage(energyType, durationDays) {
    const evaporationFactor = EVAPORATION_MULTIPLIER;
    const waterUsage = [];
    
    for (let day = 1; day <= durationDays; day++) {
        const dailyUsage = calculateDailyWaterUsage(energyType, evaporationFactor);
        waterUsage.push(dailyUsage);
    }
    return waterUsage;
}

// Function to run the simulation and display results
function runSimulation() {
    const energyType = document.getElementById("energyType").value;
    const durationDays = parseInt(document.getElementById("durationDays").value);

    try {
        const waterUsage = simulateWaterUsage(energyType, durationDays);

        // Display results
        let resultHTML = `<h2>Water Usage for ${capitalizeFirstLetter(energyType)} over ${durationDays} days:</h2>`;
        resultHTML += "<ul>";
        for (let day = 1; day <= durationDays; day++) {
            resultHTML += `<li>Day ${day}: ${waterUsage[day - 1].toFixed(2)} liters</li>`;
        }
        resultHTML += "</ul>";
        document.getElementById("results").innerHTML = resultHTML;
    } catch (error) {
        document.getElementById("results").innerHTML = `<p class="error">${error.message}</p>`;
    }
}

// Helper function to capitalize first letter of energy type
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
