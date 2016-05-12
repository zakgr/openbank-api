export function update(insert,model,deferred) {
    insert.validate(function (err) {
        if (err) {
            deferred.resolve(err);
            return;
        }
        model.findByIdAndUpdate(insert._id, insert, { upsert: true, new: true },
            function (err2, found) {
                if (err2) deferred.resolve({ error: err2 });
                deferred.resolve(found)
            });
    });
}