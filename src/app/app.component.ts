import { Component, OnInit } from '@angular/core';
import { AngularFirestore, QuerySnapshot } from 'angularfire2/firestore';
import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
import { map, filter, switchMap, take } from 'rxjs/operators';
import * as firebase from 'firebase';
import { AngularFireStorage } from 'angularfire2/storage';
import { tap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  uploads: any[];
  allPercentage: Observable<any>;
  files: Observable<any>;
  constructor(public afs: AngularFirestore,
    public storage: AngularFireStorage) {
  }
  ngOnInit() {
    this.files = this.afs.collection('files').valueChanges();

  }
  importImages(event) {
    // reset the array 
    this.uploads = [];
    const filelist = event.target.files;
    const allPercentage: Observable<number>[] = [];

    for (const file of filelist) {

      const path = `files/${file.name}`;
      const ref = this.storage.ref(path);
      const task = this.storage.upload(path, file);
      const _percentage$ = task.percentageChanges();
      allPercentage.push(_percentage$);

      // create composed object with different information. ADAPT THIS ACCORDING YOUR NEED
      const uploadTrack = {
        fileName: file.name,
        percentage: _percentage$
      }

      // push each upload into the array
      this.uploads.push(uploadTrack);
      const _t = task.then((f) => {
        return f.ref.getDownloadURL().then((url) => {
          return this.afs.collection('files').add({
            name: f.metadata.name,
            url: url
          });
        })
      })
      

    }

    this.allPercentage = combineLatest(allPercentage)
      .pipe(
      map((percentages) => {
        let result = 0;
        for (const percentage of percentages) {
          result = result + percentage;
        }
        return result / percentages.length;
      }),
      tap(console.log)
      );

  }


}
