import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DatastoreService {
  
  

  constructor(private http:HttpClient) { }
 
  deleteNotes(){
    return this.http.delete('https://notepad-c147a-default-rtdb.firebaseio.com/posts.json');
  }
 
}