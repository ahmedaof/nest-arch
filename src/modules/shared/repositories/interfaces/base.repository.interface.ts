import {
  InsertResult,
  UpdateResult,
  FindOptionsWhere,
  FindOptionsSelect,
  FindOptionsRelations,
  DeleteResult,
  FindOptionsOrder,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { UpsertOptions } from 'typeorm/repository/UpsertOptions';

export interface BaseRepositoryInterface<T> {
  create(data: QueryDeepPartialEntity<T>): Promise<InsertResult>;
  update({
    where,
    data,
  }: {
    where: FindOptionsWhere<T>;
    data: QueryDeepPartialEntity<T>;
  }): Promise<UpdateResult>;
  findOne(params: {
    select: FindOptionsSelect<T>;
    where: FindOptionsWhere<T>;
    relations?: FindOptionsRelations<T>;
    relationLoadStrategy?: 'join' | 'query';
    order?: FindOptionsOrder<T>;
  }): Promise<T>;
  delete(where: FindOptionsWhere<T>): Promise<DeleteResult>;
  upsert(params: {
    upsertData: QueryDeepPartialEntity<T>;
    upsertOptions: UpsertOptions<T>;
  }): Promise<InsertResult>;
  find(params: {
    select: FindOptionsSelect<T>;
    where?: FindOptionsWhere<T>;
    relations?: FindOptionsRelations<T>;
    take?: number;
    skip?: number;
    relationLoadStrategy?: 'join' | 'query';
    order?: FindOptionsOrder<T>;
  }): Promise<Array<T>>;
}
