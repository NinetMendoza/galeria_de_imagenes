import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drawer-sidebar',
  imports: [RouterLink, CommonModule],
  templateUrl: './drawer-sidebar.component.html'
})
export class DrawerSidebarComponent {
  isOpen = signal(false);

  toggleDrawer() {
    this.isOpen.set(!this.isOpen());
  }

  closeDrawer() {
    this.isOpen.set(false);
  }
}
