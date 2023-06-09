import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from 'src/app/games/interfaces/game.interface';
import { GameService } from 'src/app/games/services/game.service';
import { ValidatorService } from 'src/app/shared/services/validator.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css']
})
export class EditGameComponent implements OnInit {

  public nodes: any;
  public updateError: boolean = false;
  public videogame!: Game;

  public editGameForm: FormGroup = this.formBuilder.group({
    stock: [0, [Validators.required, Validators.min(0)]],
    price: [0, [Validators.required, Validators.min(1)]]
  })

  @ViewChild("isOnOffer") isOnOffer!: ElementRef<HTMLInputElement>;
  @ViewChild("isNew") isNew!: ElementRef<HTMLInputElement>;


  constructor(
    private activatedRoute: ActivatedRoute, 
    private gameService: GameService, 
    private router: Router,
    private formBuilder: FormBuilder,
    private validatorService: ValidatorService
   ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) => {
      this.gameService.getGameById(id).subscribe( response => {
        this.videogame = response;
        this.editGameForm.reset(this.videogame);
      })
    })

    this.nodes = [0,5,10]
  }

  getFieldError(field: string) {
    return this.validatorService.getFieldError(this.editGameForm, field);
  }


  isValidField(field: string) {
    return this.validatorService.isValidField(this.editGameForm, field);
  }

  updateVideogame() {
    if(this.editGameForm.invalid) {
      this.editGameForm.markAllAsTouched();
      return;
    }

    const { stock, price } = this.editGameForm.value;
    
    const updateData = {
      id: this.videogame.id,
      stock: stock,
      price: price,
      onOffer: this.isOnOffer.nativeElement.value,
      isNew: (this.isNew.nativeElement.value === 'true' ? true: false) 
    }    

    this.gameService.updateGame(updateData).subscribe(response => {
      if(response.status === "OK") {
        Swal.fire('Se ha editado el videojuego', '', 'success')
        this.router.navigate(["admin/all-games"]);
      }
    })
  }

}
