import { Component,OnInit, ViewChild} from '@angular/core';
import{HttpClient} from '@angular/common/http';
import{map} from 'rxjs/operators';
import { Post } from '../post.model';
import { DatastoreService } from '../appService/datastore.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
 
})
export class FileComponent implements OnInit {
  id:any;

  @ViewChild('postForm') postForm:any;
  wordCount: any;
 
 

  @ViewChild("text") text:any;
  words: any;
  wordCounter() {
    
    this.wordCount = this.text ? this.text.nativeElement.value.split(/\s+/) : 0;
    this.words = this.wordCount ? this.wordCount.length : 0;
  }
  loadedPost:any=[];
  editMode:boolean=false;
  editId='';
  dataTitle="Saved Notes"
  myDate = new Date();
  searchText:any;
  constructor(
    private http:HttpClient,private _datastore:DatastoreService,private datePipe: DatePipe){} 
    myFunction(){
      this.myDate=new Date();
      let latest_date =this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
     }
    ngOnInit(){
      this.fetchPosts();
     
    }
  onFetchNotes(){
    this.fetchPosts();
 
  }
  
  onCreatePost(loadedPost:Post){
    if(this.editMode){
      this.http.put('https://notepad-c147a-default-rtdb.firebaseio.com/posts/'+this.editId+'.json',loadedPost).subscribe(responsedata=>{
      console.log(responsedata); });
    }
    else{
      
      this.http.post('https://notepad-c147a-default-rtdb.firebaseio.com/posts.json',loadedPost).subscribe(responsedata=>{
      console.log(responsedata); });

    }
    
  
  }
  private fetchPosts(){
    this.http.get('https://notepad-c147a-default-rtdb.firebaseio.com/posts.json')
    .pipe(
      map(
        (responseData:{[key:string]:any})=>{
          const postsArray=[];
          for(const key in responseData){
            if(responseData.hasOwnProperty(key)){
              postsArray.push({...responseData[key],id:key});
            }
          }
          return postsArray;
        }
      )
    )
    .subscribe(posts=>{
      this.loadedPost=posts;
      console.log(this.loadedPost)
    });
  }
  onClearNotes(){
    this._datastore.deleteNotes().subscribe(() => {
      this.loadedPost=[];
    });
  }
  onEditNotes(id:any,index:number){
    this.editMode=true;
    this.editId=id;
    
    console.log(id);
    this.postForm.setValue({
      title:this.loadedPost[index].title,
      content:this.loadedPost[index].content,
      date:this.loadedPost[index].date

    })

    
  
  }
  
  ondelete(id:any){

    
    this.http.delete('https://notepad-c147a-default-rtdb.firebaseio.com/posts/'+id+'.json').subscribe(()=>{
      this.fetchPosts();
    })

  }
  
 
  
}