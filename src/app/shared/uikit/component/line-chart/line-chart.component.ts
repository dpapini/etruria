import { AfterViewInit, Component, ElementRef, Input, QueryList, SimpleChanges, ViewChild, ViewChildren, OnDestroy } from '@angular/core';
import * as Chart from 'chart.js';
import { config } from 'rxjs';
import { updateLineChartConfig } from './line-chart.config';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styles: [``],

})
export class LineChartComponent implements AfterViewInit, OnDestroy {
  @ViewChild("lineChart", { static: true }) lineChart: ElementRef<HTMLCanvasElement>;

  @Input() name: string;
  @Input() data: number[]
  @Input() data2: number[]
  @Input() labels: string[]
  @Input() titleChart: string;

  myChart: Chart
  constructor() { }

  ngOnDestroy(): void {
    this.myChart.destroy();
  }

  ngAfterViewInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    const { data, data2, labels } = changes;

    const config = updateLineChartConfig(labels.currentValue, data.currentValue, data2?.currentValue || null)

    if (!data) return;
    if (data.firstChange) {
      const ctx = this.lineChart.nativeElement.getContext('2d');
      this.myChart = new Chart(ctx, config)
    }
    else {
      this.myChart.config = config;
      this.myChart.update();
    }
  }

  ngOnde

  getRandomId() {
    return Math.floor((Math.random() * 6) + 1);
  }
}
