import mongoose = require('mongoose');

export interface transactiondef extends mongoose.Document {
    uuid?: string;
    this_account?: any;
    other_account?: any;
    this_account_insystem?: any;
    other_account_insystem?: any;
    details: {
        status: string,
        posted_by_user_id?: any,
        approved_by_user_id?: any,
        paused_by_user_id?: any,
        cancelled_by_user_id?: any,
        posted_by_ip_address?: string,
        approved_by_ip_address?: string,
        paused_by_ip_address?: string,
        cancelled_by_ip_address?: string,
        type: string,
        description: string,
        posted: any,
        completed: any,
        new_balance: {
            currency: string,
            amount: number
        },
        value: {
            currency: string,
            amount: number
        }
    }
    metadata?: transactionMetadata;
}

export interface transactionHolder {
    name?: string;
    is_alias?: boolean;
}

export interface transactionBank {
    national_identifier?: string;
    name?: string;
}

export interface transactionMetadata {
    narrative?: any;
    comments?: any;
    tags?: any;
    images?: any;
    where?: any;
}

export class transaction {
    _schema: mongoose.Schema = new mongoose.Schema({
        uuid: { type: String },
        details: {
            status: String,
            posted_by_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user'},
            approved_by_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user'},
            paused_by_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user'},
            cancelled_by_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user'},
            posted_by_ip_address: { type: String},
            approved_by_ip_address: { type: String},
            paused_by_ip_address: { type:String},
            cancelled_by_ip_address: { type: String},
            type: String,
            description: String,
            posted: Date,
            completed: Date,
            new_balance: {
                currency: String,
                amount: Number
            },
            value: {
                currency: String,
                amount: Number
            }
        },

        this_account: { type: mongoose.Schema.Types.ObjectId, ref: 'otherAcoount'},
        other_account: { type: mongoose.Schema.Types.ObjectId, ref: 'otherAcoount'},
        this_account_insystem: { type: mongoose.Schema.Types.ObjectId, ref: 'account'},
        other_account_insystem: { type: mongoose.Schema.Types.ObjectId, ref: 'account'},

        metadata: {
            narrative: { type: mongoose.Schema.Types.ObjectId, ref: 'metadata'},
            comments: { type: mongoose.Schema.Types.ObjectId, ref: 'metadata'},
            tags: { type: mongoose.Schema.Types.ObjectId, ref: 'metadata'},
            where: { type: mongoose.Schema.Types.ObjectId, ref: 'metadata'},
        },

    }
    )
        .pre('save', function(next) {
            this.updated = new Date();
            next();
        })
    ;
    current: mongoose.Model<transactiondef>;
    constructor() {
        this.current = mongoose.model<transactiondef>('transaction', this._schema);
    }
    set(item: transactiondef) {
        return new this.current(item);
    }
}
