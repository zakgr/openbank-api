import mongoose = require('mongoose');
import common = require("../commoninterfaces");

export interface transactionRequestdef extends mongoose.Document {
    bank_id: string;
    account_id: any;
    type?: any;
    resource_url?: any;
    description?: any;
    body: {
        to: {
            bank_id: string,
            account_id: any,
        }
        description?: string,
        value: {
            currency: string,
            amount: number
        }
    }
    transaction_ids?: any;
    status?: any;
    end_date?: any;
    supported_challenge_types?: any;
    challenge?: {
        allowed_attempts: number,
        challenge_type: string
    }
}

export class transactionRequest {
    _schema: mongoose.Schema = new mongoose.Schema({
        bank_id: { type: mongoose.Schema.Types.ObjectId, trim: true, required: true },
        account_id: { type: mongoose.Schema.Types.ObjectId, trim: true, require: true },
        type: { type: String, trim: true },
        resource_url: { type: String, trim: true },
        description: { type: String, trim: true },
        body: {
            to: {
                bank_id: { type: mongoose.Schema.Types.ObjectId, trim: true, require: true },
                account_id: { type: mongoose.Schema.Types.ObjectId, trim: true, require: true },
            },
            value: {
                currency: { type: String, trim: true, enum: common.currency, require: true },
                amount: { type: Number, require: true }
            },
            description: { type: String, trim: true }
        },
        transaction_ids: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'transaction' }], required: true },
        status: { type: String, trim: true, default: 'INITIATED', enum: ['INITIATED', 'COMPLETED', 'CHALLENGES_PENDING', 'FAILED'] },
        end_date: Date,
        supported_challenge_types: { type: [String], required: true },
        challenge: {
            allowed_attempts: Number,
            challenge_type: { type: String, trim: true }
        },

    },
        { timestamps: true }
    )
        .index({ bank_id: 1, account_id: -1 }, { unique: true })
        .pre('save', function (next) {
            //this.updated = new Date();
            next();
        })
    ;
    current: mongoose.Model<transactionRequestdef>;
    constructor() {
        this.current = mongoose.model<transactionRequestdef>('transactionRequest', this._schema);
    }
    set(item: transactionRequestdef) {
        return new this.current(item);
    }
}
