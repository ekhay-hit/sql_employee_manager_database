const {Pool} = require('pg');

const inquirer = require('inquirer');
const main = require("../server.js")
const pool = new Pool({user:'postgres',password:'ad12', host:'localhost', database:'employee_db'}, console.log('Connected to the employee_db database'));

pool.connect();

function viewAllDepartments(){
  pool.query('SELECT * FROM departments',function(err, {rows}){

    console.log(`
      `);
    console.table(rows); 
  });
  main.init();
}

function viewAllRoles(){
    pool.query('SELECT * FROM roles',function(err, {rows}){
      console.log(`
      `);
      console.table(rows);


    });
    main.init();
  }

  function viewAllEmployees(){
    pool.query('SELECT * FROM employees',function(err, {rows}){
      console.log(`
        `);
      console.table(rows);
    });
    main.init();
  }


 // add a new department 
 async function  addDepartment(){
 const input = await inquirer.prompt(
        {
            type:'input',
            message:'Department name',
            name: 'department_name'
        }
    );
        const newDepartment = input.department_name;
        console.log(newDepartment);
     pool.query('INSERT INTO departments (department_name) VALUES($1)',[newDepartment], (error, department) =>{
        
          if(error) throw error;
          console.log(`The department ${newDepartment} has been added successfully `);
          
    });
    main.init();
}

  // add a new role 
 async function  addRole(){
  const input = await inquirer.prompt(
         [
          {
             type:'input',
             message:'Enter the role title',
             name: 'title'
         },
         {
          type:'input',
          message:'Enter the salary',
          name: 'salary'
        },
        {
        type:'input',
        message:'Enter Department Id',
        name: 'department_id'
        }
      ]

     );
      pool.query('INSERT INTO roles (title, salary, department_id) VALUES($1,$2,$3)',values=[input.title,input.salary,input.department_id], (error, department) =>{
         
           if(error) throw error;
           console.log(`The new role has been added successfully `);
          
     });
     main.init();
 }

  // add a new employe 
  async function  addNewEmoployee(){
    const input = await inquirer.prompt(
           [
            {
               type:'input',
               message:'Enter the employee name',
               name: 'first_name'
           },
           {
            type:'input',
            message:'Enter the employee last name',
            name: 'last_name'
          },
          {
          type:'input',
          message:'Enter role Id',
          name: 'role_id'
          },
          {
            type:'input',
            message:'Enter manager id',
            name: 'manager_id'
            }
        ]
  
       );
        pool.query('INSERT INTO employees (first_name, last_name,role_id, manager_id) VALUES($1,$2,$3,$4)',values=[input.first_name,input.last_name,input.role_id,input.manager_id], (error, department) =>{
           
             if(error) throw error;
             console.log(`The new employee has been added successfully `);
       });
       main.init();
   }
module.exports = {
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
    addDepartment,
    addRole,
    addNewEmoployee
}
    