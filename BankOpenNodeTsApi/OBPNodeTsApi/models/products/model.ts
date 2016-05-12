import mongoose = require('mongoose');

export interface productdef extends mongoose.Document {
    name: string;
    category: string;
    family?: string;
    super_family?: string;
    more_info_url?: string;
    meta?: any;
    bank_id?: any;
    islocked?: any;
    updated?: any;
}

export class product {
    _schema: mongoose.Schema = new mongoose.Schema({
        name: {
            type: String, required: true, index: { unique: true }
        },
        category: {
            type: String, trim: true, required: true
        },
        family: {
            type: String, trim: true
        },
        super_family: {
            type: String, trim: true
        },
        more_info_url: {
            type: String, trim: true
        },
        meta: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'metadata' }], select: false },
        bank_id: { type: mongoose.Schema.Types.ObjectId, ref: 'bank', select: false },
        islocked: { type: Boolean, select: false },
        updated: { type: Date, select: false }
    }
    )
        .pre('save', function (next) {
            this.updated = new Date();
            next();
        });
    current: mongoose.Model<productdef>;
    constructor() {
        this.current = mongoose.model<productdef>('product', this._schema);
    }
    set(item: productdef) {
        return new this.current(item);
    }
}
