var mongoose=require('mongoose');
var Schema=mongoose.Schema;
mongoose.connect('mongodb://localhost/test',{
     useNewUrlParser: true,
    useUnifiedTopology: true
});
var userSchema=new Schema({
username:{
type:String,
required:true
},
password:{
  type:String,
  required:true
},
email:{
  type:String
}
});//这里是在设计表（mongodb没有表的概念，只有集合的概念）的结构
var User=mongoose.model('User',userSchema);/*User第一个参数等于是新建了一个名为User的数据库(存疑，毕竟上面写的很明确，连接的是test数据库)
，里面是users的集合，是model这个方法自己建立的。返回值是一个构建模型函数*/
//增
var admin=new User({
  username:'admin',
  password:'123456',
  email:'???@126.com'
});
var admin=new User({
  username:'lisi',
  password:'123456',
  email:'???@126.com'
});
admin.save(function(err,ret){
  if(err){
    console.log('失败');
  }else{
    console.log('成功'+ret)
  }
})//另外很有意思的是，我的数据反复加入数据库，哪怕数据完全一样，也能插入，仅仅ID不同，他的ID是随机生成的
//这里很奇怪，我没有开启数据库直接跑这个数据库操作，居然没有报错
//查
User.find(function(err,ret){
  if(err){
    console.log('失败')
  }else{
    console.log(ret)
  }
})//查询所有
User.find({
  username:"lisi"
},function(err,ret){
  if(err){
    console.log('失败')
  }else{
    console.log(ret)
  }
})//条件查询 .find返回的是对象，里面有数组，例如{[]}。 .findOne返回的直接就是数组,例如[]
//删
User.remove({
username:"lisi"//符合条件的会全部删除
},function(err，data){if(err){
  console.log('删除失败');}else{console.log('成功删除')}
})
//改
User.update({username:"admin"},{password:"123"},function(err,data){
  if(err){console.log(err)}else{console.log(data)}
})//第一个参数是条件，第二个参数是修改内容，第三个是回调函数(回调函数是选填项)另外注意是update不是updata
//这个文件的api很多都已经过时了，官网建议
