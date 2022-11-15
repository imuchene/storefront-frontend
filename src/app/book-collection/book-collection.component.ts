import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../book-list/books.model';

@Component({
  selector: 'app-book-collection',
  templateUrl: './book-collection.component.html',
  styleUrls: ['./book-collection.component.scss']
})
export class BookCollectionComponent {

  // @Input() books: ReadonlyArray<Book> = [];
  @Input() books: (Book | undefined)[] | null = [];
  @Output() remove = new EventEmitter<string>();

}
