# Web project API
## User
### 用户名检测
- **path：** /username
- **method:** POST
- **请求参数：**   
```json
{
    username:
}
```
- **返回参数：**
```
{
    status:是否重名
}
```
### 新用户注册
- **path：** /signUp
- **method:** POST
- **请求参数：**   
```json
{
    username:
    password:
    fullname:
    address:
    email:
    phone:
    level:
}
```
- **返回参数：**
```
{
    status：是否成功
}
```
### 登陆
- **path：** /signIn
- **method:** POST
- **请求参数：**   

```json
{
    username:
    password:
}
```
- **返回参数：**
```
{
    status:是否成功
}
```
## Admin
### 查询房间
- **path：** /rooms/
- **method:** GET
- **请求参数：**   
```json
{
    roomType:
    roomMaxOccupancy:
    price:
    reservedTime:
    roomNumber:
    avaliable:
}
```
### 新增房间
- **path：** /rooms/add-room
- **method:** POST
- **请求参数：**   
```json
{
    roomType:
    roomMaxOccupancy:
    price:
    reservedTime:
    roomNumber:
}
```
- **返回参数：**
```
{
    status:是否成功
}
```
### 修改房间
- **path：** /rooms/:id
- **method:** PUT
- **请求参数：**   
```json
{
    roomType:
    roomMaxOccupancy:
    price:
    reservedTime:
    roomNumber:
    avaliable:
}
```
- **返回参数：**
```
{
    status:是否成功
}
```
### 删除房间
- **path：** /rooms/delete/:id
- **method:** DELETE
- **请求参数：**   

```json
{
    roomNumber:
}
```
- **返回参数：**
```
{
    status:是否成功
}
```
## RoomBooking
### 查询可用房间
- **path：** /rooms/
- **method:** GET
- **请求参数：**   
```json
{
    peopleNum:
    roomType:
    reservedTime:
}
```
- **返回参数：**
```
{
    roomNumber:
}
```
### 预定房间
- **path：** /reserves/reserve-room
- **method:** POST
- **请求参数：**  
```json
{
    roomNumber:
    username:
    reservedTime:
}
```
- **返回参数：**
```
{
   status: 是否成功
}
```
## Reserves
### 查询订单记录
- **path：** /reserves
- **method:** GET
- **请求参数：
- **返回参数：**
```
{
   roomNumber: 
   date:
   username:
}
```
