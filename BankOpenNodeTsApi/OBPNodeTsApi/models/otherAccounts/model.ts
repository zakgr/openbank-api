import mongoose = require('mongoose');

export interface otherAccountdef extends mongoose.Document {
    holder?: OtherAccountHolder;
    number: string;
    kind?: string;
    IBAN: string;
    swift_bic: string;
    bank?: OtherAccountBank;
    metadata?: OtherAccountMetadata;
    islocked?: any;
    updated?: any;
}

export interface OtherAccountHolder {
    name?: string;
    is_alias?: boolean;
}

export interface OtherAccountBank {
    national_identifier?: string;
    name?: string;
}

export interface OtherAccountMetadata {
    public_alias?: any;
    private_alias?: any;
    more_info?: any;
    URL?: any;
    image_URL?: any;
    open_corporates_URL?: any;
    corporate_location?: any;
    physical_location?: any;
}

export class otherAccount {
    _schema: mongoose.Schema = new mongoose.Schema({
        holder: {
            name:{ type: String, trim: true },
                is_alias: Boolean
        },
        number: { type: String, trim: true },
        kind: { type: String, trim: true },
        IBAN: { type: String, required: true, trim: true, index: { unique: true } },
        swift_bic: { type: String, trim: true },
        bank: { type: mongoose.Schema.Types.ObjectId, ref: 'bank' },
        metadata: {
            public_alias: { type: mongoose.Schema.Types.ObjectId, ref: 'metadata' },
            private_alias: { type: mongoose.Schema.Types.ObjectId, ref: 'metadata' },
            more_info: { type: mongoose.Schema.Types.ObjectId, ref: 'metadata' },
            URL: { type: mongoose.Schema.Types.ObjectId, ref: 'metadata' },
            image_URL: { type: mongoose.Schema.Types.ObjectId, ref: 'metadata' },
            open_corporates_URL: { type: mongoose.Schema.Types.ObjectId, ref: 'metadata' },
            corporate_location: { type: mongoose.Schema.Types.ObjectId, ref: 'metadata' },
            physical_location: { type: mongoose.Schema.Types.ObjectId, ref: 'metadata' }
        },
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
        })
    ;
    current: mongoose.Model<otherAccountdef>;
    constructor() {
        this.current = mongoose.model<otherAccountdef>('otherAccount', this._schema);
    }
    set(item: otherAccountdef) {
        return new this.current(item);
    }
}
