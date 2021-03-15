import { LoaderService } from './loader.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  isLoading$ = this.loadService.isLoading;

  constructor(private loadService: LoaderService) { }

  ngOnInit(): void {
  }

}
