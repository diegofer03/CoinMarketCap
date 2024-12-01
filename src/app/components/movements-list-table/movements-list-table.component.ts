import { Component, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';

export interface Transaction {
  date: string;
  time: string;
  from: string;
  amountFrom: number;
  to: string;
  amountTo: number;
}

@Component({
  selector: 'movements-list-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatSortModule,
    MatPaginatorModule
  ],
  templateUrl: './movements-list-table.component.html',
  styleUrl: './movements-list-table.component.scss'
})
export class MovementsListTableComponent {
  displayedColumns: string[] = ['date','time', 'from','amountFrom', 'to', 'amountTo'];
  dataSource: MatTableDataSource<Transaction>;

  transactions: Transaction[] = [
    { date: '01/01/2023', time: '12:00:00', from: 'EUR', amountFrom: 7625.15, to: 'BTC', amountTo: 1.0 },
    { date: '02/01/2023', time: '14:30:00', from: 'BTC', amountFrom: 1.0, to: 'LTC', amountTo: 40.0 },
    { date: '03/01/2023', time: '15:00:00', from: 'LTC', amountFrom: 40.0, to: 'BTC', amountTo: 1.6 },
    { date: '03/01/2023', time: '15:00:00', from: 'LTC', amountFrom: 40.0, to: 'BTC', amountTo: 1.6 },
    { date: '03/01/2023', time: '15:00:00', from: 'LTC', amountFrom: 40.0, to: 'BTC', amountTo: 1.6 },
    { date: '03/01/2023', time: '15:00:00', from: 'LTC', amountFrom: 40.0, to: 'BTC', amountTo: 1.6 },
    { date: '03/01/2023', time: '15:00:00', from: 'LTC', amountFrom: 40.0, to: 'BTC', amountTo: 1.6 },
    { date: '03/01/2023', time: '15:00:00', from: 'LTC', amountFrom: 40.0, to: 'BTC', amountTo: 1.6 },
    { date: '03/01/2023', time: '15:00:00', from: 'LTC', amountFrom: 40.0, to: 'BTC', amountTo: 1.6 },
    { date: '03/01/2023', time: '15:00:00', from: 'LTC', amountFrom: 40.0, to: 'BTC', amountTo: 1.6 },
  ];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor() {

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.transactions);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
