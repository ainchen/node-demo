```
demo/
|
+- .vscode/
|  |
|  +- launch.json <-- VSCode 配置文件
|
+- controllers/
|  |
|  +- config/ <-- 接口配置
|  |
|  +- index.js <-- 接口层集中处理
|
+- webSocket/
|  |
|  +- index.js <-- WebSocketServer
|
+- services/
|  |
|  +- config/ <-- 服务层配置
|  |
|  +- index.js <-- 服务层集中处理
|
+- models/
|  |
|  +- config/ <-- 数据层配置
|  |
|  +- index.js <-- 数据层集中处理
|
+- config/ <-- 总配置
|
+- ssl/ <-- ssl文件
|
+- static/ <-- 静态资源
|
+- test/ <-- 测试配置文件
|  |
|  +- db-test.js <-- 数据库测试数据
|
+- index.html <-- 首页
|
+- app.js <-- 入口
|
+- package.json <-- 项目描述文件
|
+- node_modules/ <-- npm安装的所有依赖包
```