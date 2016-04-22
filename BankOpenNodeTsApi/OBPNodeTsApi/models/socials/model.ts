import mongoose = require('mongoose');

export interface socialdef extends mongoose.Document {
    typen: string;
    handle: string;
    enable: boolean;
    enableddate?: any;
    islocked?: any;
    updated?: any;
}

export class social {
    _schema: mongoose.Schema = new mongoose.Schema({
        typen: {
            type: String, required: true, index: { unique: true }
        },
        handle: {
            type: String, required: true
        },
        enable: {
            type: Boolean, required: true
        },
        enableddate: {
            type: Date,
        },
        islocked: {
            type: Boolean, select: false
        },
        updated: {
            type: Date, select: false,
        }
    }
    )
        .pre('save', function (next) {
            this.updated = new Date();
            next();
        });
    current: mongoose.Model<socialdef>;
    constructor() {
        this.current = mongoose.model<socialdef>('social', this._schema);
    }
    set(item: socialdef) {
        return new this.current(item);
    }
}
