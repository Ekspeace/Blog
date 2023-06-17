import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { increment } from 'firebase/firestore'

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private afs: AngularFirestore) { }

  loadFeaturedData(){
    return this.afs.collection("posts", ref => ref.where("isFeatured", "==", true).limit(4)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, data}
        })
      })
    )
  }

  loadLatest(){
    return this.afs.collection("posts", ref => ref.orderBy("createdAt").limit(4)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, data}
        })
      })
    )
  }

  loadCategoryPost(categoryId: any){
    return this.afs.collection("posts", ref => ref.where("categoryId", "==", categoryId)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, data}
        })
      })
    )
  }

  loadOnePost(postId: any){
    return this.afs.collection("posts").doc(postId).valueChanges();
  }

  loadSimilarPost(categoryId: any){
    return this.afs.collection("posts", ref => ref.where("categoryId", "==", categoryId)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, data}
        })
      })
    )
  }

  countViews(postId: any){

    const viewsCount = {
      views: increment(1)
    }
    this.afs.collection("posts").doc(postId).update(viewsCount).then(() =>{});
  }
}
