import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cours } from 'src/app/_models/cours';
import { Exercice } from 'src/app/_models/exercice';
import { ClasseService } from 'src/app/_services/classe.service';
import { CoursService } from 'src/app/_services/cours.service';
import { ExerciceService } from 'src/app/_services/exercice.service';
import { QuestionService } from 'src/app/_services/question.service';

@Component({
  selector: 'app-update-exercice',
  templateUrl: './update-exercice.component.html',
  styleUrls: ['./update-exercice.component.scss']
})
export class UpdateExerciceComponent implements OnInit {

  exercice :Exercice =new Exercice();
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  questions ;
  classes ;
  show;
  id;
  d
  toutesClasses;
  toutesQuestions;
  mat;
  matieres
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private exerciceService: ExerciceService,
    private classesService:ClasseService,
    private QuestionsService :QuestionService
    
    //private toastr: ToastrService
  ) { 
    //this.user.role = new Role();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
    this.d=this.exerciceService.getExerciceById(this.id).subscribe(async data=>{
      this.exercice=data;
      console.log('data',data)
      //console.log('nom :',data.nom)
      //console.log('matiere :',data.matiere.nom)
      //console.log('file :',data.filename)
      //this.imagBlob=data.originalname
       this.mat=data.matiere
      console.log('classe :',data.classe)
      this.classes= this.exercice.classe
      console.log("classes")
      console.log(this.classes)
      
      console.log('question :',data.question)
      this.questions= this.exercice.question
      console.log("questions")
      console.log(this.toutesQuestions)

      this.toutesClasses = await this.classesService.getClasseByEnseignant().toPromise();
      for(let i of  this.toutesClasses.keys()){
        //console.log('toutes')
        let index = this.classes.findIndex(m=>m._id == this.toutesClasses[i]._id);
        //console.log("index")
        //console.log(index != -1)
        this.toutesClasses[i].selected=index!=-1;      
      }

      this.toutesQuestions = await this.QuestionsService.getQuestionsByMatiere(this.mat._id).toPromise();
      for(let i of  this.toutesQuestions.keys()){
        //console.log('toutesQuestions')
        let index = this.questions.findIndex(m=>m._id == this.toutesQuestions[i]._id);
        //console.log("indexques")
        //console.log(index != -1)
        this.toutesQuestions[i].selected=index!=-1;      
      }

      console.log('toutes',this.toutesClasses)
      this.getMatieres()
    }),
    this.registerForm = this.formBuilder.group({
      nom: ['', Validators.required],
    
      matiere:  ['',Validators.required],
      titre:  ['',Validators.required],
      classe :[''],
      question :[''],
    });
    
 
}

async onChangeMat(){
  this.toutesQuestions = await this.QuestionsService.getQuestionsByMatiere(this.exercice.matiere._id).toPromise();
      for(let i of  this.toutesQuestions.keys()){
        //console.log('toutesQuestions')
        let index = this.questions.findIndex(m=>m._id == this.toutesQuestions[i]._id);
        //console.log("indexques")
        //console.log(index != -1)
        this.toutesQuestions[i].selected=index!=-1;      
      }
}                                                            

get fval_2() {
  return this.registerForm.controls;
}
UpdateExercice() {
  let results = [];
  let results2 = [];
  console.log('1321')
  //const imagBlob =this.fileInput.nativeElement.files[0];
  for (let m of this.toutesClasses){
    
    console.log('tt',this.registerForm.value.classe);
   // this.registerForm.value.matiere=["620e06c80eb6fd6eb99936a9","620e23690eb6fd6eb99937f3"]
    if(m.selected == true){
    console.log("ahaahah")
    results.push(m._id)
    this.registerForm.value.classe=results;
    
      }}
    // if(results.length == 0)
    // {
      
    //   this.show =false;
    // }
    // else{
    //   this.show=true;
    // }  

    for (let m of this.toutesQuestions){
    
      console.log('tt',this.registerForm.value.question);
     // this.registerForm.value.matiere=["620e06c80eb6fd6eb99936a9","620e23690eb6fd6eb99937f3"]
      if(m.selected == true){
      console.log("ahaahah")
      results2.push(m._id)
      this.registerForm.value.question=results2;
      
        }}
  
  this.submitted = true;
  console.log('clicked');
  // return for here if form is invalid
  if (this.registerForm.invalid) {
    console.log('invalid');
    return;
  }
  //this.loading = true;
  console.log('enabled');
  this.exerciceService.EditExercice(this.id ,this.registerForm.value).subscribe(
    (data) => {
      console.log('api done');
      
      this.goToList();
    },
   
  );
  console.log('all done');
}
goToList(){
  this.router.navigate(['/EnseignantHome/exercices' , {caller2 : "Modification avec succès"}] )
  }
onSubmit(){
  this.UpdateExercice();
}
   
getMatieres(){
  console.log("imed")
    this.classesService.getMatieresByEnseignant().subscribe(e=>{
      this.matieres=e;
      //this.cours.matiere.id = e[0]._id

        console.log("ert")
        console.log(e)
     
     
    
          })
  }
}
