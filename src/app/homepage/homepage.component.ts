import {Component, ElementRef, OnChanges, OnInit, ViewChild} from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor( private router: Router, private httpClient: HttpClient,
  private cookieService: CookieService) { }
  @ViewChild("wrong", {static: true}) wrong: ElementRef;
  public email;
  public password;
  result$: Object;
  resultData: JSON;
  ngOnInit() {
    this.cookieService.deleteAll("/", "localhost");

  }
  logIn()
  {
    //alert("hello");
    console.log("Email:  "+this.email);
    console.log("Password:  "+this.password);
    let params = new HttpParams().set('mail', this.email).
    set('pass',this.password);
    this.httpClient.get('http://localhost/api/login.php',{ params: params }).subscribe(data => {
    this.resultData = data as JSON;
    this.result$ = this.resultData;
    console.log(this.result$);
    if (this.result$['msg']=="Success")
      {
        //alert("hello "+this.result$['name']);
        this.cookieService.set( 'userid', this.result$['id'] );
        this.cookieService.set( 'username', this.result$['name'] );
        this.cookieService.set( 'userflatno', this.result$['flat'] );
        this.cookieService.set( 'usertype', this.result$['type'] );
        this.cookieService.set( 'useremail', this.email );
        this.router.navigate(["/user/"+this.result$['id']]);
      }
    else
      {
        //alert(this.result$['msg']);
        this.wrong.nativeElement.style.display = "block";
      }


    })
  }
}
