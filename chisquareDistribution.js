// Function to calculate the Chi-Square distribution's value for a given x and k (degrees of freedom)
function chisquareDistribution(x, k) {
    if (x <= 0) {
        return 0;
    }
    const gamma = n => (n === 1 || n === 0) ? 1 : (n - 1) * gamma(n - 1);
    return (1 / (Math.pow(2, k / 2) * gamma(k / 2))) * Math.pow(x, k / 2 - 1) * Math.exp(-x / 2);
}

// Function to update the Chi-Square Distribution plot and calculation details
function updateChisquarePlot(k) {
    const xValues = [];
    const yValues = [];

    // Generate data points for the plot (x between 0 and 20)
    for (let x = 0; x <= 20; x += 0.1) {
        xValues.push(x);
        yValues.push(chisquareDistribution(x, k));
    }

    // Plot the data using Plotly.js
    const trace = {
        x: xValues,
        y: yValues,
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: 'blue' }
    };

    const layout = {
        title: 'Chi-Square Distribution',
        xaxis: { title: 'X (Range: 0 to 20)', range: [0, 20] },
        yaxis: { title: 'Probability Density' }
    };

    Plotly.newPlot('chisquarePlot', [trace], layout);

    // Update the calculation details section
    const calculationDetails = `
        <p><strong>Chi-Square Distribution Formula:</strong></p>
        <p>f(x; k) = (1 / (2^(k/2) * Γ(k/2))) * x^(k/2-1) * exp(-x/2)</p>
        <p>Current Value of Degrees of Freedom (k): ${k}</p>
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
            const k = Math.round(data.reduce((a, b) => a + b, 0) / data.length); // Use average of uploaded values for k

            // Update the slider to reflect the calculated k
            document.getElementById('dfSlider').value = k;
            document.getElementById('dfValue').innerText = k;

            // Update the plot and calculation details with the calculated k
            updateChisquarePlot(k);

            // Show alert message for data upload
            showAlert('Data uploaded. Using calculated degrees of freedom.');
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
    alertMessage.style.backgroundColor = '#1f77b4';
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

// Event listener for slider input
document.getElementById('dfSlider').addEventListener('input', function() {
    const k = parseInt(this.value);
    document.getElementById('dfValue').innerText = k;
    updateChisquarePlot(k);
});

// Event listener for file input
document.getElementById('fileInput').addEventListener('change', handleFileUpload);

// Initialize plot with default values
window.onload = function() {
    updateChisquarePlot(2); // Default degrees of freedom k = 2
};
