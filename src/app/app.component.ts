import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormsModule,CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements OnInit {
  title = 'Ration List';
  ngOnInit(): void {
    this.pageTitle= 'dashboard'
  }
   pageTitle:string ='' // you can update this dynamically as needed
setPageTitle(title:any){
  console.log(title)
  this.pageTitle = title
}
  navItems: any = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
        { label: 'Total List', icon: 'content_paste', route: '/tc' },
    { label: 'User Profile', icon: 'person', route: '/profile' },
    { label: 'Typography', icon: 'library_books', route: '/typography' },
    { label: 'Icons', icon: 'bubble_chart', route: '/icons' },
    { label: 'Maps', icon: 'location_on', route: '/maps' },
    { label: 'Notifications', icon: 'notifications', route: '/notifications' },
  ];
    headerIcons: any = [
    { icon: 'apps', ariaLabel: 'Apps', isButton: true },
    { icon: 'notifications', ariaLabel: 'Notifications', badge: 5, isButton: false },
    { icon: 'person', ariaLabel: 'User Profile', isButton: true }
  ];
}
