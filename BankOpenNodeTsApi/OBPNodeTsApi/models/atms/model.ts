import mongoose = require('mongoose');

export interface atmdef extends mongoose.Document {
    name: string;
    location?: {
        latitude: number;
        longitude: number;
    };
    address?: {
        line_1?: string;
        line_2?: string;
        line_3?: string;
        city?: string;
        state?: string;
        postcode?: string;
        country?: string;
    };
    meta?: {
        license?: any;
    };
    lobby?: { is24Hours?: any; };
    bank_id?: any;
    islocked?: any;
}

export class atm {
    _schema: mongoose.Schema = new mongoose.Schema({
        name: {
            type: String, required: true, trim: true, uppercase: true
        },
        location: {
            latitude: {
                type: Number, required: true
            },
            longitude: {
                type: Number, required: true
            }
        },
        acceptsDeposits: {
            type: Boolean
        },
        address: {
            line_1: {
                type: String, trim: true
            },
            line_2: {
                type: String, trim: true
            },
            line_3: {
                type: String, trim: true
            },
            city: {
                type: String, trim: true
            },
            state: {
                type: String, trim: true
            },
            postcode: {
                type: String, trim: true
            },
            country: {
                type: String, trim: true
            }
        },
        lobby: {
            is24Hours: {
                type: Boolean
            }
        },
        meta: { license: { type: mongoose.Schema.Types.ObjectId, ref: 'metadata' } },
        bank_id: { type: mongoose.Schema.Types.ObjectId, ref: 'bank', select: false },
        islocked: {
            type: Boolean, select: false
        },
    },
        { timestamps: true }
    )
        .index({ name: 1, bank_id: -1 }, { unique: true })
        .pre('save', function (next) {
            //this.updated = new Date();
            next();
        });
    current: mongoose.Model<atmdef>;
    constructor() {
        this.current = mongoose.model<atmdef>('atm', this._schema);
    }
    set(item: atmdef) {
        return new this.current(item);
    }
}
