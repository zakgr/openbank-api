import mongoose = require('mongoose');

export interface bankdef extends mongoose.Document {
    // Short Name Use Swift id 
    short_name: string;
    //Bank Name
    full_name: string;
    logo?:string;
    website?:string;
    islocked?: any;
    updated?: any;

}

export class bank {
    _schema: mongoose.Schema = new mongoose.Schema({
        short_name: {
            type: String, required: true, index: { unique: true }
        },
        full_name: {
            type: String, required: true
        },
        logo: {
            type: Boolean
        },
        website: {
            type: String
        },
        islocked: {
            //P.findOne().select('islocked').exec(callback); to selected 
            type: Boolean,select:false
        },
        updated: {
            type: Date,select:false
        }
    })
        .pre('save', function (next) {
            this.updated = new Date();
            next();
        });
    current: mongoose.Model<bankdef>;
    constructor() {
        this.current = mongoose.model<bankdef>('bank', this._schema);
    }
    set(item: bankdef) {
        return new this.current(item);
    }
}
