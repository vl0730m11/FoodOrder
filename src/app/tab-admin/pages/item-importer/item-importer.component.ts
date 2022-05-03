import { Component, OnInit } from '@angular/core';
import { FileInfo, FileRestrictions } from '@progress/kendo-angular-upload';
import { MenuItemUpload, MenuItem, MenuItemUploadTemplate, MenuCategory, KendoGridColumn, Type } from 'src/app/models/classes';
import { MenuStoreActions, RootStoreState } from 'src/app/root-store';
import { deepCopy, groupBy, distinct } from 'src/app/utils/utils-functions';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Papa } from 'ngx-papaparse';
import { Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileService } from 'src/app/services/file.service';
import { MenuService } from 'src/app/services/menu.service';
import { SelectableSettings } from '@progress/kendo-angular-grid';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-item-importer',
  templateUrl: './item-importer.component.html',
  styleUrls: ['./item-importer.component.scss'],
})
export class ItemImporterComponent implements OnInit {

  uploadRestrictions: FileRestrictions = {
    allowedExtensions: ['.csv']
  };

  uploadFile: MenuItemUpload[] = [];

  uploadItems: MenuItem[] = [];
  uploadCats: MenuCategory[] = [];

  tableColumns: KendoGridColumn[] = [
    { name: 'ID', prop: 'id', width: 50, dataType: Type.NUMBER, format: '{0:N0}' },
    { name: 'Cat ID', prop: 'categoryId', width: 70, dataType: Type.NUMBER, format: '{0:N0}' },
    { name: 'Cat', prop: 'categoryLabel', width: 150, dataType: Type.STRING },
    { name: 'Title', prop: 'title', width: 300, dataType: Type.STRING, isFilterable: true },
    { name: 'Old Price', prop: 'oldPrice', width: 110, dataType: Type.NUMBER },
    { name: 'Price', prop: 'price', width: 110, dataType: Type.NUMBER },
    { name: 'Image', prop: 'imageUrl', width: 200, dataType: Type.STRING, hidden: true }
  ];

  headerRow: any[] = [];
  csvData: any[] = [];
  csvData$: Observable<MenuItemUpload[]>;

  loading: boolean = false;

  selectableSettings: SelectableSettings = {
    enabled: true,
    checkboxOnly: false,
    mode: 'single'
  };


  constructor(
    private store$: Store<RootStoreState.AppState>,
    private http: HttpClient,
    private papa: Papa,
    private flt: Platform,
    private file: File,
    private socialSharing: SocialSharing,
    private fileService: FileService,
    private menuService: MenuService
  ) { }

  ngOnInit() {
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  private loadCSV() {
    // this.http.get('./assets/menu.csv', { responseType: 'text' })
    //   .subscribe(
    //     data => this.extractData(data),
    //     error => console.log(error)
    //   );
    this.loading = true;
    this.csvData$ = this.http.get('./assets/menu.csv', { responseType: 'text' })
      .pipe(
        map(data => this.extractData(data)),
        tap(data => this.loading = false)
      );
  }

  extractData(res) {
    let csvData = res || '';
    const jsonObjects: MenuItemUpload[] = this.fileService.convertCsvToJSON(csvData, MenuItemUploadTemplate);

    let items: MenuItem[] = [];
    jsonObjects.forEach(item => {
      const menuItem = new MenuItem();
      menuItem.categoryId = +item.categoryId;
      menuItem.id = +item.id;
      menuItem.title = item.title;
      menuItem.price = +item.price;
      menuItem.oldPrice = +item.oldPrice;
      menuItem.restaurantId = 1;
      menuItem.unavailable = 0;
      menuItem.imageUrl = item.imageUrl ? 'assets/raw-lq/' + item.imageUrl + '.jpg' : '';
      items.push(menuItem);
    });

    let menuCats: MenuCategory[] = [];
    distinct(jsonObjects, 'categoryId')
      .forEach(cat => {
        const c = new MenuCategory();
        c.id = +cat.categoryId;
        c.title = cat.categoryLabel;
        c.imageUrl = '';
        menuCats.push(c);
      });

    console.log(items);
    console.log(menuCats);


    this.uploadItems = items;
    this.uploadCats = menuCats;

    this.papa.parse(csvData, {
      complete: parsedData => {
        // console.log(parsedData);
        // console.log(parsedData.data.splice(0, 1));
        this.headerRow = parsedData.data.splice(0, 1)[0];
        this.csvData = parsedData.data;
      }
    });

    return jsonObjects;
  }

  exportCSV() {
    let csv = this.papa.unparse({
      fields: this.headerRow,
      data: this.csvData
    });
    console.log(csv);

    if (this.flt.is('cordova')) {
      this.file.writeFile(this.file.dataDirectory, 'data.csv', csv, { replace: true }).then(res => {
        console.log(res.nativeURL);
        this.socialSharing.share(null, null, res.nativeURL, null);
      })
    } else {
      var blob = new Blob([csv]);
      var a = window.document.createElement('a');
      a.href = window.URL.createObjectURL(blob);
      a.download = 'newdata.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }

  downloadTemplate() {
    // let includeIds = this.studentCourses.filter(x => x.courseId == this.selectedGroup.courseId).map(s => s.studentId);
    // let records = deepCopy(this.allStudents.filter(s => includeIds.includes(s.studentId)));
    // records.forEach(r => {
    //   r['groupSetId'] = this.selectedGroup.id;
    //   r['groupName'] = this.selectedGroup.name;
    // });

    // let fileName = "Import Classes Template - " + this.selectedGroup.name;
    // this._fileService.exportCsv(records, ClassUploadTemplate, fileName);
  }

  open() {
    this.loadCSV();
    // this.fileChooser.open().then(uri => alert(uri));
  }
  // valueChange(files: FileInfo[]) {
  //   if (!files || files.length === 0) {
  //     this.reset();
  //     return;
  //   }

  //   const input = files[0].rawFile;
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     let text = reader.result;
  //     // this.uploadFile = this.fileService.convertCsvToJSON(text, MenuItemUploadTemplate);
  //     // this.previewFile = this.createPreviewFile(this.uploadFile);

  //     // if (!this.previewFile || this.previewFile.length == 0) {
  //     //   this.openInvalidUploadDialog();
  //     // }
  //     // else {
  //     //   this.preview();
  //     // this.importMenuItems(this.uploadFile);
  //   };
  //   reader.readAsText(input);
  // }

  import() {
    if (!this.uploadFile || this.uploadFile.length === 0) return;

    // let modalRef = this._dialog.open(ConfirmDialog, {
    //   height: 'auto',
    //   width: '400px',
    //   data: {
    //     title: "Confirmation",
    //     text: "This action will also replace the existing groups that are imported in the upload. Do you want to continue?"
    //   },
    //   disableClose: true
    // });

    // modalRef.afterClosed().subscribe((isConfirmed) => {
    //   if (isConfirmed) {
    //     this.importClick.emit(this.previewFile);
    //     this.reset();
    //   }
    // })
  }

  importMenuItems() {
    if (!this.uploadItems || this.uploadItems.length === 0) return;

    if (!this.uploadCats || this.uploadCats.length === 0) return;


    this.menuService.importCategories(this.uploadCats);
    // .subscribe(x => {
    //   debugger;
    // });
    this.menuService.importMenuItems(this.uploadItems)
      .subscribe(x => {
        debugger;
      });
  }

  private reset() {
    this.uploadFile = [];

    // if (this.kendoUpload) {
    //   this.kendoUpload.clearFiles();
    // }
  }
}
