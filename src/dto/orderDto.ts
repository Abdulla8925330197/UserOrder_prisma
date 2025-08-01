export interface Order{
id:number,
productName : string,
status:string,
amount:number,
createdAt:Date,
userId:number
}
export interface OrderFilterDto {
  userId?: number;
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
  startDate?: Date;
  endDate?: Date;
}

