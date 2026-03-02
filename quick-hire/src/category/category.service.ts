import { Injectable } from '@nestjs/common';

export interface CategoryItem {
  name: string;
  count: number;
}

@Injectable()
export class CategoryService {
  private readonly categories: CategoryItem[] = [
    { name: 'Design', count: 235 },
    { name: 'Sales', count: 756 },
    { name: 'Marketing', count: 140 },
    { name: 'Finance', count: 325 },
    { name: 'Technology', count: 436 },
    { name: 'Engineering', count: 542 },
    { name: 'Business', count: 211 },
    { name: 'Human Resource', count: 346 },
  ];

  findAll(): CategoryItem[] {
    return this.categories;
  }
}
