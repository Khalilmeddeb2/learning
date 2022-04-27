import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/_models/user.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ClasseService } from 'src/app/_services/classe.service';
import { MatieresComponent } from '../../etbalissementempl/matieres/matieres.component';

@Component({
  selector: 'app-templ-enseignant',
  templateUrl: './templ-enseignant.component.html',
  styleUrls: ['./templ-enseignant.component.scss']
})
export class TemplEnseignantComponent implements OnInit {

  currentUser: User;
  message: "";
  matieres
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private classeService :ClasseService
     
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
   
  }

  ngOnInit(): void {
    this.getMatieres();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  open2(content2) {
    this.modalService.open(content2, {ariaLabelledBy: 'modal-basic-title'});
  
   }
  
  private getDismissReason(reason: any): string {
   if (reason === ModalDismissReasons.ESC) {
     return 'by pressing ESC';
   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
     return 'by clicking on a backdrop';
   } else {
     return `with: ${reason}`;
   }
  }
  getMatieres(){
    console.log("imed")
      this.classeService.getMatieresByEnseignant().subscribe(e=>{
        this.matieres=e;
        //this.exercices.matiere.id = e[0]._id
  
          console.log("ert")
          console.log(e)
       
       
      
             })
    }
    // get fval_2() {
    //   return this.registerForm.controls;
    // }
  
    onChange2()
  { 
    for(let i of this.matieres)
    {
      i.selected = false;
    }
    //this.matResults = this.registerForm.value.matiere;
  console.log("this",this.matieres)
  }
  
  addExercice()
  {
    let results= [];
    for (let e of this.matieres){
        
      //console.log(this.registerForm.value.enseignant);
     // this.registerForm.value.matiere=["620e06c80eb6fd6eb99936a9","620e23690eb6fd6eb99937f3"]
      if(e.selected == true){
      console.log("ahaahah")
      results.push(e._id)
      //this.registerForm.value.enseignant=results;
      console.log("results",results[0]);}}
   console.log("mouha")
   this.router.navigate(['EnseignantHome/exercices/CreateExercice',results[0]])
   console.log("eeeeeeeeeeeeeee")
   this.modalService.dismissAll();
  
  }


}
