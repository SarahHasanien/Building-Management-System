import {Component, ElementRef, OnChanges, OnInit, ViewChild} from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { stringify } from '@angular/compiler/src/util';
import {NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private id: number;
  private name: string;
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
  private sucmsg:boolean=false;
  
  private flats$: Object;
  private JSONData: JSON;
  private ents$: Object;
  private outs$: Object;
  private mons$: Object;
  private pay$: Object;
  private tst$: Object;
  private entForm:Boolean =false;
  private entBtn:Boolean =true;
  private outForm:Boolean =false;
  private outBtn:Boolean =true;
  private entname:string;
  private ch1:string;
  private ch2:string;
  private outvalue:string;
  private datee:string;
  private outowner:string;
  private currentBox=100;
  private invalidop:Boolean=false;
  private payForm:Boolean= false;
  private onePay:Boolean=false;
  private payval:string;
  private paydesc:string;
  private payowner:string;
  private payent:string;
  private paymon:string;
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
       this.sucmsg=false;
       this.httpClient.get('http://localhost/api/flats.php').subscribe(data => {
       this.JSONData = data as JSON;
       this.flats$ = this.JSONData;
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
         this.sucmsg=false;
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
          this.sucmsg=false;
          let params = new HttpParams().set('add', "0");
          this.httpClient.get('http://localhost/api/ent.php',{params:params}).subscribe(data => {
          this.JSONData = data as JSON;
          this.ents$ = this.JSONData;
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
        this.sucmsg=false;
        if(this.ch1)
          this.ty = "0";
          else
          this.ty="1"
        console.log(this.ty);
        console.log(this.entname);
        let params = new HttpParams().set('add', "1").
        set('name', this.entname).set('type', this.ty);
        this.httpClient.get('http://localhost/api/ent.php',{params:params}).subscribe(data => {
        this.JSONData = data as JSON;
        this.ents$ = this.JSONData;
        this.getEntitlements(0);
        //console.log(this.ents$['msg']);
        })
      }
      getOutgoings()
      {
        this.sucmsg=false;
        let params = new HttpParams().set('add', "0");
        this.httpClient.get('http://localhost/api/out.php',{params:params}).subscribe(data => {
        this.JSONData = data as JSON;
        this.outs$ = this.JSONData;
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
        this.sucmsg=false;
        this.datee=this.model.year+"-"+this.model.month+'-'+this.model.day;
        let params = new HttpParams().set('value', this.outvalue).
        set('date', this.datee).set('owner',this.outowner);
        console.log(this.datee);
        console.log(this.outvalue);
        console.log(this.outowner);
        this.httpClient.get('http://localhost/api/out.php',{params:params}).subscribe(data => {
        this.JSONData = data as JSON;
        this.outs$ = this.JSONData;
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
        this.sucmsg=false;
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
        this.sucmsg=false;
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
        this.sucmsg=false;

        this.payForm =true;
        if (!a)//One flat
          this.onePay = true;
        else
        this.onePay=false;

      }
      getMoths(a)
      {
        this.sucmsg=false;
        if (!a)
        {
          let params = new HttpParams().set('add', "0");
          this.httpClient.get('http://localhost/api/mon.php',{params:params}).subscribe(data => {
          this.JSONData = data as JSON;
          this.mons$ = this.JSONData;
          console.log(this.mons$);  
          });
        }
      }
      setEnt(a)
      {
        this.payent=a;
        console.log("Entitlement   "+this.payent);
      }
      setMon(a)
      {
        this.paymon=a;
      }
      addPay()
      {
        this.sucmsg=false;
        this.datee =this.model.year+"-"+this.model.month+'-'+this.model.day;
        let params = new HttpParams().set('val', this.payval).set('desc',this.paydesc).
        set('own',this.outowner).set('ent',this.payent).set('datee',this.datee).
        set('mon',this.paymon);
        if(this.onePay)
        {
          this.httpClient.get('http://localhost/api/pay_1.php',{params:params}).subscribe(data => {
          this.JSONData = data as JSON;
          this.tst$ = this.JSONData;
          console.log(this.tst$['msg']);
          this.currentBox =this.tst$['box'];

          if(this.tst$['msg']=="Success")
          {
            console.log(this.sucmsg);
            this.sucmsg=true;
          }
          });
        }
        else
        {
          this.httpClient.get('http://localhost/api/pay_2.php',{params:params}).subscribe(data => {
          this.JSONData = data as JSON;
          this.tst$ = this.JSONData;
          console.log(this.tst$['msg']);
          this.currentBox =this.tst$['box'];

          if(this.tst$['msg']=='Success')
          {
            console.log(this.sucmsg);
            this.sucmsg=true;
          }
          });
        }
        
      }
      showPayments()
      {
        this.homeActive=false;
        this.flatsActive=false;
        this.fundActive=false;
        this.reportsActive=true;
        this.entActive=false;
        this.outActive=false;
        this.payActive=false;
        this.httpClient.get('http://localhost/api/getpay.php').subscribe(data => {
          this.JSONData = data as JSON;
          this.tst$ = this.JSONData;
          console.log(this.tst$);  
          });
      }
  ngOnInit() {
    
  }

}
