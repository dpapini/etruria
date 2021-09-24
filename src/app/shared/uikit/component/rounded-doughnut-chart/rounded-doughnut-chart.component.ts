import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';
import { updateDoughnutChartConfig } from './rounded-doughnut-chart.config';

@Component({
  selector: 'app-rounded-doughnut-chart',
  templateUrl: './rounded-doughnut-chart.component.html',
  styles: [`
  .pc-positive{color:green}
  .pc-negative{color:red}
  `],
})
export class RoundedDoughnutChartComponent {
  @ViewChild("roundedDoughnutChart", { static: true }) roundedDoughnutChart: ElementRef<HTMLCanvasElement>;

  @Input() data: number[] = [];
  @Input() value: number = 0;
  @Input() labels: string[] = [];
  @Input() title: string = '';

  myChart: Chart;
  constructor() { }

  ngAfterViewInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    const { data, title } = changes;

    const config = updateDoughnutChartConfig(this.labels, data?.currentValue, title?.currentValue)

    if (!data || !title) return;
    if (data.firstChange && title.firstChange) {
      const ctx = this.roundedDoughnutChart.nativeElement.getContext('2d');
      // this.myChart = new Chart(ctx, updateDoughnutChartConfig(this.labels, data.currentValue, title.currentValue));
      this.myChart?.destroy();
      this.myChart = new Chart(ctx, config);
      // console.log(this.myChart.data.datasets[0])
    }
    else {
      console.log('nfg')
      this.myChart.config = config;
      this.myChart.update();
    }

  }

}


