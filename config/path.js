'use strict';

const path = require('path');
// 项目根目录
global.path_root = path.join(__dirname, '../');
// 数据层
global.path_models = path.join(__dirname, '../models');
// 数据库文件
global.path_DB = path.join(__dirname, '../models/config/db');
// CRUD
global.path_CRUD = path.join(__dirname, '../models/config/CRUD');
// 服务层
global.path_services = path.join(__dirname, '../services');