import {Component, ElementRef, OnChanges, OnInit, ViewChild} from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-flats',
  templateUrl: './flats.component.html',
  styleUrls: ['./flats.component.css']
})
export class FlatsComponent implements OnInit {

  constructor( private router: Router, private httpClient: HttpClient,
    private cookieService: CookieService) { }
  flats$: Object;
  flatsData: JSON;
  ngOnInit() {
     this.httpClient.get('http://localhost/api/flats.php').subscribe(data => {
     this.flatsData = data as JSON;
     this.flats$ = this.flatsData;
     console.log(this.flats$['data']);
     })
  }
 

}
