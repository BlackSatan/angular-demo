import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IProfile } from '../user.service'

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.sass']
})
export class UserInfoComponent implements OnInit {

 @Input() user: IProfile;
 @Input() selected: boolean;
 
 constructor(private sanitizer:DomSanitizer){}

 sanitize(url:string) {
   return this.sanitizer.bypassSecurityTrustUrl(url);
 }

  ngOnInit() {
    
  }

}
