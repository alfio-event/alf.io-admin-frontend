export class PageAndContent<T> {
    left: T;
    right: number; // total number of elements, note: for all paginated contents, we return 50 elements at a time
}