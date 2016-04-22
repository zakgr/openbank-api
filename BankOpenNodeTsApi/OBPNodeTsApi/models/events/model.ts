import mongoose = require('mongoose');

export interface eventdef extends mongoose.Document {
    name: string;
    category: string;
    place: string;
    attending_count?: number;
    start_time: any;
    updated?: any;
    islocked?: any;
}

export class event {
    _schema: mongoose.Schema = new mongoose.Schema({
        name: {
            type: String, required: true,index: { unique: true }
        },
        category: {
            type: String, required: true
        },
        place: {
            type: String, required: true
        },
        attending_count: {
            type: Number, min: 1
        },
        start_time: {
            type: Date, required: true
        },
        islocked: {
            type: Boolean, select: false
        },
        updated: {
            type: Date, select: false
        }
    }
    )
        .pre('save', function (next) {
            this.updated = new Date();
            next();
        });
    current: mongoose.Model<eventdef>;
    constructor() {
        this.current = mongoose.model<eventdef>('event', this._schema);
    }
    set(item: eventdef) {
        return new this.current(item);
    }
}
