export interface GetMenuList {
    id: number,
    category: string,
    items: GetMenuItems[];
}
  
export interface GetMenuItems {
    name: string,
    value: string,
    imageUrl: string;
}