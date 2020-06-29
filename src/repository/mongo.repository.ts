import { Response } from 'express';
// import Logger from '../../config/logger';
// import { CommonRepositoryMsg } from '../utils/constants';

export class MongoRepository {
    
    constructor() {       
       
    }
    
    find = async(res:Response, schema:string, filter: any = {}, columns:any = {}, sort:any = {}, limit?: number) => {
        try {
            const collection = res.locals.db.model(schema);
            const query = collection.find(filter).select(columns).sort(sort);
            if(limit) {
                query.limit(limit);
            }
            return await query.exec();
        } 
        catch (err) {
            return err;
        }
    }

    findOneAndUpdate = async(res:Response, schema:string, filter: any, data:any,columns = {}) => {
        try {
            const collection = res.locals.db.model(schema);
            const option = { new: true }
            return await collection.findOneAndUpdate(filter, data, option).select(columns);
        } 
        catch (err) {
            return err;
        }
    }

    aggregate = async(res:Response, schema:string, filter:any) => {
        try {
            const collection = res.locals.db.model(schema);
            return await  collection.aggregate(filter).exec();
        } 
        catch (err) {
            return err;
        }
    }

    remove = async(res: Response, schema:string) => {
        try {
            const collection = res.locals.db.model(schema);
            return await collection.remove().exec();
        }
        catch(err) {
            return err
        };
    }
 
    insertMany = async(res: Response,schema:string, data: any) => {
        try {
            const collection = res.locals.db.model(schema);
            return await collection.insertMany(data);
        }
        catch(err) {
            return err
        };
 
    }
    
    findOneAndDelete = async(res:Response, schema:string, filter: any) => {
        try {
            const collection = res.locals.db.model(schema);
            return await collection.findOneAndDelete(filter).exec();
        } 
        catch (err) {
            return err;
        }
    }

    findOne = async(res:Response, schema:string, filter: any = {}, columns: any = {}) => {
        try {
            const collection = res.locals.db.model(schema);
            return await collection.findOne(filter).select(columns);
        } 
        catch (err) {
            return err;
        }
    }

    deleteMany = async(res:Response, schema:string, filter: any = {}) => {
        try {
            const collection = res.locals.db.model(schema);
            return await collection.deleteMany(filter).exec();
        } 
        catch (err) {
            return err;
        }
    }

    save = async(res:Response, schema:string, inputData) => {
        try{
            const Collection = res.locals.db.model(schema);
            const collectionData = new Collection(inputData);
            return await collectionData.save();
        }
        catch(err){
            return err;
        }

    }

    update = async(res:Response, schema:string,filter,updateQuery) => {
        try{
            const Collection = res.locals.db.model(schema);
            return await Collection.updateOne(filter,updateQuery);
        }
        catch(err){
            return err;
        }
    }
    findAndUpdate = async(res:Response, schema:string,filter,updateQuery) => {
        try{
            const Collection = res.locals.db.model(schema);
            return await Collection.findOneAndUpdate(filter,updateQuery, {useFindAndModify: false, new: true});
        }
        catch(err){
            return err;
        }
    }
}