import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass']
})
export class AboutComponent implements OnInit {

  @HostListener('window:scroll') 
    getScrool() {
    let winheight= window.innerHeight;
    let docheight = document.body.scrollHeight;
    let scrollTop = window.pageYOffset;
    let trackLength = docheight - winheight;
    let pctScrolled = Math.floor(scrollTop/trackLength * 100) 
    if(pctScrolled > 7){ this.showThreeImages = true;}
    if(pctScrolled > 30){ this.showPartners = true;}
  }

  showThreeImages: boolean = false;
  showPartners: boolean = false;
  showVideo: boolean = false

  constructor(private router: Router) { }

  ngOnInit() {
    window.scroll(0,0);
  }

  closeVideo() {
    this.showVideo = false
  }

  openVideo() {
    this.showVideo = true
  }

  goToPage(link){
    window.scroll(0,0);
    this.router.navigate([link]);
  }
}
