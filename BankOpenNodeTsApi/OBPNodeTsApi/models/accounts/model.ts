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
    balance: {currency:string,ammount:number};
    IBAN: string;
    swift_bic?: string;
    // views to be implemented
    views_available?: any;
    meta?: any;
    bank_id: any;
    is_public?: boolean;
    updated?: any;
}

export class account {
    _schema: mongoose.Schema = new mongoose.Schema({
        label: { type: String, trim: true },
        number: { type: String, required: true, trim: true, select: false },
        owners: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'customer' }], select: false },
        type: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true, select: false },
        balance: {
            type: {
                currency: { type: String, required: true },
                ammount: { type: Number, required: true }
            }, select: false
        },
        IBAN: { type: String, required: true, index: { unique: true }, trim: true, select: false },
        swift_bic: { type: String, trim: true, select: false },
        views_available: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'view' }], required: true },
        meta: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'metadata' }], select: false },
        bank_id: { type: mongoose.Schema.Types.ObjectId, ref: 'bank', required: true },
        is_public: {
            //P.findOne().select('islocked').exec(callback); to selected 
            type: Boolean, select: false
        },
        updated: { type: Date, select: false }
    }
    )
        .pre('save', function(next) {
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
