// Function to calculate the Poisson distribution value for a given k and lambda
function poissonDistribution(k, lambda) {
    return (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k);
}

// Function to calculate factorial
function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Function to update the Poisson Distribution plot and calculation details
function updatePoissonPlot(lambda) {
    const xValues = [];
    const yValues = [];

    // Generate data points for the plot (k = 0 to 20)
    for (let k = 0; k <= 20; k++) {
        xValues.push(k);
        yValues.push(poissonDistribution(k, lambda));
    }

    const data = [{
        x: xValues,
        y: yValues,
        type: 'bar',
        marker: { color: 'green' }
    }];

    const layout = {
        title: 'Poisson Distribution',
        xaxis: { title: 'k (Number of Events)' },
        yaxis: { title: 'P(X = k)' },
       
    };

    Plotly.newPlot('poissonPlot', data, layout);

    // Update calculation details
    const calculationDetails = `
        <p><strong>Poisson Distribution Formula:</strong></p>
        <p>P(X = k) = (λ^k * e^(-λ)) / k!</p>
        <p>Current Value:</p>
        <p>λ (Lambda) = ${lambda.toFixed(2)}</p>
        <p>For k = 0, the probability is P(X = 0) = ${poissonDistribution(0, lambda).toFixed(6)}</p>
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
            const lambda = calculateMean(data); // Example: using mean as lambda

            // Update the slider to reflect the calculated value
            document.getElementById('lambdaSlider').value = lambda.toFixed(1);
            document.getElementById('lambdaValue').innerText = lambda.toFixed(1);

            // Update the plot and calculation details with the calculated lambda
            updatePoissonPlot(lambda);

            // Show alert message for data upload
            showAlert(`Data uploaded. Using calculated λ = ${lambda.toFixed(2)}.`);
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

// Event listeners for sliders
document.getElementById('lambdaSlider').addEventListener('input', function() {
    const lambda = parseFloat(this.value);
    document.getElementById('lambdaValue').innerText = lambda.toFixed(1);
    updatePoissonPlot(lambda);
});

// Event listener for file input
document.getElementById('fileInput').addEventListener('change', handleFileUpload);

// Initialize plot with default values
window.onload = function() {
    updatePoissonPlot(5); // Default lambda
};
