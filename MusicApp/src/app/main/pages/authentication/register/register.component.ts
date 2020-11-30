import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from "@angular/forms";
import { Subject } from "rxjs";

import { FuseConfigService } from "@fuse/services/config.service";
import { fuseAnimations } from "@fuse/animations";
import swal from "sweetalert2";
import { Router } from "@angular/router";
import { UserService } from 'app/services/user.service';
import RegisterUser from 'app/model/registerUser';

@Component({
    selector: "register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class RegisterComponent implements OnInit, OnDestroy {
    registerForm: FormGroup;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _userService: UserService,
        private _router: Router
    ) {
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true,
                },
                toolbar: {
                    hidden: true,
                },
                footer: {
                    hidden: true,
                },
                sidepanel: {
                    hidden: true,
                },
            },
        };

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.registerForm = this._formBuilder.group({
            name: ["", Validators.required],
            email: ["", [Validators.required, Validators.email]],
            password: ["", Validators.required],
            passwordConfirm: ["", [Validators.required]],
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    register() {
        var name = this.registerForm.get("name").value;
        var email = this.registerForm.get("email").value;
        var password = this.registerForm.get("password").value;
        var passwordConfirm = this.registerForm.get("passwordConfirm").value;

        if(passwordConfirm == password) {
            let user = new RegisterUser();
            user.name = name;
            user.email = email;
            user.password = password;
            
            this._userService.registerUser(user).subscribe((result) => {
                if(result == null || result == undefined) {
                    swal.fire("Ops!", "Ocorreu um erro no cadastro!", "error");
                }
                else {
                    swal.fire("Sucesso!", `Usuário ${name} criado!`, "success");
                    this._router.navigate(["auth", "login"]);
                }
            });
        }
        else {
            swal.fire("Ops!", "Senhas informadas não são iguais!", "error");
        }
    }
}
