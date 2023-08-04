const { createUser,getAllUsers,getUser }=require('../../controllers/userController');
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

const mockRequest=(params={})=>({
    params,
});
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

//Test to get single user
describe('getUser',()=>{
    beforeEach(()=>{
        jest.clearAllMocks();
    });

    it('should return user when valid userId is provided.',async()=>{
        const userId=1;
        const req=mockRequest({id:userId});
        const res=mockResponse();

        const sampleUser={id:userId,name:'Manish Gautam',username:'manish198',email:'gautam@gmail.com'};
        User.findByPk.mockResolvedValue(sampleUser);
        
        await getUser(req,res,mockNext);

        expect(User.findByPk).toHaveBeenCalledTimes(1);
        expect(User.findByPk).toHaveBeenCalledWith(userId);

        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith(sampleUser);
        expect(res.status).not.toHaveBeenCalled();
        expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return not found error when invalid userId is provided', async()=>{
        const userId=120;
        const req=mockRequest({id:userId});
        const res=mockResponse();

        User.findByPk.mockResolvedValue(null);
        await getUser(req,res,mockNext);

        expect(User.findByPk).toHaveBeenCalledTimes(1);
        expect(User.findByPk).toHaveBeenCalledWith(userId);
        
        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith({error:'User not found'});
        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(mockNext).not.toHaveBeenCalled();
    });

    it('should handle error and call the next',async()=>{
        const userId=1;
        const req=mockRequest({id: userId});
        const res=mockResponse();

        const testError=new Error('Test Error');
        User.findByPk.mockRejectedValue(testError);

        await getUser(req,res,mockNext);
        
        expect(User.findByPk).toHaveBeenCalledTimes(1);
        expect(User.findByPk).toHaveBeenCalledWith(userId);
        expect(res.json).not.toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(mockNext).toHaveBeenCalledWith(testError);
    });

});

