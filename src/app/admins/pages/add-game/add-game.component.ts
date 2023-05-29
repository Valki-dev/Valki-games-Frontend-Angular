import { Component } from '@angular/core';
import { GameService } from 'src/app/games/services/game.service';

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
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file!: File;

  constructor(private gameService: GameService) {}

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
      console.log(response);
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
