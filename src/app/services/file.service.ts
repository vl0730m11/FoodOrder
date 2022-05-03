import { Injectable } from '@angular/core';
import * as json2csv from 'json2csv';
import { HttpClient } from '@angular/common/http';
import { FieldInfo } from '../models/classes';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  readonly CSV_DELIMITER = '\,';

  constructor(
    private http: HttpClient
  ) { }

  exportCsv(data: any[], fields: FieldInfo[], filename: string): boolean {
    try {
      const csv = this.convertToCsv(data, fields);

      const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
      const dwldLink = document.createElement("a");
      const url = URL.createObjectURL(blob);
      const isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
      if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
        dwldLink.setAttribute("target", "_blank");
      }
      dwldLink.setAttribute("href", url);
      dwldLink.setAttribute("download", filename + ".csv");
      dwldLink.style.visibility = "hidden";
      document.body.appendChild(dwldLink);
      dwldLink.click();
      document.body.removeChild(dwldLink);
      return true;
    } catch (error) {
      return false;
    }
  }

  convertToCsv(data: any[], fields: FieldInfo[]): string {
    const json2csvParser = new json2csv.Parser({ fields });
    return json2csvParser.parse(data);
  }

  convertCsvToJSON(csv, fields: FieldInfo[]) {
    let lines = csv.split("\n");
    let result = [];
    let headerLabels: string[] = lines[0].split(this.CSV_DELIMITER);

    let headers = [];
    headerLabels.forEach(element => {
      let lbl = element.includes('"') ? element.substring(1, element.length - 1) : element;

      let fieldName = fields.find(h => h.label.trim().localeCompare(lbl.trim()) == 0) ?
        fields.find(h => h.label.trim().localeCompare(lbl.trim()) == 0).value : ""

      headers.push(fieldName);
    });

    var commaRegex = /,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/g

    for (var i = 1; i < lines.length - 1; i++) {
      let obj = {};
      let currentline = lines[i].split(commaRegex);
      for (let j = 0; j < headers.length; j++) {
        let value = currentline[j].includes('"') ? currentline[j].trim().substring(1, currentline[j].trim().length - 1) : currentline[j];
        obj[headers[j]] = value ? value.trim() : "";
      }
      result.push(obj);
    }
    return result;
  }
}
