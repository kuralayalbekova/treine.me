import { DatePipe } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChild,
  effect,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export type Message = {
  text: string;
  date: Date;
};

@Component({
  selector: 'app-messages-dialog',
  standalone: true,
  imports: [
    DatePipe,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './messages-dialog.component.html',
  styleUrl: './messages-dialog.component.css',
})
export class MessagesDialogComponent {
  private readonly dialogRef = inject(MatDialogRef);

  @ViewChild('newMessageTextInput')
  private newMessageTextInputElementRef!: ElementRef;

  constructor() {
    effect(() => {
      this.saveMessages(this.messages());
    });
  }

  protected messages = signal<Message[]>(this.loadMessages());
  protected newMessageText = '';

  protected close(): void {
    this.dialogRef.close();
  }

  protected addMessage(): void {
    if (!this.newMessageText) {
      return;
    }

    const newMessage: Message = {
      text: this.newMessageText,
      date: new Date(),
    };
    this.messages.update((messages) => [...messages, newMessage]);
    this.newMessageText = '';
    this.newMessageTextInputElementRef.nativeElement.focus();
  }

  private loadMessages(): Message[] {
    const messagesStr = localStorage.getItem('messages');

    if (!messagesStr) {
      return [];
    }

    return JSON.parse(messagesStr);
  }

  private saveMessages(messages: Message[]): void {
    localStorage.setItem('messages', JSON.stringify(messages));
  }
}
