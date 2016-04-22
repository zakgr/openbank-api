import mongoose = require('mongoose');
import common = require("../commoninterfaces")

export interface customerdef extends mongoose.Document {
    legal_name: string;
    mobile_phone_number?: string;
    email?: string;
    faceImage?: CustomerFaceImage;
    crm?: any;
    string_values?: any;
    date_values?: any;
    numeric_values?: any;
    accounts?: any;
    meta?: any;
    bank_id?: any;
    islocked?: any;
    updated?: any;
}
export interface CustomerFaceImage {
    url: string;
    date?: any;
}

export class customer {
    _schema: mongoose.Schema = new mongoose.Schema({
        legal_name: {
            type: String, required: true, index: { unique: false }
        },
        mobile_phone_number: {
            type: String
        },
        email: {
            type: String
        },
        faceImage: mongoose.Schema.Types.Mixed,
        crm: mongoose.Schema.Types.Mixed,
        string_values: [
            {
                key: {type: String},
                string: {type: String}
            }
        ],
        date_values: [
            {
                key: {type: String},
                string: {type: Date}
            }
        ],
        numeric_values: [
            {
                key: {type: String},
                string: {type: Number}
            }
        ],
        accounts:  { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'account' }], select: false },
        meta:  { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'metadata' }], select: false },
        bank_id: { type: mongoose.Schema.Types.ObjectId, ref: 'bank', select: false },
        islocked: {
            type: Boolean,select:false
        },
        updated: {
            type: Date,select:false
        }
    }
        )
        .pre('save', function(next) {
            this.updated = new Date();
            next();
        });
    current: mongoose.Model<customerdef>;
    constructor() {
        this.current = mongoose.model<customerdef>('customer', this._schema);
    }
    set(item: customerdef) {
        return new this.current(item);
    }
}
