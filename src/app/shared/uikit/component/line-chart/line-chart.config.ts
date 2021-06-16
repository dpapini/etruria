import { CurrencyPipe } from "@angular/common";
import { ChartConfiguration } from "chart.js"

// export function updateLineChartConfig(data: number[]): ChartConfiguration {
//    const config: ChartConfiguration = lineChartConfig;
//    console.log('data', data)
//    config.data.datasets[0].data = data;
//    return config;
// }
export function updateLineChartConfig(labels: string[], data: number[]): ChartConfiguration {
   const config: ChartConfiguration = lineChartConfig;
   config.data.labels = labels;
   config.data.datasets[0].data = data;
   return config;
}

export const lineChartConfig: ChartConfiguration = {
   type: 'line',
   data: {
      labels: [],
      datasets: [{
         label: '',
         data: [],
         backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
         ],
         borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
         ],
         borderWidth: 1
      }]
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
               return new CurrencyPipe('it-IT').transform(tooltipItem.yLabel, 'EUR');
            }
         }
      }
   }
}

