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
    bank?: any;
    islocked?: any;
    updated?: any;
}

export class atm {
    _schema: mongoose.Schema = new mongoose.Schema({
        name: {
            type: String, required: true, index: { unique: true }
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
                type: String
            },
            line_2: {
                type: String
            },
            line_3: {
                type: String
            },
            city: {
                type: String
            },
            state: {
                type: String
            },
            postcode: {
                type: String
            },
            country: {
                type: String
            }
        },
        lobby: {
            is24Hours: {
                type: Boolean
            }
        },
        meta: { license: { type: mongoose.Schema.Types.ObjectId, ref: 'metadata' } },
        bank: { type: mongoose.Schema.Types.ObjectId, ref: 'bank' , select: false },
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
    current: mongoose.Model<atmdef>;
    constructor() {
        this.current = mongoose.model<atmdef>('atm', this._schema);
    }
    set(item: atmdef) {
        return new this.current(item);
    }
}
