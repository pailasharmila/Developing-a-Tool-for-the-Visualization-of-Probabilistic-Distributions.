// Function to calculate the Exponential distribution value for a given x and lambda
function exponentialDistribution(x, lambda) {
    if (x < 0) return 0; // Exponential distribution is defined for x ≥ 0
    return lambda * Math.exp(-lambda * x);
}

// Function to update the Exponential Distribution plot and calculation details
function updateExponentialPlot(lambda) {
    const xValues = [];
    const yValues = [];

    // Generate data points for the plot (x = 0 to 20)
    for (let x = 0; x <= 20; x += 0.1) {
        xValues.push(x);
        yValues.push(exponentialDistribution(x, lambda));
    }

    // Plot the data using Plotly.js
    const trace = {
        x: xValues,
        y: yValues,
        type: 'scatter',
        mode: 'lines',
        line: { color: 'green', width: 3 }
    };

    const layout = {
        title: 'Exponential Distribution',
        xaxis: { title: 'X', range: [0, 20] },
        yaxis: { title: 'Probability Density' }
    };

    Plotly.newPlot('exponentialPlot', [trace], layout);

    // Update the calculation details section
    const calculationDetails = `
        <p><strong>Exponential Distribution Formula:</strong></p>
        <p>f(x) = λ * exp(-λx) for x ≥ 0</p>
        <p>Current Values:</p>
        <p>λ (Rate Parameter) = ${lambda.toFixed(2)}</p>
        <p>For x = 0, the value of f(x) = ${exponentialDistribution(0, lambda).toFixed(6)}</p>
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
            const lambda = calculateRateParameter(data);

            // Update the slider to reflect the calculated lambda
            document.getElementById('rateSlider').value = lambda.toFixed(1);
            document.getElementById('rateValue').innerText = lambda.toFixed(1);

            // Update the plot and calculation details with the calculated rate parameter
            updateExponentialPlot(lambda);

            // Show alert message for data upload
            showAlert('Data uploaded. Using calculated rate parameter.');
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

// Function to calculate the rate parameter (λ)
function calculateRateParameter(data) {
    const mean = calculateMean(data);
    return 1 / mean; // λ is the inverse of the mean for Exponential Distribution
}

// Function to calculate mean
function calculateMean(data) {
    const sum = data.reduce((acc, val) => acc + val, 0);
    return sum / data.length;
}

// Event listeners for sliders
document.getElementById('rateSlider').addEventListener('input', function() {
    const lambda = parseFloat(this.value);
    document.getElementById('rateValue').innerText = lambda.toFixed(1);
    updateExponentialPlot(lambda);
});

// Event listener for file input
document.getElementById('fileInput').addEventListener('change', handleFileUpload);

// Initialize plot with default value
window.onload = function() {
    updateExponentialPlot(1); // Default rate parameter λ = 1
};
