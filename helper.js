const sanitizeInput = (string) => {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;',
    };
    const reg = /[&<>"'/]/ig;
    return string.replace(reg, (match)=>(map[match]));
};

const dummyValidation = (string) => {
    if (string.toUpperCase().includes('DOG')) {
        return 'DOG';
    }
}

function ignoreFavicon(req, res, next) {
    if (req.originalUrl.includes('favicon.ico')) {
      res.status(204).end()
    }
    next();
}

exports.sanitizeInput = sanitizeInput;
exports.dummyValidation = dummyValidation;
exports.ignoreFavicon = ignoreFavicon;