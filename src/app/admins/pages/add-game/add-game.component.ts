import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from 'src/app/games/services/game.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent {

  //? 1º OPCIÓN
  // public file?: File;
  // public fileName: string = "";

  // onUpload(event: Event) {
  //   console.log("FUNSIONA");
  //   // this.file = event.target;
  //   console.log(event.target);
  // }

  // onFileSelected(event: any) {
  //   const file: File = event.target.files[0];
  //   console.log(file.name);

  // }

  //? 2º OPCIÓN
  // On file Select
  public shortLink: string = "";
  public loading: boolean = false; // Flag variable
  public file!: File;
  public showLoadError: boolean = false;

  constructor(private gameService: GameService, private router: Router) {}

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);

    // Create form data
    const formData = new FormData(); 
        
    // Store form name as "file" with file data
    formData.append("file", this.file, this.file.name);
    console.log(formData);

    this.gameService.createGame(formData).subscribe(response => {
      if(response) {
        this.showLoadError = false;
        Swal.fire(`Videojuego/s cargado/s`, '', 'success');
        this.router.navigate(['/admin/all-games']);
      }
    }, (err) => {
      this.showLoadError = true;
    });

    
    // this.fileUploadService.upload(this.file).subscribe(
    //     (event: any) => {
    //         if (typeof (event) === 'object') {

    //             // Short link via api response
    //             this.shortLink = event.link;

    //             this.loading = false; // Flag variable 
    //         }
    //     }
    // );
}

}
