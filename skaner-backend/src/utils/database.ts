import { Db, MongoClient } from 'mongodb';
import { Observable, from } from 'rxjs';
import { catchError, map, tap } from "rxjs/operators";

export class Database {
    private _db: Db;

    public connect(): Observable<void> {
        return from(MongoClient.connect('mongodb://db:27017/scanner-app')).pipe(
            catchError(error => {
                console.log(error);
                throw error;
            }),
            tap((client: MongoClient) => {
                console.log('Connected to DB!');
                this._db = client.db();
            }),
            map((client: MongoClient) => null),
        )
    }

    public getDb(): Db {
        if (!this._db) {
            throw 'No database connection!'
        }
        return this._db;
    }
}
