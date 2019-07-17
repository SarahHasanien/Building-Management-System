import {Component, ElementRef, OnChanges, OnInit, ViewChild} from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { stringify } from '@angular/compiler/src/util';

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
  private ty:string;

  //////////////////
  private homeActive:boolean=true;
  private flatsActive:boolean=false;
  private FundActive:boolean=false;
  private reportsActive:boolean=false;
  private entActive:boolean=false;
  private outActive:boolean=false;


  
  flats$: Object;
  flatsData: JSON;
  ents$: Object;
  entsData: JSON;
  entForm:Boolean =false;
  entBtn:Boolean =true;
  public entname;
  public ch1;
  public ch2;
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
       this.entActive=false;
       this.outActive=false;
       })
      }
      myProfile()
      {
         this.homeActive=true;
         this.flatsActive=false;
         this.FundActive=false;
         this.reportsActive=false;
         this.entActive=false;
         this.outActive=false;
      }
      getEntitlements()
      {
          let params = new HttpParams().set('add', "0");
          this.httpClient.get('http://localhost/api/ent.php',{params:params}).subscribe(data => {
          this.entsData = data as JSON;
          this.ents$ = this.entsData;
          console.log(this.ents$['data']);
          this.homeActive=false;
          this.flatsActive=false;
          this.FundActive=false;
          this.reportsActive=false;
          this.entActive=true;
          this.outActive=false;
          })
      }
      addBtn()
      {
        this.entForm=true;
        this.entBtn=false;

      }
      addEnt()
      {
        if(this.ch1)
          this.ty = "0";
          else
          this.ty="1"
        console.log(this.ty);
        console.log(this.entname);
        let params = new HttpParams().set('add', "1").
        set('name', this.entname).set('type', this.ty);
        this.httpClient.get('http://localhost/api/ent.php',{params:params}).subscribe(data => {
        this.entsData = data as JSON;
        this.ents$ = this.entsData;
        //console.log(this.ents$['msg']);
        })
      }
  ngOnInit() {
    
  }

}
