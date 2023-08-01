const {generateToken,authenticateToken}=require('../../middleware/jwt');
const  jwt=require('jsonwebtoken');
const dotenv=require('dotenv');

jest.mock('jsonwebtoken');
jest.mock('dotenv');

//Testing token generation process.
describe('generateToken',()=>{
    beforeEach(()=>{
        jest.clearAllMocks();
    });
    
    it('should generate a valid token with provided user',()=>{
        const secretKey=process.env.SECRET_KEY;
        const userId=111;
        const expectedToken='@@@@@@@@DDDSDCSaaaaaasSSSSS';

        jwt.sign=jest.fn().mockReturnValue(expectedToken);

        const generatedToken=generateToken(userId);
        expect(jwt.sign).toHaveBeenCalledWith({userId},secretKey,{expiresIn:'1h'});
        expect(generatedToken).toBe(expectedToken);
    });
});

//Testing token verification process
// describe('authenticateToken',()=>{
//     beforeEach(()=>{
//         jest.clearAllMocks();
//     });

//     it('should call next method if the token is valid', () => {
//         const req = {
//           headers: {
//             authorization: 'Bearer valid_token_here',
//           },
//         };
//         const res = { sendStatus: jest.fn() };
//         const next = jest.fn();
    
//         const decodedToken = { userId: 123 };
//         const secretKey = '12345';
//         // Mock jwt.verify method to call the callback without error
//         jwt.verify.mockImplementation((token, secretKey, callback) => {
//           callback(null, decodedToken);
//         });
    
        
    
//         authenticateToken(req, res, next);
    
//         expect(jwt.verify).toHaveBeenCalledWith('valid_token_here', 'test_secret_key', expect.any(Function));
//         expect(req.user).toEqual(decodedToken);
//         expect(next).toHaveBeenCalled();
//         expect(res.sendStatus).not.toHaveBeenCalled();
//       });
// });