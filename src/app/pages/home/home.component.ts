import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  featuredPostArray!: Array<any>;
  latestPostArray!: Array<any>;

  constructor(private postService: PostsService){}

  ngOnInit(): void {
    this.postService.loadFeaturedData().subscribe(val => {
      this.featuredPostArray = val;
    });

    this.postService.loadLatest().subscribe(val => {
      this.latestPostArray = val;
    });
  }

}
