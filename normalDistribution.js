// Function to calculate the normal distribution value for a given x, mean, and stdDev
function normalDistribution(x, mean, stdDev) {
    const coefficient = 1 / (stdDev * Math.sqrt(2 * Math.PI));
    const exponent = -Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2));
    return coefficient * Math.exp(exponent);
}

// Function to update the Normal Distribution plot and calculation details
function updateNormalPlot(mean, stdDev) {
    const xValues = [];
    const yValues = [];

    // Generate data points for the plot
    for (let x = mean - 4 * stdDev; x <= mean + 4 * stdDev; x += 0.1) {
        xValues.push(x);
        yValues.push(normalDistribution(x, mean, stdDev));
    }

    // Plot the data using Plotly.js
    const trace = {
        x: xValues,
        y: yValues,
        type: 'scatter',
        mode: 'lines',
        line: { color: '#4a90e2', width: 3 }
    };

    const layout = {
        title: 'Normal Distribution',
        xaxis: { title: 'X', range: [mean - 4 * stdDev, mean + 4 * stdDev] },
        yaxis: { title: 'Probability Density' }
    };

    Plotly.newPlot('normalPlot', [trace], layout);

    // Update the calculation details section
    const calculationDetails = `
        <p><strong>Normal Distribution Formula:</strong></p>
        <p>f(x) = (1 / (σ√2π)) e^(-(x - μ)² / 2σ²)</p>
        <p>Current Values:</p>
        <p>μ (Mean) = ${mean.toFixed(2)}, σ (Standard Deviation) = ${stdDev.toFixed(2)}</p>
        <p>For x = ${mean.toFixed(2)}, the value of f(x) = ${normalDistribution(mean, mean, stdDev).toFixed(6)}</p>
    `;
    document.getElementById('calculationDetails').innerHTML = calculationDetails;
}

// Function to handle file upload
function handleFileUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const data = e.target.result.split(/\r?\n/).map(Number).filter(val => !isNaN(val)); // Parse numbers from file
        if (data.length > 0) {
            const mean = calculateMean(data);
            const stdDev = calculateStandardDeviation(data, mean);

            // Update the sliders to reflect the calculated values
            document.getElementById('meanSlider').value = mean.toFixed(1);
            document.getElementById('stdSlider').value = stdDev.toFixed(1);
            document.getElementById('meanValue').innerText = mean.toFixed(1);
            document.getElementById('stdValue').innerText = stdDev.toFixed(1);

            // Update the plot and calculation details with the calculated mean and standard deviation
            updateNormalPlot(mean, stdDev);

            // Show alert message for data upload
            showAlert('Data uploaded. Using calculated mean and standard deviation.');
        }
    };

    reader.readAsText(file);
}

// Function to show an alert message
function showAlert(message) {
    const alertMessage = document.createElement('div');
    alertMessage.innerText = message;
    alertMessage.style.position = 'fixed';
    alertMessage.style.top = '50%';
    alertMessage.style.left = '50%';
    alertMessage.style.transform = 'translate(-50%, -50%)';
    alertMessage.style.backgroundColor = '#4a90e2';
    alertMessage.style.color = '#fff';
    alertMessage.style.padding = '15px 30px';
    alertMessage.style.fontSize = '1.2em';
    alertMessage.style.borderRadius = '5px';
    alertMessage.style.zIndex = '9999';
    document.body.appendChild(alertMessage);

    // Hide the alert after 3 seconds
    setTimeout(() => {
        alertMessage.remove();
    }, 3000);
}

// Function to calculate mean
function calculateMean(data) {
    const sum = data.reduce((acc, val) => acc + val, 0);
    return sum / data.length;
}

// Function to calculate standard deviation
function calculateStandardDeviation(data, mean) {
    const variance = data.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / data.length;
    return Math.sqrt(variance);
}

// Event listeners for sliders
document.getElementById('meanSlider').addEventListener('input', function() {
    const mean = parseFloat(this.value);
    const stdDev = parseFloat(document.getElementById('stdSlider').value);
    document.getElementById('meanValue').innerText = mean.toFixed(1);
    updateNormalPlot(mean, stdDev);
});

document.getElementById('stdSlider').addEventListener('input', function() {
    const stdDev = parseFloat(this.value);
    const mean = parseFloat(document.getElementById('meanSlider').value);
    document.getElementById('stdValue').innerText = stdDev.toFixed(1);
    updateNormalPlot(mean, stdDev);
});

// Event listener for file input
document.getElementById('fileInput').addEventListener('change', handleFileUpload);

// Initialize plot with default values
window.onload = function() {
    updateNormalPlot(5, 1);
};
