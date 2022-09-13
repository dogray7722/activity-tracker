import { Component, OnInit } from '@angular/core';
import { faTwitter, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  faTwitter = faTwitter
  faGithub = faGithub
  faLinkedin = faLinkedin

  constructor() { }

  ngOnInit(): void {
  }

}
