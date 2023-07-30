const { createUser }=require('../../controllers/userController');
const User=require('../../model/user');

//Mock the User Create
jest.mock('../../model/user');

const mockResponse=()=>{
    const res ={};
    res.json=jest.fn().mockReturnValue(res);
    res.status=jest.fn().mockReturnValue(res);
    res.send=jest.fn().mockReturnValue(res);
    return res;
};

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
