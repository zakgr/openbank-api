import mongoose = require('mongoose');

export interface messagedef extends mongoose.Document {
    bank_id?:any;
    customer_id?:any;
    message: string;
    from_department: string;
    from_person: string;
    date?: any;
    expireAt?: any;
}

export class message {
    _schema: mongoose.Schema = new mongoose.Schema({
        bank_id: { type: mongoose.Schema.Types.ObjectId, ref: 'bank', select: false },
        customer_id: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'customer' }], select: false },
        message: {
            type: String, required: true, trim: true
        },
        from_department: {
            type: String, required: true, trim: true
        },
        from_person: {
            type: String, required: true, trim: true
        },
        date: {
            type: Date, default:Date.now
        },
        expireAt: {
            type: Date,expires:'2s'
        }
    })
        .pre('save', function (next) {
            this.expireAt = new Date();
            next();
        });
    current: mongoose.Model<messagedef>;
    constructor() {
        this.current = mongoose.model<messagedef>('message', this._schema);
    }
    set(item: messagedef) {
        return new this.current(item);
    }
}
