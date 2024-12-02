import { Component, inject, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule, Sort} from '@angular/material/sort';
import { MockApiService } from '../../services/mock-api/mock-api.service';
import { FethListTransaction, Transaction } from '../../models/app.model';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'movements-list-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    CommonModule,
  ],
  templateUrl: './movements-list-table.component.html',
  styleUrl: './movements-list-table.component.scss'
})
export class MovementsListTableComponent {
  private mockApiService = inject(MockApiService);
  displayedColumns: string[] = ['date','time', 'from','amountFrom', 'to', 'amountTo'];
  dataSource: MatTableDataSource<Transaction > ;
  loading: boolean = false
  errorFetch: boolean = false

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor() {

    this.dataSource = new MatTableDataSource<Transaction >([]);
  }

  ngOnInit(){
    this.fetchListTransactions()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchListTransactions() : void {
    this.loading = true;
    this.mockApiService.getListTransaction().subscribe({
      next: (response : FethListTransaction) => {
        this.dataSource.data =  response.data;
        this.dataSource.sort = this.sort;
        this.loading = false;

      },
      error: (error) => {
        console.error('Error al obtener datos:', error);
        this.loading = false;
        this.errorFetch = true
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sortChange(sortState: Sort) {
    console.log(sortState)
  }
}
