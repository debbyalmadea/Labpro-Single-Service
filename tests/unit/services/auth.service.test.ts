
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { AuthService, UserService } from '../../../src/services';
import { HttpError } from '../../../src/utils';
import { HttpStatusCode } from '../../../src/common/types';
import { User } from '../../../src/models';

jest.mock('jsonwebtoken');

type JwtSignMockedType =(
  payload: string | Buffer | object,
  secretOrPrivateKey: Secret,
  options?: SignOptions,
  ) => string;
  
const jwtSignMock = jwt.sign as unknown as jest.MockedFunction<JwtSignMockedType>;

jest.mock('bcryptjs'); 
const compareMock = compare as jest.MockedFunction<(s: string, hash: string) => Promise<boolean>>;

const userService = new UserService(User);
const getUserByUsernameMock = jest.spyOn(userService, 'getUserByUsername');
const authService = new AuthService(userService);

describe('Auth Service', () => {
  afterEach(() => {
    jest.clearAllMocks(); 
  });
  
  describe('logIn', () => {
    it('should return user and token when provided with correct credentials', async () => {
      const username = 'testuser';
      const password = 'testpassword';
      const mockUser = {
        username: 'testuser',
        name: 'Test User',
        password: 'hashedpassword', 
        created_at: new Date(),
        updated_at: new Date(),
      };
  
      getUserByUsernameMock.mockResolvedValue(mockUser);
      compareMock.mockResolvedValue(true);
      jwtSignMock.mockReturnValue('mockedAccessToken')
  
      const result = await authService.logIn(username, password);
    
      expect(result).toEqual({
        user: {
          username: 'testuser',
          name: 'Test User',
        },
        token: 'mockedAccessToken',
      });
    });
  
    it('should throw HttpError with NotFound status code when provided with non-existing username', async () => {
      const username = 'nonexistentuser';
      const password = 'testpassword';
  
      getUserByUsernameMock.mockImplementation(() => {
        throw new HttpError(HttpStatusCode.NotFound, "User not found")
      });
  
      await expect(authService.logIn(username, password)).rejects.toThrow(
        new HttpError(HttpStatusCode.NotFound, 'User not found')
      );
    });
  
    it('should throw HttpError with Unauthorized status code when provided with invalid password', async () => {
      const username = 'testuser';
      const password = 'wrongpassword';
  
      const mockUser = {
        username: 'testuser',
        name: 'Test User',
        password: 'hashedpassword', 
        created_at: new Date(),
        updated_at: new Date(),
      };
  
      getUserByUsernameMock.mockResolvedValue(mockUser);
      compareMock.mockResolvedValue(false);
  
      await expect(authService.logIn(username, password)).rejects.toThrow(
        new HttpError(HttpStatusCode.Unauthorized, 'Invalid password')
      );
    });
  });
})