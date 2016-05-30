import mongoose = require('mongoose');

export interface branchedef extends mongoose.Document {
    name: string;
    location?: {
        latitude?: number;
        longitude?: number;
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
    acceptsDeposits?: any;
    meta?: {
        license?: any;
    };
    lobby?: { is24Hours?: any; };
    bank_id?: any;
    islocked?: any;
}

export class branche {
    _schema: mongoose.Schema = new mongoose.Schema({
        name: {
            type: String, required: true, trim: true, index: { unique: true }
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
        area: {
            type: Number
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
        }
    }, 
    { timestamps: true}
    )
        .pre('save', function (next) {
            //this.updated = new Date();
            next();
        })
    ;
    current: mongoose.Model<branchedef>;
    constructor() {
        this.current = mongoose.model<branchedef>('branche', this._schema);
    }
    set(item: branchedef) {
        return new this.current(item);
    }
}
