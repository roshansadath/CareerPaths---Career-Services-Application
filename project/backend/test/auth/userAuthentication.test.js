const { authenticateUser }=require('../../auth/userAuthentication');
const User=require('../../model/user');
const bcrypt=require('bcrypt');
const jwt= require('jsonwebtoken');
const {generateToken}=require('../../middleware/jwt');

jest.mock('../../model/user');

describe('authenticateUser',()=>{
    beforeEach(()=>{
        jest.clearAllMocks();
    });

    it('should return user when username and password are valid', async()=>{
        const username='manish198';
        const password='M@1234#';
        const hashedPassword='####M@1234!####';
        const user={username,password:hashedPassword};
        
        User.findOne.mockResolvedValue(user);
        bcrypt.compare=jest.fn().mockResolvedValue(true);
        
        const authenticatedUser=await authenticateUser(username,password);
        expect(User.findOne).toHaveBeenCalledWith({ where: { username:'manish198' } });
        expect(bcrypt.compare).toHaveBeenCalledWith(password,'####M@1234!####');
        expect(authenticatedUser).toBe(user);
    });

    it('should return null when user is not found',async()=>{
        const username='manish198';
        const password='hello@1234';
        const user={username};
        User.findOne.mockResolvedValue(null);
        const authenticatedUser=await authenticateUser(username,password);
        expect(User.findOne).toHaveBeenCalledWith({where:{username:'manish198'}});
        expect(authenticatedUser).toBeNull();
    });

    it('should return null when the password is invalid',async()=>{
        const username='manish198';
        const password='hello234';
        const hashedPassword='###hello234###';
        const user = {username,password:hashedPassword};

        User.findOne.mockResolvedValue(user);

        bcrypt.compare.mockResolvedValue(false);

        const authenticatedUser=await authenticateUser(username,password);
        expect(User.findOne).toHaveBeenCalledWith({where:{username}});
        expect(bcrypt.compare).toHaveBeenCalledWith(password,hashedPassword);
        expect(authenticatedUser).toBeNull();
    });

    it('should return error if there is an error',async()=>{
        const username='manish1';
        const password='hello123';

        const testError=new Error('Test Error');
        User.findOne.mockResolvedValue(testError);
        
        const authenticatedUser=await authenticateUser(username,password);
        expect(User.findOne).toHaveBeenCalledWith({where:{username}});
        expect(authenticatedUser).toBeNull();
    });
});