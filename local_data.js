const DATA = {
    employeeId:12345,
    userName:'',
    firstName:'',
    lastName:'',
    midName:''
}
process.env = { ...process.env, ...DATA }