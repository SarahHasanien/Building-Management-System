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
  private name: string;
  private email: string;
  private type: string;
  private flatno: string;

  constructor(private router: Router, private httpClient: HttpClient,
  private cookieService: CookieService) { 
    this.id = parseInt(cookieService.get("userid"));
    this.name = cookieService.get("username");
    this.email = cookieService.get("useremail");
    this.type = cookieService.get("usertype");
    this.flatno = cookieService.get('userflatno');
    }

  ngOnInit() {
  }

}
