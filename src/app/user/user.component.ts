import {Component, ElementRef, OnChanges, OnInit, ViewChild} from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { stringify } from '@angular/compiler/src/util';
import {NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

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
  model: NgbDateStruct;
  date: {year: number, month: number};
  today = this.calendar.getToday();
  //////////////////
  private homeActive:boolean=true;
  private flatsActive:boolean=false;
  private fundActive:boolean=false;
  private reportsActive:boolean=false;
  private entActive:boolean=false;
  private outActive:boolean=false;
  private payActive:boolean=false;

  
  flats$: Object;
  flatsData: JSON;
  ents$: Object;
  entsData: JSON;
  outs$: Object;
  outsData: JSON;
  mons$: Object;
  monsData: JSON;
  pay$: Object;
  payData: JSON;
  entForm:Boolean =false;
  entBtn:Boolean =true;
  outForm:Boolean =false;
  outBtn:Boolean =true;
  public entname;
  public ch1;
  public ch2;
  public outvalue;
  public datee;
  public outowner;
  public currentBox=1413;
  public invalidop=false;
  public payForm= false;
  public onePay=false;
  public payval;
  public paydesc;
  public payowner;
  public payent;
  public paymon;
  constructor(private router: Router, private httpClient: HttpClient,
  private cookieService: CookieService,private calendar: NgbCalendar) { 
    this.id = parseInt(cookieService.get("userid"));
    this.name = cookieService.get("username");
    this.email = cookieService.get("useremail");
    if(parseInt(cookieService.get("usertype"))==0)
      this.type = "Admin";
    else
      this.type="Resident";
    this.flatno = cookieService.get('userflatno');
    }
    
    getFlats(a) {
       this.httpClient.get('http://localhost/api/flats.php').subscribe(data => {
       this.flatsData = data as JSON;
       this.flats$ = this.flatsData;
       console.log(this.flats$['data']);
       if (a==0)
       {
        this.homeActive=false;
        this.flatsActive=true;
        this.fundActive=false;
        this.reportsActive=false;
        this.entActive=false;
        this.outActive=false;
        this.payActive=false;
       }
       })
      }
      myProfile()
      {
         this.homeActive=true;
         this.flatsActive=false;
         this.fundActive=false;
         this.reportsActive=false;
         this.entActive=false;
         this.outActive=false;
         this.payActive=false;

      }
      getEntitlements(a)
      {
          let params = new HttpParams().set('add', "0");
          this.httpClient.get('http://localhost/api/ent.php',{params:params}).subscribe(data => {
          this.entsData = data as JSON;
          this.ents$ = this.entsData;
          console.log(this.ents$['data']);
          if(!a)
          {
            this.homeActive=false;
            this.flatsActive=false;
            this.fundActive=false;
            this.reportsActive=false;
            this.entActive=true;
            this.outActive=false;
            this.payActive=false;
          }
          })
      }
      addBtn(a)
      {
        if(a==0)
        {
          this.entForm=true;
          this.entBtn=false;
        }
        else if(a==1)
        {
          this.outForm=true;
          this.outBtn=false;
        }

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
        this.getEntitlements(0);
        //console.log(this.ents$['msg']);
        })
      }
      getOutgoings()
      {
        let params = new HttpParams().set('add', "0");
        this.httpClient.get('http://localhost/api/out.php',{params:params}).subscribe(data => {
        this.outsData = data as JSON;
        this.outs$ = this.outsData;
        console.log(this.outs$);
        this.homeActive=false;
        this.flatsActive=false;
        this.fundActive=false;
        this.reportsActive=false;
        this.entActive=false;
        this.outActive=true;
        this.payActive=false;

        })
      }
      selectToday() {
        this.model = this.calendar.getToday();
      }
      addOut()
      {
        this.datee=this.model.year+"-"+this.model.month+'-'+this.model.day;
        let params = new HttpParams().set('value', this.outvalue).
        set('date', this.datee).set('owner',this.outowner);
        console.log(this.datee);
        console.log(this.outvalue);
        console.log(this.outowner);
        this.httpClient.get('http://localhost/api/out.php',{params:params}).subscribe(data => {
        this.outsData = data as JSON;
        this.outs$ = this.outsData;
        if (this.outs$['msg']=="Sufficient")
        {
          this.currentBox =this.outs$['value'];
        }
        else {
          this.invalidop=true;
        }
        this.getOutgoings();
      })
    }
      setOwner(a)
      {
        this.outowner=a;
      }
      showFundbox()
      {
        this.homeActive=false;
        this.flatsActive=false;
        this.fundActive=true;
        this.reportsActive=false;
        this.entActive=false;
        this.outActive=false;
        this.payActive=false;
      }
      getPayments()
      {
        this.homeActive=false;
        this.flatsActive=false;
        this.fundActive=false;
        this.reportsActive=false;
        this.entActive=false;
        this.outActive=false;
        this.payActive=true;
      }
      showPayForm(a)
      {
        this.payForm =true;
        if (!a)//One flat
          this.onePay = true;
        else
        this.onePay=false;

      }
      getMoths(a)
      {
        if (!a)
        {
          let params = new HttpParams().set('add', "0");
          this.httpClient.get('http://localhost/api/mon.php',{params:params}).subscribe(data => {
          this.monsData = data as JSON;
          this.mons$ = this.monsData;
          console.log(this.mons$);  
          });
        }
      }
      setEnt(a)
      {
        this.payent=a;
      }
      setMon(a)
      {
        this.paymon=a;
      }
      addPay()
      {
        if(this.onePay)
          console.log(this.payval+' '+this.paydesc+' '+this.paymon+' '+this.outowner);
          this.datee =this.model.year+"-"+this.model.month+'-'+this.model.day;
          let params = new HttpParams().set('val', this.payval).
          set('desc',this.paydesc).set('mon',this.paymon).
          set('own',this.payowner).set('date',this.datee);
          this.httpClient.get('http://localhost/api/pay.php',{params:params}).subscribe(data => {
          this.payData = data as JSON;
          this.pay$ = this.payData;
          console.log(this.pay$['msg']);
          });
      }
  ngOnInit() {
    
  }

}