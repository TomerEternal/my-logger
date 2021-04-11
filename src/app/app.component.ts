import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly httpClient: HttpClient,
  ) {}
  ngOnInit(): void {
    this.httpClient.get('').subscribe();
    // throw new Error('hello world!');
  }
  title = 'takeaway';
}
 