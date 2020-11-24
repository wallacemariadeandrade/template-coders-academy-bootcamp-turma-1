import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import User from 'app/model/user';
import { PersistedStateService } from 'app/services/persisted-state.service';
import { UserService } from 'app/services/user.service';
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

    constructor(
        private persistedState:PersistedStateService, 
        private router:Router,
        private userService:UserService
    ) {}

    ngOnInit() {
        this.user = this.persistedState.get(this.persistedState.LOGGED_IN);
        this.dataSource = this.user.favoriteMusics as any;
    }

    goToDetail(albumId) {
        this.router.navigate(["music", albumId]);
    }

    removeFromFavorite(musicId) {
        this.userService
            .removeFromFavorite(this.user.id, musicId) // Remove da listagem de favoritos do usuário (banco de dados)
            .subscribe(() => {
                // Remove da listagem de favoritos do usuário (front end; dados persistidos)
                this.user.favoriteMusics = this.user.favoriteMusics.filter(x => x.musicId != musicId);

                // Atualiza os dados em cache do usuário
                this.persistedState.set(
                    this.persistedState.LOGGED_IN,
                    this.user
                );

                // Atualiza os dados exibidos ao usuário
                this.dataSource = this.user.favoriteMusics as any;

                // Exibe pop up de confirmação
                Swal.fire(
                    "Sucesso!",
                    "Música removida dos favoritos",
                    "success"
                );
        });
    }
}
