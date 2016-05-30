import mongoose = require('mongoose');

//to be more accurate implementation
export interface metadatadef extends mongoose.Document {
    text: any;
    postedBy?: string;
    islocked?: any;
}

export class metadata {
    _schema: mongoose.Schema = new mongoose.Schema({
        text: {
            type: mongoose.Schema.Types.Mixed, required: true
        },
        postedBy: {
            type: String, trim: true
        },
        islocked: {
            type: Boolean, select: false
        }
    }, 
    { timestamps: true }
    )
        .pre('save', function (next) {
            //this.updated = new Date();
            next();
        });

    current: mongoose.Model<metadatadef>;
    constructor() {
        this.current = mongoose.model<metadatadef>('metadata', this._schema);
    }
    set(item: metadatadef) {
        return new this.current(item);
    }
}
