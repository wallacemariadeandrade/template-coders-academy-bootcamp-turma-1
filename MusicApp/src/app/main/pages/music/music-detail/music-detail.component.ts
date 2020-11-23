import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Album from 'app/model/album';
import { MusicService } from 'app/services/music.service';

@Component({
  selector: 'app-music-detail',
  templateUrl: './music-detail.component.html',
  styleUrls: ['./music-detail.component.scss']
})
export class MusicDetailComponent implements OnInit {

  albumId:String = undefined;
  album:Album = undefined;

  // ActivatedRoute é útil para acessar a url e pegar parâmetros
  constructor(private musicService:MusicService, private activatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.albumId = this.activatedRoute.snapshot.paramMap.get("id"); // id está definido em music-routing.module.ts
    this.musicService.getAlbumDetail(this.albumId).subscribe(data => {
      this.album = data;
    })
  }

  back(){
    this.router.navigate(["music"]);
  }

}
