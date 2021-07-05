import { ChartConfiguration } from "chart.js";

export function updateDoughnutChartConfig(labels: string[], data: number, title?: string): ChartConfiguration {
  const config: ChartConfiguration = doughnutChartConfig;
  config.data.labels = labels;
  config.data.datasets[0].data = [data, 100 - data]
  config.options.title.text = title;
  //  config.data.datasets[0].backgroundColor = ["#" + Math.floor(Math.random() * 16777215).toString(16)];
  // console.log(title, data)
  config.data.datasets[0].backgroundColor = +data > 0 ? ['#FF0000'] : ['#55dd36'];
  return config;
}

export const doughnutChartConfig: ChartConfiguration = {
  type: 'doughnut',
  data: {
    labels: [],
    datasets: [{
      label: '# of Votes',
      data: [30, 100 - 30],
      backgroundColor: [
        '#60f007'
      ],
      borderColor: [
        'rgba(255, 255, 255 ,1)',
      ],
      borderWidth: 2
    }]
  },
  options: {
    rotation: 1 * Math.PI,
    circumference: 1 * Math.PI,
    cutoutPercentage: 90,
    animation: {
      duration: 2000
    },
    legend: {
      display: true
    },
    tooltips: {
      enabled: false
    },
    title: {
      display: false,
      text: 'title',
      position: 'top',
      padding: 3,
      lineHeight: 0.6,
      fontSize: 20,
    }
  },
}

