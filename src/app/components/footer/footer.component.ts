import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  @Input() isLoggedIn: boolean = false;
  meAjudaLink: string = 'meajuda@bytebank.com.br';
  ouvidoriaLink: string = 'ouvidoria@bytebank.com.br';
 }