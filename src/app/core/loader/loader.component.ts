import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent implements OnInit {
  isLoading$ = this.loadService.isLoading;

  constructor(private loadService: LoaderService) { }

  ngOnInit(): void {
  }

}
