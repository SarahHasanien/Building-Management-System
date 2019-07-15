import {Component, ElementRef, OnChanges, OnInit, ViewChild} from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor( private router: Router, private httpClient: HttpClient) { }
  public email;
  public password;
  results$: Object;
  resultData: JSON;
  ngOnInit() {
  }
  getBms()
  {
    //alert("hello");
    console.log("Email:  "+this.email);
    console.log("Password:  "+this.password);
    let params = new HttpParams().set('mail', this.email).
    set('pass',this.password);
    this.httpClient.get('http://localhost/api/backend.php',{ params: params }).subscribe(data => {
    this.resultData = data as JSON;
    this.results$ = this.resultData;
    alert("hello "+this.results$['name']);
    })
  }
}
