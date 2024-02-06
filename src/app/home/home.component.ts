import { Component, inject } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MessagesDialogComponent } from '../messages-dialog/messages-dialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatDialogModule, MatRippleModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private readonly dialog = inject(MatDialog);

  protected openMessagesDialog(): void {
    this.dialog.open(MessagesDialogComponent);
  }
}
