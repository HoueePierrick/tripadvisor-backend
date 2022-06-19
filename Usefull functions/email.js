// function to count characters positions
const CharCounter = (str, char) => {
    let result = [];
    for(let i = 0; i < str.length; i++) {
        if(str[i] === char) {
            result.push(i);
        }
    }
    return result
}

// function to check if string is email;
const isemail = (str) => {
    let result = false;
    const regex1 = new RegExp("@", "g");
    const regex2 = new RegExp(".");
    if(typeof str !== "string") {
        return result;
    } else {
        const test = str.match(regex1)
        if(!test) {
            return result
        } else if(test.length !== 1) {
                return result;
        } else if(!regex2.test(str)) {
            return result;
        } else if(str.length < 6) {
            return result;
        } else if(CharCounter(str, "@").length !== 1) {
            return result;
        } else if(str.indexOf("@") > CharCounter(str, ".")[CharCounter(str, ".").length - 1]) {
            return result;
        } else if(str.indexOf(` `) !== -1) {
            return result;
        } else {
            result = true;
            return result;
        }
    }
}

module.exports = isemail;