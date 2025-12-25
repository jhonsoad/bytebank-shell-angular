import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-header',
  imports: [CommonModule, NgClass, RouterLink, ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() isLoggedIn: boolean = false;
  @Input() userName?: string;

  @Output() openLoginModal = new EventEmitter<boolean>()
  @Output() openRegisterModal = new EventEmitter<boolean>()
}