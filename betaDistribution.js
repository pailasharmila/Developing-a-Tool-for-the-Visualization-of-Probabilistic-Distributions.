// Function to calculate the Beta distribution's value for a given x, alpha, and beta
function betaDistribution(x, alpha, beta) {
    if (x <= 0 || x >= 1) {
        return 0;
    }
    const betaFunction = (a, b) => gamma(a) * gamma(b) / gamma(a + b);
    const gamma = n => (n === 1 || n === 0) ? 1 : (n - 1) * gamma(n - 1);
    return Math.pow(x, alpha - 1) * Math.pow(1 - x, beta - 1) / betaFunction(alpha, beta);
}

// Function to update the Beta Distribution plot and calculation details
function updateBetaPlot(alpha, beta) {
    const xValues = [];
    const yValues = [];

    // Generate data points for the plot (x between 0 and 1)
    for (let x = 0; x <= 1; x += 0.01) {
        xValues.push(x);
        yValues.push(betaDistribution(x, alpha, beta));
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
        title: 'Beta Distribution',
        xaxis: { title: 'X (Range: 0 to 1)', range: [0, 1] },
        yaxis: { title: 'Probability Density' }
    };

    Plotly.newPlot('betaPlot', [trace], layout);

    // Update the calculation details section
    const calculationDetails = `
        <p><strong>Beta Distribution Formula:</strong></p>
        <p>f(x; α, β) = x^(α-1) * (1-x)^(β-1) / B(α, β)</p>
        <p>Current Values:</p>
        <p>α (Alpha) = ${alpha.toFixed(2)}, β (Beta) = ${beta.toFixed(2)}</p>
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
            const alpha = Math.max(...data); // Use max value for alpha
            const beta = Math.min(...data);  // Use min value for beta

            // Update the sliders to reflect the calculated alpha and beta
            document.getElementById('alphaSlider').value = alpha.toFixed(1);
            document.getElementById('betaSlider').value = beta.toFixed(1);
            document.getElementById('alphaValue').innerText = alpha.toFixed(1);
            document.getElementById('betaValue').innerText = beta.toFixed(1);

            // Update the plot and calculation details with the calculated alpha and beta
            updateBetaPlot(alpha, beta);

            // Show alert message for data upload
            showAlert('Data uploaded. Using calculated alpha and beta.');
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
    alertMessage.style.backgroundColor = '#ff7f0e';
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

// Event listeners for sliders
document.getElementById('alphaSlider').addEventListener('input', function() {
    const alpha = parseFloat(this.value);
    const beta = parseFloat(document.getElementById('betaSlider').value);
    document.getElementById('alphaValue').innerText = alpha.toFixed(1);
    updateBetaPlot(alpha, beta);
});

document.getElementById('betaSlider').addEventListener('input', function() {
    const beta = parseFloat(this.value);
    const alpha = parseFloat(document.getElementById('alphaSlider').value);
    document.getElementById('betaValue').innerText = beta.toFixed(1);
    updateBetaPlot(alpha, beta);
});

// Event listener for file input
document.getElementById('fileInput').addEventListener('change', handleFileUpload);

// Initialize plot with default values
window.onload = function() {
    updateBetaPlot(2, 5); // Default alpha and beta values
};
