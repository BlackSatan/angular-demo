import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {

  @Input() user;
  
  constructor(private sanitizer:DomSanitizer){}

  sanitize(url:string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  ngOnInit() {
    
  }

}
