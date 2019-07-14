import {Component, ElementRef, OnChanges, OnInit, ViewChild} from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
import {AppServiceService} from '/home/sara/Desktop/MS/src/app/app-service.service'
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  result$: Object;
  resultData: JSON;
  @ViewChild("wrong", {static: true}) wrong: ElementRef;
  constructor(private router: Router, private httpClient: HttpClient,
    private cookieService: CookieService, private AppServiceService: AppServiceService) { }

  ngOnInit() {
  }
  signInUser(): void {
    this.AppServiceService.getAll().subscribe(
      (res: JSON[]) => {
        console.log(res)
        if (res['msg'] =="Failure")
        this.wrong.nativeElement.style.display = "block";

      },
      (err) => {
        console.log(err);
      }
    );
  }
  /*signInUser()
  {
    let params = new HttpParams();
    this.httpClient.get('http://localhost/api/backend.php').subscribe(data => {
    this.resultData = data as JSON;
    this.result$ = this.resultData;
    if (this.result$['msg']=="Failure")
    {
      this.wrong.nativeElement.style.display = "block";
    }
    else
    {
      console.log(this.resultData)
      console.log(this.result$['id'])
      console.log(this.result$['name'])
      console.log(this.result$['type'])
    }
    this.cookieService.set("userId", this.result$['id']);
    this.cookieService.set("userEmail", this.result$['mail']);
    this.cookieService.set("userName", this.result$['name']);
    this.router.navigate(["/company/"+this.result$['id']]);
      
    })
        
  }
  */
}
