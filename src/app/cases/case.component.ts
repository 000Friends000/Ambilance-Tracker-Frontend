// case.component.ts
import { Component, OnInit } from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-cases',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css'],
})
export class CaseComponent implements OnInit {
  totalCases = 50;
  openCases = 20;
  closedCases = 30;
  avgResponseTime = '2 hours';

  selectedStatus = 'All';

  cases = [
    { id: 1, title: 'Case 1', status: 'Open', assignee: 'Team A', createdDate: '2023-12-01', resolvedDate: '' },
    { id: 2, title: 'Case 2', status: 'Closed', assignee: 'Team B', createdDate: '2023-12-02', resolvedDate: '2023-12-05' },
    { id: 3, title: 'Case 3', status: 'In Progress', assignee: 'Individual 1', createdDate: '2023-12-03', resolvedDate: '' },
  ];

  get filteredCases() {
    if (this.selectedStatus === 'All') {
      return this.cases;
    }
    return this.cases.filter(caseItem => caseItem.status === this.selectedStatus);
  }

  ngOnInit(): void {
    // Additional initialization logic can go here
  }
}
