const router = require('express').Router()

router.get('/', (req, res) => {
    // Get arabic numeral
    const numeral = parseInt(req.query.numeral, 10);

    if (numeral === 0) {
        return res.status(400).json({
            code: 400,
            data: null,
            error: 'INVALID_ZERO_INPUT'
        })
    }

    const converted = convertNumbertoRoman(numeral);

    if (numeral > 3999) {
        return res.status(400).json({
            code: 400,
            data: null,
            error: 'INVALID_HIGH_INPUT'
        })
    }

    return res.status(200).json({
        code: 200,
        data: converted,
        error: null
    })
});

function convertNumbertoRoman(value) {

    // Creating a symbol lookup for all I roman numerals
    const symI = ["", "I", "II", "III", "IV", "V","VI", "VII", "VIII", "IX"];
    // Creating a symbol lookup for all X roman numerals
    const symX = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
    // Creating a symbol lookup for all C roman numerals
    const symC = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];
    // Creating a symbol lookup for all M roman numerals
    const symM = ["", "M", "MM", "MMM"];

    // Divide and conquer: split the numerals down from thousands, hundreds, tens and singles
    // i.e 1090
    const thounsands = symM[Math.floor(value / 1000)] || symM[0] // 1090 / 1000 = 1.090 = rounded to 1 M
    const hundreds = symC[Math.floor((value % 1000) / 100)] || symC[0] // Get Remainder of 1000 and divide by 100 i.e 1090, 1090 % 1000 = 090 = rounded to 0
    const tens = symX[Math.floor((value % 100) / 10)] || symX[0] // Get Remainder of 100 and divide by 10 i.e 1090 % 100 = 90 / 10 = 9 = XC

    // Get only remainder
    const single = symI[value % 10] || symI[0] 

    return thounsands + hundreds + tens + single;
}



module.exports = router;