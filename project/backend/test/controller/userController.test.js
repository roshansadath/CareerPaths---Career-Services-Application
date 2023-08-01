const { createUser,getAllUsers }=require('../../controllers/userController');
const User=require('../../model/user');

//Mock the User Create
jest.mock('../../model/user');

const sampleUsers=[
    {userId:1,name:'Manish Gautam',username:'manish198',email:'manish@gmail.com',userType:'employer'},
    {userId:2,name:'Divesh Poudel',username:'divesh',email:'divesh@gmail.com',userType:'student'},
    {userId:3,name:'Nishan Thapa',username:'nishan',email:'nishan@gmail.com',userType:'student'},
];

//Mock the findall function of user model. 
User.findAll.mockResolvedValue(sampleUsers);

const mockRequest=()=>({});
const mockResponse=()=>{
    const res ={};
    res.json=jest.fn().mockReturnValue(res);
    res.status=jest.fn().mockReturnValue(res);
    res.send=jest.fn().mockReturnValue(res);
    return res;
};
const mockNext=jest.fn();
//Testing create User.
describe('createUser', ()=>{
    beforeEach(()=>{
        //Clear all mock function's call history before each test
        jest.clearAllMocks();
    });
    
    it('should create a new user and return success message',async()=>{
        const req={
            body:{
                username:'manish198',
                password:'M@1234#',
                name:'Manish Gautam',
                email:'manish@gmail.com',
                userType:'employer',
            },
        };

        const res=mockResponse();
        
        //Mock User.create method to resolve with dummy user object
        User.create.mockResolvedValue({
            userId:1,
            name:'Manish Gautam',
            email:'manish@gmail.com',
            username:'manish198',
            userType:'employer',
            cvUrl:null,
        });
        
        await createUser(req,res);
        
        expect(User.create).toHaveBeenCalledWith({
            username:'manish198',
            password:'M@1234#',
            name:'Manish Gautam',
            email:'manish@gmail.com',
            userType:'employer',
            cvUrl:null,
        });
        expect(res.json).toHaveBeenCalledWith({message:'User added successfully.'});
        expect(res.status).not.toHaveBeenCalled();
        expect(res.send).not.toHaveBeenCalled();
    });

    it('should handle errors and send a 500 response',async()=>{
        const req={
            body:{
                username:'manish198',
                password:'M@1234#',
                name:'Manish Gautam',
                email:'manish@gmail.com',
                userType:'employer',
            },
        };
        const res=mockResponse();
        
        const testError=new Error('Test Error');
        User.create.mockRejectedValue(testError);

        await createUser(req,res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Error adding user.');
    });

});

describe('getAllUsers',()=>{
    beforeEach(()=>{
        jest.clearAllMocks();
    });

    it('should return all the users',async()=>{
        const req=mockRequest();
        const res=mockResponse();

        await getAllUsers(req,res);

        expect(User.findAll).toHaveBeenCalledTimes(1);
        expect(User.findAll).toHaveBeenCalledWith({
            attributes:{exclude:['password']},
        });
        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith(sampleUsers);

    });

    it('should handle error and call next',async()=>{
        const req=mockRequest();
        const res=mockResponse();
        
        const testError=new Error('Test Error');
        User.findAll.mockRejectedValue(testError);
        
        await getAllUsers(req,res,mockNext);

        expect(User.findAll).toHaveBeenCalledTimes(1);
        expect(User.findAll).toHaveBeenCalledWith({
            attributes:{exclude:['password']},
        });
        expect(res.json).not.toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(mockNext).toHaveBeenCalledTimes(1);
        expect (mockNext).toHaveBeenCalledWith(testError);
    });
});

