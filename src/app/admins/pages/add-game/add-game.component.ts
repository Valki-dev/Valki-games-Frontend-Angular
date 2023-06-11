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

  public file!: File;
  public loading: boolean = false;
  public shortLink: string = "";
  public showLoadError: boolean = false;

  constructor(private gameService: GameService, private router: Router) { }

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  onUpload() {
    this.loading = !this.loading;


    const formData = new FormData();

    formData.append("file", this.file, this.file.name);

    this.gameService.createGame(formData).subscribe(response => {
      if (response) {
        this.showLoadError = false;
        Swal.fire(`Videojuego/s cargado/s`, '', 'success');
        this.router.navigate(['/admin/all-games']);
      }
    }, (err) => {
      this.showLoadError = true;
    });
  }

}
