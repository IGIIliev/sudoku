import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as complexityEnum from '../../models/enums/complexityLevel.enum';
import { SudokuGridModel } from '../../models/sudoku-grid-model';

const url = 'https://sugoku.onrender.com';

@Injectable({
  providedIn: 'root'
})

export class SudocuService {

  constructor(private http: HttpClient) { }

  public getBoard(difficulty: string): Observable<any> {
    return this.http.get<SudokuGridModel>(`${url}/board?difficulty=${difficulty}`);
    //return of({ "board": [[2, 3, 0, 8, 0, 0, 6, 0, 4], [1, 0, 0, 0, 0, 0, 0, 8, 0], [0, 8, 9, 0, 0, 0, 2, 0, 0], [3, 0, 2, 0, 5, 0, 0, 0, 6], [0, 5, 0, 0, 9, 0, 1, 0, 0], [6, 0, 0, 3, 1, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 9, 4, 0], [0, 6, 0, 0, 2, 4, 0, 7, 1], [9, 0, 4, 5, 0, 0, 3, 0, 2]] })
  }

  public solve(body: any): Observable<any> {
    return this.http.post(`${url}/solve`, body);
  }

  public grade(body: any): Observable<complexityEnum.ComplexityEnum> {
    return this.http.post<complexityEnum.ComplexityEnum>(`${url}/grade`, body);
  }

  public validate(body: any): Observable<any> {
    return this.http.post<any>(`${url}/validate`, body);
  }
}
