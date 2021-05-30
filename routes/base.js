
const router = require('express').Router()

/*** 
 * Route will retrieve a from base value and convert it to the appropriate given base value
 * Query parameters
 * fromBase - a number value representation of the base of fromValue i.e base 2
 * fromValue - a integer representation of the fromBase i.e 111 base 2
 * toBase - a number value representation of a base to convert to i.e base 8
 * Returns: JsonObject
 *  code - status code
 *  data - the converted value from base of value to base value inputted i.e 111 base 2 = 7 base 8
 *  error - appropriate error message if invalid input
*/
router.get('/', (req, res) => {
    // Get base from
    const fromBase = req.query.fromBase;
    const fromValue = req.query.fromValue
    // Get base to
    const toBase = req.query.toBase;

    // Convert from base to base
    // Take the from value from query and convert to corresponding base
    const fromBaseConvert = parseInt(fromValue, parseInt(fromBase, 10));
    console.log(toBase)

    const toBaseConvert = parseInt(`${fromBaseConvert}`, parseInt(toBase, 10))
    console.log(toBaseConvert);
    return res.status(200).json({
        code: 200,
        data: toBaseConvert,
        error: null
    })

});

module.exports = router;