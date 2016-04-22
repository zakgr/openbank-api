import mongoose = require('mongoose');

export interface userdef extends mongoose.Document {
    userId: number;
    userName: string;
    name: string;
    authCode: string;
    userIp: string;
    created?: any;
    updated?: any;

}

export class user {
    _schema: mongoose.Schema = new mongoose.Schema({
        id: {
            type: Number, required: true, index: { unique: true }
        },
        userName: {
            type: String, required: true
        },
        name: {
            type: String, required: true
        },
        authCode: {
            type: String, required: true
        },
        userIp: {
            type: String, required: true
        },
        created: {
            type: Date,
            default: Date.now
        },
        updated: {
            type: Date,
            default: Date.now
        }
    })
        .pre('save', function (next) {
            this.updated = new Date();
            next();
        });
    current: mongoose.Model<userdef>;
    constructor() {
        this.current = mongoose.model<userdef>('user', this._schema);
    }
    set(id: number,
        userName: string,
        name: string,
        authCode: string,
        userIp: string,
        _id?: string) {
        return new this.current({
            id: id,
            userName: userName,
            name: name,
            authCode: authCode,
            userIp: userIp
        });
    }
}
