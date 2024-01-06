const {register, login} = require('../controllers/auth')


router.post("/register",register)
router.post("/login",login)

