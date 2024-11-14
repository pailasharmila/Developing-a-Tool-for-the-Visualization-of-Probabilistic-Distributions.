// Generate datasets for each distribution
function generateData(distribution, params, size = 500) {
    let data = [];
    switch (distribution) {
        case 'normal':
            for (let i = 0; i < size; i++) {
                data.push(params.mean + params.stdDev * Math.random() * Math.sqrt(-2 * Math.log(Math.random())));
            }
            break;
        case 'binomial':
            for (let i = 0; i < size; i++) {
                let success = 0;
                for (let j = 0; j < params.trials; j++) {
                    success += Math.random() < params.prob ? 1 : 0;
                }
                data.push(success);
            }
            break;
        case 'poisson':
            for (let i = 0; i < size; i++) {
                let L = Math.exp(-params.lambda);
                let k = 0;
                let p = 1;
                do {
                    k++;
                    p *= Math.random();
                } while (p > L);
                data.push(k - 1);
            }
            break;
        case 'exponential':
            for (let i = 0; i < size; i++) {
                data.push(-Math.log(1 - Math.random()) / params.rate);
            }
            break;
        case 'uniform':
            for (let i = 0; i < size; i++) {
                data.push(params.min + (params.max - params.min) * Math.random());
            }
            break;
        case 'geometric':
            for (let i = 0; i < size; i++) {
                let count = 1;
                while (Math.random() >= params.prob) {
                    count++;
                }
                data.push(count);
            }
            break;
        case 'chiSquare':
            for (let i = 0; i < size; i++) {
                data.push(Math.random() * Math.random());
            }
            break;
        case 'beta':
            for (let i = 0; i < size; i++) {
                let x = Math.pow(Math.random(), 1 / params.alpha);
                let y = Math.pow(Math.random(), 1 / params.beta);
                data.push(x / (x + y));
            }
            break;
    }
    return data;
}

// Configuration for distributions
const distributions = {
    'normal': { mean: 0, stdDev: 1 },
    'binomial': { trials: 10, prob: 0.5 },
    'poisson': { lambda: 3 },
    'exponential': { rate: 1 },
    'uniform': { min: -3, max: 3 },
    'geometric': { prob: 0.5 },
    'chiSquare': { df: 2 },
    'beta': { alpha: 2, beta: 5 }
};

// Generate and plot each distribution
function plotDistribution(distribution, elementId) {
    const data = generateData(distribution, distributions[distribution]);

    // Plot histogram
    const trace = {
        x: data,
        type: 'histogram',
        histnorm: 'density',
        marker: { color: 'blue', opacity: 0.5 },
        name: 'Data'
    };

    const layout = {
        title: `${distribution.charAt(0).toUpperCase() + distribution.slice(1)} Distribution`,
        xaxis: { title: 'Value' },
        yaxis: { title: 'Density' }
    };

    Plotly.newPlot(elementId, [trace], layout);
}

// Call function for each distribution
plotDistribution('normal', 'normal');
plotDistribution('binomial', 'binomial');
plotDistribution('poisson', 'poisson');
plotDistribution('exponential', 'exponential');
plotDistribution('uniform', 'uniform');
plotDistribution('geometric', 'geometric');
plotDistribution('chiSquare', 'chiSquare');
plotDistribution('beta', 'beta');
