import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Book } from './book-list/books.model';
import { GoogleBooksService } from './book-list/books.service';
import { addBook, removeBook, retrievedBookList } from './state/books.actions';
import { selectBookCollection, selectBooks } from './state/books.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'storefront-frontend';
  books$ = this.store.select(selectBooks);
  bookCollection$ = this.store.select(selectBookCollection);

  onAdd(bookId: string){
    this.store.dispatch(addBook({ bookId }));
  }

  onRemove(bookId: string){
    this.store.dispatch(removeBook({ bookId }));
  }

  constructor(private booksService: GoogleBooksService, private store: Store){}
  
  ngOnInit(){
    this.booksService.getBooks().subscribe(
      (books) => this.store.dispatch(retrievedBookList({ books }))
    );
  }
}
