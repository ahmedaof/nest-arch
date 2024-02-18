import { DatabaseExceptionService } from '@shared/services/index.service';
import {
  InsertResult,
  Repository,
  UpdateResult,
  FindOptionsWhere,
  FindOptionsSelect,
  FindOptionsRelations,
  DeleteResult,
  FindOptionsOrder,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { UpsertOptions } from 'typeorm/repository/UpsertOptions';
import { BaseRepositoryInterface } from './interfaces/base.repository.interface';

export abstract class BaseRepository<T> implements BaseRepositoryInterface<T> {
  constructor(private readonly repository: Repository<T>) {}

  async findAndCount(params: {
    select: FindOptionsSelect<T>;
    where?: FindOptionsWhere<T>;
    relations?: FindOptionsRelations<T>;
    take?: number;
    skip?: number;
    relationLoadStrategy?: 'join' | 'query';
    order?: FindOptionsOrder<T>;
  }): Promise<[T[], number]> {
    try {
      return await this.repository.findAndCount(params);
    } catch (err) {
      throw new DatabaseExceptionService(err.code, err.message);
    }
  }

  async find(params: {
    select: FindOptionsSelect<T>;
    where?: FindOptionsWhere<T>;
    relations?: FindOptionsRelations<T>;
    take?: number;
    skip?: number;
    relationLoadStrategy?: 'join' | 'query';
    order?: FindOptionsOrder<T>;
  }): Promise<Array<T>> {
    try {
      return await this.repository.find(params);
    } catch (err) {
      throw new DatabaseExceptionService(err.code, err.message);
    }
  }

  async create(data: QueryDeepPartialEntity<T>): Promise<InsertResult> {
    try {
      return await this.repository.insert(data);
    } catch (err) {
      throw new DatabaseExceptionService(err.code, err.message);
    }
  }

  async update({
    where,
    data,
  }: {
    where: FindOptionsWhere<T>;
    data: QueryDeepPartialEntity<T>;
  }): Promise<UpdateResult> {
    try {
      return await this.repository.update(where, data);
    } catch (err) {
      throw new DatabaseExceptionService(err.code, err.message);
    }
  }

  async findOne(params: {
    select: FindOptionsSelect<T>;
    where: FindOptionsWhere<T>;
    relations?: FindOptionsRelations<T>;
    relationLoadStrategy?: 'join' | 'query';
    order?: FindOptionsOrder<T>;
  }): Promise<T> {
    try {
      const { select, where, relations, relationLoadStrategy, order } = params;
      return await this.repository.findOne({
        where,
        select,
        relations,
        relationLoadStrategy,
        order,
      });
    } catch (err) {
      throw new DatabaseExceptionService(err.code, err.message);
    }
  }

  async delete(where: FindOptionsWhere<T>): Promise<DeleteResult> {
    try {
      return await this.repository.delete(where);
    } catch (err) {
      throw new DatabaseExceptionService(err.code, err.message);
    }
  }

  async upsert(params: {
    upsertData: QueryDeepPartialEntity<T>;
    upsertOptions: UpsertOptions<T>;
  }): Promise<InsertResult> {
    try {
      const { upsertData, upsertOptions } = params;
      return await this.repository.upsert(upsertData, {
        ...upsertOptions,
        skipUpdateIfNoValuesChanged: true,
      });
    } catch (err) {
      throw new DatabaseExceptionService(err.code, err.message);
    }
  }
}
