import mongoose = require('mongoose');

export interface accountdef extends mongoose.Document {
    //hlpfull number
    label?: string;
    //account number
    number: string;
    //customers
    owners: any;
    //here is product for nbg
    type: any;
    balance: number;
    IBAN: string;
    swift_bic?: string;
    // views to be implemented
    views_available?: any;
    meta?: any;
    bank_id: any;
    islocked?: any;
    updated?: any;
}

export class account {
    _schema: mongoose.Schema = new mongoose.Schema({
        label: { type: String, trim: true },
        number: { type: String, required: true, trim: true },
        owners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'customer' }],
        type: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
        balance: { type: Number, required: true },
        IBAN: { type: String, required: true, index: { unique: true }, trim: true },
        swift_bic: { type: String, trim: true },
        views_available: { type: mongoose.Schema.Types.Mixed },
        meta: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'metadata' }], select: false },
        bank_id: { type: mongoose.Schema.Types.ObjectId, ref: 'bank', required: true },
        islocked: {
            //P.findOne().select('islocked').exec(callback); to selected 
            type: Boolean, select: false
        },
        updated: { type: Date, select: false }
    }
    )
        .pre('save', function (next) {
            this.updated = new Date();
            next();
        });
    current: mongoose.Model<accountdef>;
    constructor() {
        this.current = mongoose.model<accountdef>('account', this._schema);
    }
    set(item: accountdef) {
        return new this.current(item);
    }
}
