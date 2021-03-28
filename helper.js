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

const convertHTML = (str) => {
    let temp = str.split("");   // Split by character to avoid problems.
    for (let i = 0; i < temp.length; i++) { // Since we are only checking for a few HTML elements, use a switch
      switch (temp[i]) {
        case "<":
          temp[i] = "&lt;";
          break;
        case "&":
          temp[i] = "&amp;";
          break;
        case ">":
          temp[i] = "&gt;";
          break;
        case '"':
          temp[i] = "&quot;";
          break;
        case "'":
          temp[i] = "&apos;";
          break;
      }
    }
    temp = temp.join("");
    return temp;
  }

const dummyValidation = (string) => {
    if (string.toUpperCase().includes('DOG')) {
        return 'DOG';
    }
}

const ignoreFavicon = (req, res, next) => {
    if (req.originalUrl.includes('favicon.ico')) {
      res.status(204).end()
    }
    next();
}

const removeLineBreaks = (str) => { 
    var newstr = ""; 
      
    for( var i = 0; i < str.length; i++ )  
        if( !(str[i] == '\n' || str[i] == '\r') ) 
                newstr += str[i]; 
                  
    return newstr; 
  }  

const isValidUUID = (receivedCookie) => {
    const validUUIDv4Pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    let validityConsensus = validUUIDv4Pattern.test(receivedCookie);
    return validityConsensus;
  }

exports.isValidUUID = isValidUUID;
exports.removeLineBreaks = removeLineBreaks;
exports.convertHTML = convertHTML;
exports.dummyValidation = dummyValidation;
exports.sanitizeInput = sanitizeInput;
exports.ignoreFavicon = ignoreFavicon;