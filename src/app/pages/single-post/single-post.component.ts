import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  postData: any;
  postArray: Array<any> = [];

  constructor(private postService: PostsService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe(val =>{

      this.postService.countViews(val['id']);

      this.postService.loadOnePost(val['id']).subscribe(post => {
        this.postData = post;
        this.loadSimilarPost(this.postData.categoryId);

      })
    })

  }
  loadSimilarPost(categoryId: any){
    this.postService.loadSimilarPost(categoryId).subscribe(val =>{
      this.postArray = val;
    });
  }

}
