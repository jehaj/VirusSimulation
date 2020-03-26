offsetTimer = 0;

var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Antal raske',
            data: [],
            fill: true,
            backgroundColor: ['rgba(0,0,255, 0.5)'],
            borderColor: ['rgba(0,0,255, 1)'],
            pointRadius: 0,
        }, {
            label: 'Antal døde',
            data: [],
            fill: true,
            backgroundColor: ['rgba(0,0,0, 0.5)'],
            borderColor: ['rgba(0,0,0, 1)'],
            pointRadius: 0,
        }, {
            label: 'Antal Syge',
            data: [],
            fill: true,
            backgroundColor: ['rgba(255,0,0, 0.5)'],
            borderColor: ['rgba(255,0,0, 1)'],
            pointRadius: 1,
        }, {
            label: 'Antal helbredte',
            data: [],
            fill: true,
            backgroundColor: ['rgba(0,255,0, 0.5)'],
            borderColor: ['rgba(255,0,0, 1)'],
            pointRadius: 1,
        }
        ]
    },
    options: {
        scales: {
            yAxes: [{
                stacked: true,
                ticks: {
                    beginAtZero: true,
                }
            }],
        }
    }
});

function resetGraph() {
    for (let set of myChart.data.datasets) {
        set.data = [];
    }
    myChart.data.labels = [];
}

function updateGraph() {
    myChart.data.labels.push(round(millis() / 1000) - round(offsetTimer / 1000));

    let datasets = myChart.data.datasets;

    datasets[0].data.push(healthyPeople);
    datasets[1].data.push(deadPeople);
    datasets[2].data.push(sickPeople);
    datasets[3].data.push(curedPeople);

    myChart.update();
}