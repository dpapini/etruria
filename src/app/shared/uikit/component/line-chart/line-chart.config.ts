import { CurrencyPipe } from "@angular/common";
import { ChartConfiguration } from "chart.js"

export function updateLineChartConfig(labels: string[], data: number[], data2?: any): ChartConfiguration {
  const config: ChartConfiguration = {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: '',
        data: [],
        backgroundColor: ['rgba(255, 99, 132, 0.2)',],
        borderColor: [
          'rgba(255, 99, 132, 1)',],
        borderWidth: 1
      },
      ]
    },
    options: {
      legend: { display: false, },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            callback: function (value, index, values) {
              const v = +value / 1000
              return new CurrencyPipe('it-IT').transform(v, 'EUR');
            }
          }
        }]
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, chart) {
            var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
            return new CurrencyPipe('it-IT').transform(tooltipItem.value, 'EUR');
          },
          title: function (tooltipItem, chart) {
            return chart.datasets[tooltipItem[0].datasetIndex].label || tooltipItem[0].label || '';
          }
        }
      }
    }
  };
  config.data.labels = labels;
  config.data.datasets[0].data = data;
  if (data2 !== null) {
    config.data.datasets.push({});
    config.data.datasets[1].label = data2.Year.toString();
    config.data.datasets[1].data = [{ x: data2.Year, y: data2.Im }];
  }
  return config;
}

export const lineChartConfig: ChartConfiguration = {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: '',
      data: [1, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
      ],
      borderWidth: 1
    },
      // {
      //   label: '',
      //   data: [],
      //   borderColor: [
      //     'rgba(75, 192, 192,1)',
      //   ],
      //   borderWidth: 2
      // }
    ]
  },
  options: {
    legend: {
      display: false,
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          callback: function (value, index, values) {
            const v = +value / 1000
            return new CurrencyPipe('it-IT').transform(v, 'EUR');
          }
        }
      }]
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';

          return new CurrencyPipe('it-IT').transform(tooltipItem.value, 'EUR');
        },
        title: function (tooltipItem, chart) {
          return chart.datasets[tooltipItem[0].datasetIndex].label || tooltipItem[0].label || '';
        }
      }
    }
  }
}

