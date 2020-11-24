import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import User from 'app/model/user';
import { PersistedStateService } from 'app/services/persisted-state.service';
import Swal from "sweetalert2";

@Component({
    selector: "app-favorite",
    templateUrl: "./favorite.component.html",
    styleUrls: ["./favorite.component.scss"],
})
export class FavoriteComponent implements OnInit {
    
    user: User;
    
    displayedColumns: string[] = [
        "position",
        "name",
        "band",
        "avatar",
        "album",
        "action",
    ];
    dataSource: any[];

    constructor(private persistedState:PersistedStateService) {

    }

    ngOnInit() {
        this.user = this.persistedState.get(this.persistedState.LOGGED_IN);
        this.dataSource = this.user.favoriteMusics as any;
    }
}
