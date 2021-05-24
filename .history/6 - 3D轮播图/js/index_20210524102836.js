import source from "./source.js";

const delay = function(interval) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
};
