import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Book } from "./books.model";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
})

export class BookListComponent {
  // @Input() books: ReadonlyArray<Book> = [];
  @Input() books: ReadonlyArray<Book> | null = [];
  @Output() add = new EventEmitter<string>();
}