import {
  Component,
  ContentChild,
  TemplateRef,
  input,
  output,
  signal,
  computed,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableColumn } from './table-column.interface';

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-table.component.html',
})
export class CustomTableComponent<T> {
  data = input.required<T[]>();
  columns = input.required<TableColumn<T>[]>();
  loading = input<boolean>(false);
  sortField = input<string>('');

  sort = output<string>();
  rowClick = output<T>();
  deleteAction = output<T>();

  @ContentChild('customColumn') customColumnTemplate?: TemplateRef<any>;

  currentPage = signal<number>(1);
  pageSize = signal<number>(5);

  totalPages = computed(() => {
    const totalRecords = this.data().length;
    return totalRecords > 0 ? Math.ceil(totalRecords / this.pageSize()) : 1;
  });

  paginatedData = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return this.data().slice(start, end);
  });

  constructor() {
    effect(
      () => {
        this.data();
        this.currentPage.set(1);
      },
      { allowSignalWrites: true },
    );
  }

  handleSort(field: string): void {
    this.sort.emit(field);
  }

  getCellValue(row: T, field: keyof T | string): any {
    if (field && typeof field === 'string' && field in (row as Object)) {
      return (row as any)[field];
    }
    return '';
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update((p) => p + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update((p) => p - 1);
    }
  }
}
