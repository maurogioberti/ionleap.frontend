
// export class Collection<T> {

//     // The underlying array data structure of the collection
//     private readonly _items = new Array<T>();

//     // Get the collection as an array
//     public GetItems() {
//         return this._items;
//     }

//     // Get a specific item from a collection given it's index
//     public GetItem(index: number): T {
//         return this._items[index];
//     }

//     // Length of the collection
//     public Count() { return this._items.length; }

//     // Add an object to the collection
//     public Add(item: T) {
//         this._items.push(item);
//     }

//     // Delete an object from the collection
//     public Delete(itemIndex: number) {
//         this._items.splice(itemIndex, 1);
//     }

//     // Find the index of a given object in a collection
//     public IndexOfItem(obj: T, fromIndex?: number): number {
//         if (fromIndex == null) {
//             fromIndex = 0;
//         } else if (fromIndex < 0) {
//             fromIndex = Math.max(0, this._items.length + fromIndex);
//         }
//         for (let i = fromIndex, j = this._items.length; i < j; i++) {
//             if (this._items[i] === obj) {
//                 return i;
//             }
//         }
//         return -1;
//     }

//     public ToString(): string {
//         let stringError = '';
//         for (let i = 0, j = this._items.length; i < j; i++) {
//             if (this._items[i]) {
//                 stringError += this._items[i] + '<BR>';
//             }
//         }
//         return stringError;
//     }
// }
