const Koa = require('koa');
const { connect, initSchemas } = require('./database/init.js');
const mongoose = require('mongoose');
const Router =require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors')
const app = new Koa();

app.use(bodyParser());
app.use(cors());

let user = require('./appApi/user.js');
let goods = require('./appApi/goods.js');

//装载所有子路由
let router = new Router();
router.use('/user',user.routes());
router.use('/goods',goods.routes());


//加载路由中间件
app.use(router.routes());
app.use(router.allowedMethods());

(async () => {
    await connect();
    initSchemas();
    /* const User = mongoose.model('User');
    let oneUser = new User({userName:'admin',passWord:'admin'})
    oneUser.save().then(()=>{
        console.log('插入成功')
    })
    let users = await User.findOne({});
    console.log('------------------')
    console.log(users)
    console.log('------------------') */
})()

/* app.use(async (ctx) => {
    cxt.body = [{
        data: '111'
    }]

}) */
app.listen(3000, () => {
    console.log(`Your application is running here: http://localhost:3000`);
});