import bcrypt from 'bcryptjs';
const users =[
  {
    name:'Admin user',
    email:'admin@test.com',
    password:bcrypt.hashSync('123456',10),
    isAdmin:true
  },
  {
    name:'Tom Doe',
    email:'tom@test.com',
    password:bcrypt.hashSync('123456',10),
  },
  {
    name:'Jenny Doe',
    email:'jenny@test.com',
    password:bcrypt.hashSync('123456',10),
  }
]

export default users;