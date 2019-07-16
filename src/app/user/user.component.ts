import {Component, ElementRef, OnChanges, OnInit, ViewChild} from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private id: number=-1;
  private name: string="sara";
  private email: string;
  private type: string;
  private flatno: string;

  //////////////////
  private homeActive:boolean=true;
  private flatsActive:boolean=false;
  private FundActive:boolean=false;
  private reportsActive:boolean=false;

  flats$: Object;
  flatsData: JSON;
  constructor(private router: Router, private httpClient: HttpClient,
  private cookieService: CookieService) { 
    this.id = parseInt(cookieService.get("userid"));
    this.name = cookieService.get("username");
    this.email = cookieService.get("useremail");
    if(parseInt(cookieService.get("usertype"))==0)
      this.type = "Admin";
    else
      this.type="Resident";
    this.flatno = cookieService.get('userflatno');
    }
    
    getFlats() {
       this.httpClient.get('http://localhost/api/flats.php').subscribe(data => {
       this.flatsData = data as JSON;
       this.flats$ = this.flatsData;
       console.log(this.flats$['data']);
       this.homeActive=false;
       this.flatsActive=true;
       this.FundActive=false;
       this.reportsActive=false;
       })
      }
      myProfile()
      {
         this.homeActive=true;
         this.flatsActive=false;
         this.FundActive=false;
         this.reportsActive=false;

      }
  ngOnInit() {
    
  }

}
