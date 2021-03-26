import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { mimeType } from './mime-type.validator';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

    public API_URL = "http://localhost:3000/api/v1"
	  public uploadForm: FormGroup;
    public videoData = undefined;
    public loading = false;
    public errorMsg = "";
 
	constructor(private formBuilder: FormBuilder,
                private http: HttpClient){
		// init form
		this.uploadForm = this.formBuilder.group({
	      options: ['', Validators.required],
	      video: ['', Validators.required, mimeType]
	    });
	}

	  onVideoPick(event: Event) {
	  	const file = (event.target as HTMLInputElement).files[0];
        // this.uploadForm.get('video').patchValue(file);
        // this.uploadForm.get('video').updateValueAndValidity();
        this.videoData = file;
        this.onSubmitForm();
        // const reader = new FileReader();
        // reader.onload = () => {
        //   if (this.uploadForm.get('video').valid) {
        //     this.videoData = this.uploadForm.controls.images.value;
        //     console.log(this.videoData);
        //     this.onSubmitForm();
        //   } else {
        //       console.log("erreur chargement image");
        //     // this.utils._onError("problème lors du chargement de l'image. Vérifier que votre image est bien au format jpg ou png")
        //   }
        // };
        // reader.readAsDataURL(file);
      }


     onSubmitForm(){
    this.loading = true;
    // get data
    const options = this.uploadForm.controls.options.value;

      // we store the board withtout saving any brand or model
      this.transferVideo(options, this.videoData)
      .then((response) => {
        this.loading = false;
        console.log(response);
      })
      .catch((error) => {
        this.loading = false;
        this.errorMsg = "Erreur lors du transfert de la vidéo";
      });
    
  }

  transferVideo(options: string, videoData: any){
      let dataToSend = new FormData();
      dataToSend.append('videos', videoData);
      dataToSend.append('options', options);
      return new Promise((resolve, reject) => {
        this.http.post(this.API_URL + '/video/', dataToSend).subscribe(
          (response) => {
      
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      });
    }


}
