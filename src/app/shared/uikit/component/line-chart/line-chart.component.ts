import { AfterViewInit, Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';
import { updateLineChartConfig } from './line-chart.config';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styles: [``]
})
export class LineChartComponent implements AfterViewInit {
  @ViewChild("lineChart", { static: true }) lineChart: ElementRef<HTMLCanvasElement>;

  @Input() data: number[]
  @Input() data2: number[]
  @Input() labels: string[]

  myChart: Chart;
  constructor() { }

  ngAfterViewInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    const { data, data2, labels } = changes;

    const config = updateLineChartConfig(labels.currentValue, data.currentValue, data2.currentValue)

    if (!data) return;
    if (data.firstChange) {
      const ctx = this.lineChart.nativeElement.getContext('2d');
      this.myChart = new Chart(ctx, config);
    }
    else {
      this.myChart.config = config;
      this.myChart.update();
    }
  }

}
